import { createClient } from '@supabase/supabase-js';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { SecretSantaEmail } from '@/components/emails/SecretSantaEmail';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client to bypass RLS for updates
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Mailgun
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'dummy',
});

function assignSecretSanta(participants) {
  const n = participants.length;
  if (n < 2) throw new Error("Se necesitan al menos 2 participantes");

  let givers = [...participants];
  let receivers = [...participants];
  
  let valid = false;
  let attempts = 0;
  
  while (!valid && attempts < 100) {
    attempts++;
    // Shuffle receivers
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
    }

    // Check self-assignment
    valid = true;
    for (let i = 0; i < n; i++) {
      if (givers[i].id === receivers[i].id) { // Compare IDs
        valid = false;
        break;
      }
    }
  }

  if (!valid) throw new Error("No se pudo generar una asignación válida. Intenta de nuevo.");

  // Create assignment map
  const assignmentMap = {};
  for (let i = 0; i < n; i++) {
    assignmentMap[givers[i].id] = receivers[i];
  }

  return assignmentMap;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { gameId, organizerEmail, resendOnly } = body;

    if (!gameId) {
      return NextResponse.json({ error: 'Game ID required' }, { status: 400 });
    }

    console.log("API Draw received gameId:", gameId);

    // 1. Fetch Game Data
    const { data: game, error: fetchError } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
    }
    if (!game) {
      console.error("Game not found for ID:", gameId);
    }

    if (fetchError || !game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    let participants = game.players || [];

    if (participants.length < 3) {
      return NextResponse.json({ error: 'Se necesitan al menos 3 participantes' }, { status: 400 });
    }

    // 1.5 Fetch Emails for Participants
    // The players array might not have emails, so we fetch them from the users table
    const playerIds = participants.map(p => p.id);
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .in('id', playerIds);

    if (!usersError && usersData) {
      // Merge emails into participants
      participants = participants.map(p => {
        const user = usersData.find(u => u.id === p.id);
        return {
          ...p,
          email: user ? user.email : p.email
        };
      });
    }

    let updatedParticipants = [...participants];
    let assignmentMap = {};

    // If we are just resending emails, we use existing assignments
    if (resendOnly && game.game_active) {
      // Reconstruct assignment map from existing data
      participants.forEach(p => {
        if (p.assignedTo) {
          // We need the full receiver object, but assignedTo only has id and name.
          // We find the receiver in the participants list.
          const receiver = participants.find(r => r.id === p.assignedTo.id);
          if (receiver) {
            assignmentMap[p.id] = receiver;
          }
        }
      });
    } else {
      // 2. Run Algorithm (New Draw)
      assignmentMap = assignSecretSanta(participants);

      // 3. Update Participants with Assignments
      updatedParticipants = participants.map(p => ({
        ...p,
        assignedTo: {
          id: assignmentMap[p.id].id,
          name: assignmentMap[p.id].userName
        }
      }));

      // 4. Save to DB
      const { error: updateError } = await supabase
        .from('games')
        .update({ 
          players: updatedParticipants,
          game_active: true 
        })
        .eq('id', game.id);

      if (updateError) {
        console.error("Error updating game:", updateError);
        return NextResponse.json({ error: 'Error guardando asignaciones' }, { status: 500 });
      }
    }

    // 5. Send Emails
    const emailPromises = updatedParticipants.map(async (giver) => {
      try {
        const receiver = assignmentMap[giver.id];
        if (!receiver) return { success: false, error: "No assignment found" };

        // Development mode restriction
        const sendTo = process.env.NODE_ENV === 'development' ? organizerEmail : giver.email;
        
        if (!giver.email) return { success: true, skipped: true, reason: "No email" };

        const emailHtml = await render(SecretSantaEmail({
          recipientName: giver.userName,
          organizerName: "El Organizador",
          gameName: game.game_name,
          gifteeName: receiver.userName,
          budget: game.game_amount,
          eventDate: game.date_of_game,
        }));

        console.log("Generated HTML length:", emailHtml.length);

        const domain = process.env.MAILGUN_DOMAIN;
        const fromEmail = `Secret Santa <mailgun@${domain}>`;

        await mg.messages.create(domain, {
          from: fromEmail,
          to: [sendTo],
          subject: `🎁 Tu asignación para: ${game.game_name}`,
          html: emailHtml,
        });

        return { success: true, recipient: giver.email };
      } catch (error) {
        console.error(`Error sending to ${giver.email}:`, error);
        return { success: false, error: error.message };
      }
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ 
      success: true, 
      message: resendOnly ? 'Correos reenviados exitosamente' : 'Sorteo realizado y correos enviados' 
    });

  } catch (error) {
    console.error('Error in draw API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

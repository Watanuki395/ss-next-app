import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { SecretSantaEmail } from '@/components/emails/SecretSantaEmail';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client (to bypass RLS for updates if needed, though we should use RLS properly)
// For this route, we might need service role key if we want to ensure absolute authority, 
// but standard client with user token is better if we pass the token. 
// However, for simplicity in this server route, we'll use the public key and rely on RLS 
// (assuming the user calling this is the creator).
// Actually, for server-side operations that might affect multiple users, a service role is often safer 
// but let's try with the standard client first or just use the environment variables.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const resend = new Resend(process.env.RESEND_API_KEY);

function assignSecretSanta(participants) {
  const n = participants.length;
  if (n < 2) throw new Error("Se necesitan al menos 2 participantes");

  let givers = [...participants];
  let receivers = [...participants];
  let assignments = [];

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
    const { gameId, organizerEmail } = body;

    if (!gameId) {
      return NextResponse.json({ error: 'Game ID required' }, { status: 400 });
    }

    // 1. Fetch Game Data
    const { data: game, error: fetchError } = await supabase
      .from('games')
      .select('*')
      .eq('game_id', gameId) // Assuming game_id is the public ID
      .single();

    if (fetchError || !game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    const participants = game.players || [];

    if (participants.length < 3) {
      return NextResponse.json({ error: 'Se necesitan al menos 3 participantes' }, { status: 400 });
    }

    // 2. Run Algorithm
    const assignmentMap = assignSecretSanta(participants);

    // 3. Update Participants with Assignments
    const updatedParticipants = participants.map(p => ({
      ...p,
      assignedTo: {
        id: assignmentMap[p.id].id,
        name: assignmentMap[p.id].userName // Save name for easier display
      }
    }));

    // 4. Save to DB
    const { error: updateError } = await supabase
      .from('games')
      .update({ 
        players: updatedParticipants,
        game_active: true // Mark as active/drawn
      })
      .eq('id', game.id); // Use internal UUID

    if (updateError) {
      console.error("Error updating game:", updateError);
      return NextResponse.json({ error: 'Error guardando asignaciones' }, { status: 500 });
    }

    // 5. Send Emails
    const emailPromises = updatedParticipants.map(async (giver) => {
      try {
        const receiver = assignmentMap[giver.id];
        // Development mode restriction
        const sendTo = process.env.NODE_ENV === 'development' ? organizerEmail : giver.email;
        
        // Skip if no email (e.g. manually added user without email)
        if (!giver.email) return { success: true, skipped: true };

        await resend.emails.send({
          from: 'Secret Santa <onboarding@resend.dev>',
          to: [sendTo],
          subject: `🎁 Tu asignación para: ${game.game_name}`,
          react: SecretSantaEmail({
            recipientName: giver.userName,
            organizerName: "El Organizador", // Could fetch organizer name
            gameName: game.game_name,
            gifteeName: receiver.userName,
            budget: game.game_amount,
            eventDate: game.date_of_game,
          }),
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
      message: 'Sorteo realizado y correos enviados' 
    });

  } catch (error) {
    console.error('Error in draw API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

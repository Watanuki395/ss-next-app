import { createClient } from '@supabase/supabase-js';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { SecretSantaEmail } from '@/components/emails/SecretSantaEmail';

// Initialize Supabase Admin Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Mailgun
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'dummy',
});

// Generate unique confirmation code
function generateConfirmationCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { gameCode, email } = body;

    if (!gameCode || !email) {
      return NextResponse.json({ error: 'Game code and email required' }, { status: 400 });
    }

    // Fetch game by public game_id
    const { data: game, error: fetchError } = await supabase
      .from('games')
      .select('*')
      .eq('game_id', gameCode)
      .single();

    if (fetchError || !game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    // Check if game is active (draw has been done)
    if (!game.game_active) {
      return NextResponse.json({ error: 'El sorteo aún no se ha realizado' }, { status: 400 });
    }

    // Find participant by email
    const participants = game.players || [];
    const participant = participants.find(p => p.email && p.email.toLowerCase() === email.toLowerCase());

    if (!participant) {
      return NextResponse.json({ error: 'Email no encontrado en este juego' }, { status: 404 });
    }

    // Check if participant has assignment
    if (!participant.assignedTo) {
      return NextResponse.json({ error: 'No se encontró asignación para este participante' }, { status: 404 });
    }

    // Get assigned person's details
    const assignedPerson = participants.find(p => p.id === participant.assignedTo.id);
    
    // Fetch wishlist of assigned person
    let wishlist = [];
    if (assignedPerson) {
      const { data: wishlistData } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', assignedPerson.id);
      
      wishlist = wishlistData || [];
    }

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Send email with assignment
    const emailHtml = await render(SecretSantaEmail({
      recipientName: participant.userName,
      organizerName: "El Organizador",
      gameName: game.game_name,
      gifteeName: participant.assignedTo.name,
      budget: game.game_amount,
      eventDate: game.date_of_game,
    }));

    // Add confirmation code and wishlist to email
    const fullEmailHtml = `
      ${emailHtml}
      <div style="margin-top: 20px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
        <h3 style="color: #333;">Código de Confirmación</h3>
        <p style="font-size: 24px; font-weight: bold; color: #D32F2F;">${confirmationCode}</p>
        <p style="color: #666;">Guarda este código para futuras consultas</p>
      </div>
      ${wishlist.length > 0 ? `
        <div style="margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #333;">Lista de Deseos de ${participant.assignedTo.name}</h3>
          <ul>
            ${wishlist.map(item => `
              <li style="margin-bottom: 10px;">
                <strong>${item.item_name}</strong>
                ${item.item_price ? ` - $${item.item_price}` : ''}
                ${item.item_link ? `<br><a href="${item.item_link}" style="color: #1976d2;">Ver producto</a>` : ''}
                ${item.item_note ? `<br><em style="color: #666;">${item.item_note}</em>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    `;

    const domain = process.env.MAILGUN_DOMAIN;
    const fromEmail = `Secret Santa <mailgun@${domain}>`;

    await mg.messages.create(domain, {
      from: fromEmail,
      to: [email],
      subject: `🎁 Tu asignación para: ${game.game_name} - Código: ${confirmationCode}`,
      html: fullEmailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Se ha enviado un correo con tu asignación y código de confirmación' 
    });

  } catch (error) {
    console.error('Error in send-assignment API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

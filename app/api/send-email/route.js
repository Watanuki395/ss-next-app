import { Resend } from 'resend';
import { SecretSantaEmail } from '@/components/emails/SecretSantaEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Algoritmo simple de Secret Santa
function assignSecretSanta(participants) {
  const n = participants.length;
  if (n < 2) throw new Error("Se necesitan al menos 2 participantes");

  let givers = [...participants];
  let receivers = [...participants];
  let assignments = [];

  // Mezclar receivers hasta que nadie se regale a sí mismo
  let valid = false;
  while (!valid) {
    // Shuffle receivers
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
    }

    // Check if anyone is assigned to themselves
    valid = true;
    for (let i = 0; i < n; i++) {
      if (givers[i].email === receivers[i].email) {
        valid = false;
        break;
      }
    }
  }

  // Create assignment pairs
  for (let i = 0; i < n; i++) {
    assignments.push({
      giver: givers[i],
      receiver: receivers[i]
    });
  }

  return assignments;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { gameName, organizerName, organizerEmail, eventDate, budget, participants } = body;

    if (!participants || participants.length < 3) {
      return NextResponse.json(
        { error: 'Se necesitan al menos 3 participantes' },
        { status: 400 }
      );
    }

    // 1. Generar asignaciones
    const assignments = assignSecretSanta(participants);

    // 2. Enviar emails (en paralelo)
    const emailPromises = assignments.map(async ({ giver, receiver }) => {
      try {
        // NOTA: En modo desarrollo/prueba sin dominio verificado, 
        // Resend solo permite enviar a 'delivered@resend.dev' o al email del dueño de la cuenta.
        // Para que funcione en producción con cualquier email, se debe verificar el dominio en Resend.
        
        // Para efectos de esta demo y evitar errores si el usuario no tiene dominio,
        // enviaremos a la dirección del organizador (asumiendo que es la verificada)
        // O si estamos en producción real, se enviaría a giver.email
        
        // IMPORTANTE: Cambiar esto a giver.email cuando se tenga dominio verificado
        const sendTo = process.env.NODE_ENV === 'development' ? organizerEmail : giver.email; 

        const data = await resend.emails.send({
          from: 'Secret Santa <onboarding@resend.dev>',
          to: [sendTo], // En producción: giver.email
          subject: `🎁 Tu asignación para: ${gameName}`,
          react: SecretSantaEmail({
            recipientName: giver.name,
            organizerName: organizerName,
            gameName: gameName,
            gifteeName: receiver.name,
            budget: budget,
            eventDate: eventDate,
          }),
        });
        return { success: true, id: data.id, recipient: giver.email };
      } catch (error) {
        console.error(`Error enviando a ${giver.email}:`, error);
        return { success: false, error: error.message, recipient: giver.email };
      }
    });

    const results = await Promise.all(emailPromises);
    const failures = results.filter(r => !r.success);

    if (failures.length > 0) {
      console.warn('Algunos correos fallaron:', failures);
      // Aún así retornamos éxito parcial, o podríamos retornar error 206
    }

    return NextResponse.json({ 
      message: 'Juego creado y correos enviados',
      assignmentsCount: assignments.length,
      failures: failures.length
    });

  } catch (error) {
    console.error('Error en API send-email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

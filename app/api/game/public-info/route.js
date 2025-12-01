import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { gameCode } = body;

    if (!gameCode) {
      return NextResponse.json({ error: 'Game code required' }, { status: 400 });
    }

    // Fetch game by public game_id (code)
    const { data: game, error: fetchError } = await supabase
      .from('games')
      .select('*')
      .eq('game_id', gameCode)
      .single();

    if (fetchError || !game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    // Return only public information
    const publicInfo = {
      game: {
        name: game.game_name,
        date: game.date_of_game,
        budget: game.game_amount,
        description: game.game_description,
        active: game.game_active,
      },
      participants: (game.players || []).map(p => ({
        name: p.userName,
        // Do NOT include email or assignedTo
      })),
    };

    return NextResponse.json(publicInfo);

  } catch (error) {
    console.error('Error in public-info API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

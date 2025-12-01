import React from 'react';
import { Box, Typography, Paper, Chip, Avatar, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupIcon from '@mui/icons-material/Group';
import dayjs from 'dayjs';

const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#E0E0E0'}`,
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 24px rgba(0,0,0,0.4)' 
      : '0 8px 24px rgba(0,0,0,0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color = theme.palette.info.main;
  let bg = theme.palette.info.light;
  
  if (status === true) { // Activo
    color = theme.palette.success.main;
    bg = theme.palette.mode === 'dark' ? 'rgba(27, 94, 32, 0.2)' : '#E8F5E9';
  } else if (status === false) { // Inactivo/Borrador
    color = theme.palette.warning.main;
    bg = theme.palette.mode === 'dark' ? 'rgba(237, 108, 2, 0.2)' : '#FFF3E0';
  }

  return {
    backgroundColor: bg,
    color: color,
    fontWeight: 600,
    borderRadius: '8px',
    height: '24px',
    fontSize: '0.75rem',
  };
});

const GameCard = ({ game, onClick }) => {
  const isActive = game.game_active ?? game.gameActive ?? false;
  const date = dayjs(game.date_of_game || game.dateOfGame).format('DD MMM YYYY');
  
  return (
    <CardPaper onClick={onClick} elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <StatusChip 
          label={isActive ? "Activo" : "Borrador"} 
          status={isActive} 
          size="small" 
        />
        {Number(game.game_amount || game.gameAmount || 0) > 0 && (
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Presupuesto: ₡{game.game_amount || game.gameAmount}
          </Typography>
        )}
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontFamily: '"Poppins", sans-serif' }}>
        {game.gameName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
        <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="body2">{date}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {game.players?.length || 0} participantes
          </Typography>
        </Box>
        
        <IconButton 
          size="small" 
          sx={{ 
            backgroundColor: 'primary.main', 
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' }
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Show game code */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Link href={`/join/${game.game_id || game.gameId || (game.id || '').slice(0, 6)}`}>
            <Chip label={game.game_id || game.gameId || (game.id || '').slice(0, 6)} size="small" variant="outlined" clickable />

        </Link>
      </Box>
    </CardPaper>
  );
};

export default GameCard;

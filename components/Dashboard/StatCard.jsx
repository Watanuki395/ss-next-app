import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #2C2C2C 0%, #1E1E1E 100%)' 
    : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 20px rgba(0,0,0,0.2)' 
    : '0 4px 20px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
}));

const IconBox = styled(Box)(({ theme, color }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color || theme.palette.primary.light,
  color: theme.palette.getContrastText(color || theme.palette.primary.light),
}));

const StatCard = ({ title, value, icon, color }) => {
  return (
    <StatPaper elevation={0}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Poppins", sans-serif' }}>
          {value}
        </Typography>
      </Box>
      <IconBox color={color}>
        {icon}
      </IconBox>
    </StatPaper>
  );
};

export default StatCard;

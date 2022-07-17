import React from 'react';
import Box from '@mui/material/Box';

export function LobbyLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url(https://miro.medium.com/max/900/1*4XYK7KcXkSTEVTbFydXk9w.jpeg)',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Box
        sx={{
          width: { xs: '90vw', sm: '75vw', md: '50vw' },
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

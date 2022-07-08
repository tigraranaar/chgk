import React from 'react';
import Box from '@mui/material/Box';

export function LobbyLayout( {children} ) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: '##f6f6f6',
      }}
    >
      <Box
        sx={{
          width: '50vw',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

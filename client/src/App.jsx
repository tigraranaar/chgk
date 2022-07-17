import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { LobbyLayout } from './components/Layouts/LobbyLayout';

function App() {
  return (
    <LobbyLayout>
      <Typography variant="h1" component="h1"
        sx={{
          fontSize: { xs: 22, md: 32 },
          marginBottom: 2
        }}
      >
        Войти как:
      </Typography>

      <NavLink to="/create-room" style={{ textDecoration: 'none', marginBottom: '12px' }}>
        <Button variant="outlined">Администратор</Button>
      </NavLink>

      <NavLink to="/join-room" style={{ textDecoration: 'none', marginBottom: '12px' }}>
        <Button variant="outlined">Игрок</Button>
      </NavLink>

      <NavLink to="/moder-room" style={{ textDecoration: 'none', marginBottom: '12px' }}>
        <Button variant="outlined">Модератор</Button>
      </NavLink>
    </LobbyLayout>
  );
}

export default App;

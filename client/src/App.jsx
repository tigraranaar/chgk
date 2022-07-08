import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tab, Typography } from '@mui/material';
import { LobbyLayout } from './components/Layouts/LobbyLayout';

function App() {
  return (
    <LobbyLayout>
      <Typography variant="h1" component="h1" 
        sx={{
          fontSize: 48,
          marginBottom: 2
        }}
      >
        Войти как:
      </Typography>

      <NavLink to="/create-room">
        <Tab label="Администратор"/>
      </NavLink>

      <NavLink to="/join-room">
        <Tab label="Игрок"/>
      </NavLink>

      <NavLink to="/moder-room">
        <Tab label="Модератор"/>
      </NavLink>
    </LobbyLayout>
  );
}

export default App;

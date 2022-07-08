import React from "react";
import Typography from '@mui/material/Typography';
import { Chip, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export const ShareRoom = () => {
  const currentGameNumber = useSelector(state => state.lobby.gameNumber);

  return (
    <>
      <Typography 
        variant="h1" 
        component="h1" 
        sx={{
          fontSize: 48,
          marginBottom: 2
        }}
      >
        Поделитесь номером игры
      </Typography>

      <Chip label={currentGameNumber} />

      <CircularProgress sx={{marginTop: '40px'}} />
    </>
  );
};

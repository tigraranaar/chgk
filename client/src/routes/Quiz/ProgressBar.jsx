import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const progressValue = {};
const barFullWidth = 100;
const setIntervalToSeconds = 1000;

function LinearProgressWithLabel(props) {
  const durationToSeconds = props.duration / setIntervalToSeconds;
  const reverseTimer = durationToSeconds - props.value;
  
  progressValue.value = Math.round(props.value*(barFullWidth/durationToSeconds));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...progressValue} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          reverseTimer,
        )} сек.`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export const LinearWithValueLabel = ( { duration} ) => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= duration ? 1 : prevProgress + 1));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <LinearProgressWithLabel value={progress} duration={duration}/>
    </Box>
  );
}

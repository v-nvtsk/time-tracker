export const formatTime = (ms: number | undefined) => {
  if (!ms) {return '0s';}

  const hours = Math.floor(ms / 3600000);
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const output = [
    hours > 0 ? `${hours}h ` : '',
    minutes > 0 ? `${minutes}m ${remainingSeconds}s` : '',
    minutes <= 0 ? `${seconds}s` : ''
    
  ];

  // return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`;
  return output.join('');
};
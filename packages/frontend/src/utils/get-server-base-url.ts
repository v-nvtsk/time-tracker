export const getServerName = () => {
  return import.meta.env.VITE_BACKEND_HOST ?
    `${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
    : 'localhost:3000';
};

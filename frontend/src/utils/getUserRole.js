import { jwtDecode } from 'jwt-decode';

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.role; 
  }
  return null;
};

export default getUserRole;
import { jwtDecode } from 'jwt-decode'; // Use named import


const getToken = () => {
  return localStorage.getItem('token');
};

// Function to check if the user is an admin
const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    // Decode the JWT to get the payload
    const decoded = jwtDecode(token);
    return decoded.user.role === 'admin';
  } catch (error) {
    return false;
  }
};


export {isAdmin}
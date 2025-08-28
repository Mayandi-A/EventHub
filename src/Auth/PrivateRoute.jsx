import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;

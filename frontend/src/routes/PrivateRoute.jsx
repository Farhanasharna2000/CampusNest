import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from './../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/signin' state={location.pathname} />
}

export default PrivateRoute;

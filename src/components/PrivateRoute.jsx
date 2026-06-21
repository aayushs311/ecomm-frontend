import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ isPublicPage = false}) => {
    const { user } = useSelector((state) => state.auth)
    if(isPublicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }
  return user ? <Outlet /> : <Navigate to="/login"/>;
}

export default PrivateRoute
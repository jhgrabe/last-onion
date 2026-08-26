// There are some great how-tos on Youtube and they are saving my life

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to='/login' />;

    return children
}

export default ProtectedRoute
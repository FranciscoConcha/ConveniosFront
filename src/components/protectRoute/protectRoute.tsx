import { Navigate } from 'react-router-dom';
import { loginServices } from '../../services/loginServices';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = loginServices.isAuthenticated(); // Ya usa cookies internamente

    if (!isAuthenticated) {
        return <Navigate to="/AdminLogin" replace />;
    }

    return <>{children}</>;
}
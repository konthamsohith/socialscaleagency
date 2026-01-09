import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (accessToken && refreshToken) {
        // Store tokens in localStorage (similar to login)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        try {
          // Fetch user data and set in context
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('user', JSON.stringify(userData.data));
            // Trigger auth context update
            // Redirect based on user role or admin login flag
            const isAdminLogin = localStorage.getItem('adminLogin') === 'true';
            localStorage.removeItem('adminLogin'); // Clean up
            
            if (isAdminLogin || userData.data.role === 'SUPER_ADMIN') {
              window.location.href = '/dashboard/admin-panel';
            } else {
              window.location.href = '/dashboard';
            }
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Auth callback error:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-slate-600">Completing sign in...</p>
      </motion.div>
    </div>
  );
};
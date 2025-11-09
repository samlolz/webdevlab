import { useState } from 'react';
import { AlertCircle, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 [LOGIN COMPONENT] Form submitted');
    console.log('📤 [LOGIN COMPONENT] Email:', formData.email);
    
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(formData.email, formData.password);
      
      console.log('📥 [LOGIN COMPONENT] Data received:', data);
      console.log('📋 [LOGIN COMPONENT] Major value:', data.major);
      console.log('📋 [LOGIN COMPONENT] All keys:', Object.keys(data));
      
      const userData = {
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        major: data.major,
        role: data.role,
      };
      
      console.log('💾 [LOGIN COMPONENT] Prepared user data:', userData);
      
      login(userData, data.token);
      
      console.log('✅ [LOGIN COMPONENT] Login process complete');
      
    } catch (err) {
      console.error('❌ [LOGIN COMPONENT] Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login ke dashboard mahasiswa</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="nama@student.prasetiyamulya.ac.id"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Belum punya akun?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Register disini
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
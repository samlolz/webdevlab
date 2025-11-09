import { useEffect } from 'react';
import { LogOut, User, Mail, BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log('🏠 [DASHBOARD] Component mounted');
    console.log('👤 [DASHBOARD] User data:', user);
    console.log('📋 [DASHBOARD] User major:', user?.major);
  }, [user]);

  const handleLogout = () => {
    console.log('🚪 [DASHBOARD] Logout button clicked');
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard Mahasiswa</h1>
                <p className="text-sm text-gray-600">Prasetiya Mulya University</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Selamat Datang, {user?.full_name || 'User'}!</h2>
          <p className="text-indigo-100">Semoga hari Anda menyenangkan</p>
        </div>

        {/* Profile Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-lg font-semibold text-gray-800">{user?.username || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.email || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Jurusan</p>
                <p className="text-lg font-semibold text-gray-800">{user?.major || 'Tidak ada data'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{user?.role || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Akun</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Nama Lengkap</span>
              <span className="font-semibold text-gray-800">{user?.full_name || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-800">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Username</span>
              <span className="font-semibold text-gray-800">{user?.username || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Jurusan</span>
              <span className="font-semibold text-gray-800">{user?.major || 'Tidak ada data'}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold capitalize">
                {user?.role || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
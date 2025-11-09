const API_BASE_URL = 'http://localhost:8000/api/auth';

const authService = {
  register: async (userData) => {
    try {
      console.log('🚀 [REGISTER] Starting registration...');
      console.log('📤 [REGISTER] Sending data:', userData);
      
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📡 [REGISTER] Response status:', response.status);
      const data = await response.json();
      console.log('📥 [REGISTER] Response data:', data);
      
      if (!response.ok) {
        console.error('❌ [REGISTER] Registration failed:', data);
        if (data.email) {
          throw new Error(data.email[0]);
        }
        if (data.password) {
          throw new Error(data.password[0]);
        }
        if (data.non_field_errors) {
          throw new Error(data.non_field_errors[0]);
        }
        throw new Error(JSON.stringify(data));
      }
      
      console.log('✅ [REGISTER] Registration successful');
      return data;
    } catch (error) {
      console.error('❌ [REGISTER] Error:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      console.log('🚀 [LOGIN] Starting login...');
      console.log('📤 [LOGIN] Email:', email);
      
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 [LOGIN] Response status:', response.status);
      const data = await response.json();
      console.log('📥 [LOGIN] Full response data:', data);
      console.log('📋 [LOGIN] Major field:', data.major);
      console.log('📋 [LOGIN] Major type:', typeof data.major);
      console.log('📋 [LOGIN] Major length:', data.major?.length);
      
      if (!response.ok) {
        console.error('❌ [LOGIN] Login failed:', data);
        if (data.detail) {
          throw new Error(data.detail);
        }
        throw new Error('Login failed. Please check your credentials.');
      }
      
      console.log('✅ [LOGIN] Login successful');
      return data;
    } catch (error) {
      console.error('❌ [LOGIN] Error:', error);
      throw error;
    }
  },
};

export default authService;
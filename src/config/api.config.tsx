export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5297',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      VERIFY: '/api/auth/verify',
    },
    TARJETA: {
      OBTENER: '/api/Card/',
      VERIFICAR: '/api/card/verificate/'
    },
    TARJETAADMIN:{
        OBTENERLISTA: '/api/Card/',
        OBTENERPORID: '/api/Card/id='
    },
    ESTUDIANTES:{
        OBTENERLISTA: '/api/student/',
        OBTENERPORID: '/api/student/id=',
        ACTUALIZARPORID: '/api/student/state/id=',
        ACTUALIZAR:'/api/student/update/id=',
        CREAR:'/api/student/',
        CARGAREXCEL: '/api/student/excel'
    },
    CONVENIOS: {
      LISTAR: '/api/convenios',
      OBTENER: '/api/convenios',
    },
  },
};
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://agreementsservices-final.onrender.com',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      VERIFY: '/api/auth/verify',
    },
    TARJETA: {
      OBTENER: '/api/Card/',
      VERIFICAR: '/api/card/verificate/',
      COMPORBAR: 'api/card/check/'
    },
    TARJETAADMIN:{
        OBTENERLISTA: '/api/Card/',
        OBTENERPORID: '/api/Card/id=',
        INCREMENTUSE: 'api/card'

    },
    ESTUDIANTES:{
        OBTENERLISTA: '/api/student/',
        OBTENERPORID: '/api/student/id=',
        ACTUALIZARESTADO: '/api/student/state/id=',
        ACTUALIZAR:'/api/student/update/id=',
        CREAR:'/api/student/',
        CARGAREXCEL: '/api/student/excel'
    },
    CONVENIOS: {
      LISTAR: '/api/agreements',
      OBTENER: '/api/agreements/',      
      CREAR: '/api/agreements',          
      ACTUALIZAR: '/api/agreements/',    
      CAMBIAR_ESTADO: '/api/agreements/State/',  
      ELIMINAR: '/api/agreements/' 
    },
  },
};
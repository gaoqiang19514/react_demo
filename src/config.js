export default {
    baseURL: 'http://localhost:8000/api',
    defaultRoute: '/dashboard',
    routes: {
        HOME: '/',
        DASHBOARD: '/dashboard',
        CONTACT: '/contact',
        LOGIN: '/login',
        COLOR: '/color',
        PROPS: '/props'
    },
    NavbarItems: {
        private: {
            Home: '/',
            Dashboard: '/dashboard',
            Contact: '/contact'
        },
        public: {
            Props: '/props',
            Color: '/color',
            Login: '/login'
        }
    }
};

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://dimitrimikadze.com:3333' : 'http://localhost:3333';
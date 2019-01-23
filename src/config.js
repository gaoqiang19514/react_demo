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
    },
    // 业务配置
    card: {
        MAX_COUNT: 10,
        MIN_COUNT: 1
    },
    // 双色球
    double_color_ball: {
        red: {
            MAX: 20,
            MIN: 6
        },
        blue: {
            MAX: 6,
            MIN: 1
        }
    }
};

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://dimitrimikadze.com:3333' : 'http://localhost:3333';
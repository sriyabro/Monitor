import Dashboard from '../components/Dashboard';
import AlertHistory from '../components/AlertHistory';

const routes = [
    {
        path: '/',
        exact: true,
        component: Dashboard,
        name: 'Dashboard',
        protected: true


    },
    {
        path: '/alert-history',
        exact: true,
        component: AlertHistory,
        name: 'Sensor Alert History',
        protected: true

    },
    // {
    //     path: '/login',
    //     exact: true,
    //     component: Login,
    //     name: 'Login Page',
    //     protected: false
    //
    // },
    // {
    //     path: '/register',
    //     exact: true,
    //     component: Register,
    //     name: 'Register Page',
    //     protected: false
    //
    // ]
]

export default routes;
import Dashboard from '../components/Dashboard';
import AlertHistory from '../components/AlertHistory';
import SignInOutContainer from "../containers/index";

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
    {
        path: '/signin',
        exact: true,
        component: SignInOutContainer,
        name: 'SignUp',
        protected: false

    },
    // {
    //     path: '/register',
    //     exact: true,
    //     component: Register,
    //     name: 'Register Page',
    //     protected: false
    //
    // }
]

export default routes;
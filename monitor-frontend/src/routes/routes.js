import Dashboard from '../components/Dashboard';
import AlertHistory from '../components/AlertHistory';
import SignInOutContainer from "../containers/index";
import UserProfile from "../components/UserProfile";

const routes = [
    {
        path: '/dashboard',
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
        path: '/',
        exact: true,
        component: SignInOutContainer,
        name: 'SignUp',
        protected: false

    },
    {
        path: '/profile',
        exact: true,
        component: UserProfile,
        name: 'User Profile',
        protected: true

    }
]

export default routes;
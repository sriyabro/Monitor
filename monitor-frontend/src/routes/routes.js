import Chart from '../components/Chart';
import History from '../components/Table';

const routes = [
    {
        path: '/',
        exact: true,
        component: Chart,
        name: 'Chart',
        protected: true


    },
    {
        path: '/history',
        exact: true,
        component: History,
        name: 'Sensor History',
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
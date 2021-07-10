import React from 'react'
import {Grid,Paper,TextField,Button,Typography,Link,Avatar} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';


const Login = ({ handleChange }) => {

    const history = useHistory();
    const url = 'http://localhost:6500/users/login';
    const paperStyle = { padding: 20, height: '60vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btn = { margin: '8px 0' }
    const initialValues = {
        email: '',
        password: '',
        // remember: false
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = (values, props) => {
        //props,isSubmitting(true)
        let loginData = {
            user_Email: values.email,
            user_Password: values.password,
        }

        Axios.post(url, loginData)

        .then((res) => {

            localStorage.setItem("token", res.data.jwt);
            Swal.fire({
                icon: 'success',
                title: `${res.data.msg}`,
              })
              history.push('/dashboard');
              
        })
        .catch((err) => {
          Swal.fire({
              icon: 'info',
              title: 'Invalid Login',
              text: 'Check Your Email and Password',
            })
        });
        props.resetForm()
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} fullWidth name="email" label='Email'
                                   placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                            <Field as={TextField} label='Password' name="password"
                                   placeholder='Enter password' type='password' fullWidth required
                                   helperText={<ErrorMessage name="password" />} />
                            {/* <Field as={FormControlLabel}
                                   name='remember'
                                   control={
                                       <Checkbox
                                           color="primary"
                                       />
                                   }
                                   label="Remember me"
                            /> */}
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                    style={btn} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                {/* <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography> */}
                <Typography > Do you have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
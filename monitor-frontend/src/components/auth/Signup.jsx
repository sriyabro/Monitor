import React from 'react'
import {Avatar, Button, Grid, Link, Paper, TextField, Typography} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import Axios from 'axios';
import Swal from 'sweetalert2';
import {BACKEND_URL} from "../../constants/constants";


const Signup = ({ handleChange }) => {

    const url = BACKEND_URL + '/users/add';
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btn = { margin: '8px auto' }
    // const marginTop = { marginTop: 5 }
    const initialValues = {
        name: '',
        email: '',
        contact:'',
        password: '',
        confirmPassword: '',
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        contact: Yup.string().min(10,"Enter valid contact").max(12,"Enter valid contact").required("Required"),
        password: Yup.string().min(2, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
    })
    const onSubmit = async(values , props) => {
        Axios.post(url,{

            user_Name : values.name, 
            user_Contact: values.contact, 
            user_Email: values.email, 
            user_Password : values.password

        })
        .then((res)=>{
            console.log(res.data)

            if(res.data === "User Added!"){
                Swal.fire({
                  icon: 'success',
                  title: 'Registered In Successfully!',
                })
                handleChange("event", 0);
        
            }

            else if(res.data === "Already Registered"){
                Swal.fire({
                    icon: 'info',
                    title: 'Already Registered',
                    text: 'Use different email for create new account',
                  })
            }
            
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
              })
            console.log(err)
          });
        props.resetForm()
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>

                            <Field as={TextField} fullWidth name="name" label='Name'
                                   placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                            <Field as={TextField} fullWidth name="email" label='Email'
                                   placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                            <Field as={TextField} fullWidth name="contact" label='Contact Number'
                                   placeholder="Enter your contact number" helperText={<ErrorMessage name="contact" />} />
                            <Field as={TextField} fullWidth name='password' type="password"
                                   label='Password' placeholder="Enter your password"
                                   helperText={<ErrorMessage name="password" />} />
                            <Field as={TextField} fullWidth name="confirmPassword" type="password"
                                   label='Confirm Password' placeholder="Confirm your password"
                                   helperText={<ErrorMessage name="confirmPassword" />} />
                            <Button type='submit' variant='contained' disabled={props.isSubmitting}
                                    color='primary' style={btn}>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                        </Form>
                    )}
                </Formik>
                <Typography > Already have an account?&nbsp;
                    <Link href="#" onClick={() => handleChange("event", 0)} >
                        Log In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;
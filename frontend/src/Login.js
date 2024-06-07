import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            category: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Required'),
            category: Yup.string()
                .oneOf(['hiring', 'job wanted'], 'Invalid Category')
                .required('Required')
        }),
        onSubmit: values => {
            axios.post('http://localhost:3500/login', values)
                .then(response => {
                    const category = response.data.category;
                    if (category === 'hiring') {
                        window.location.href='/HiringCompany';
                    } else {
                        window.location.href='/UserData';
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    });

    return (
        <div>
            {<br></br>}
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option value="" label="Select category" />
                        <option value="hiring" label="Hiring" />
                        <option value="job wanted" label="Job Wanted" />
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                        <div>{formik.errors.category}</div>
                    ) : null}
                </div>

                <a href='/'>Create a New Register</a>
                {<br></br>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

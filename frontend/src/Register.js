import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            category: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
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
            axios.post('http://localhost:3500/register', values)
                .then(response => {
                    console.log(response.data);
                    alert("Registered Sucessfully")
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert(error)
                });
        }
    });

    return (
        <div>
            {<br></br>}
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>

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

                <a href='/Login'>Already Registered</a>
                {<br></br>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;

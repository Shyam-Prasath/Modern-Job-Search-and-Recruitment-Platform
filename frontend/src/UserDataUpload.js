// UserDataUpload.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UserData.css'
const UserDataUpload = () => {
  const formik = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Job: '',
      Degree: '',
      Resume: null,
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      Email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      Job: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      Degree: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      Resume: Yup.mixed()
        .required('Required')
        .test(
          'fileSize',
          'File too large',
          value => value && value.size <= 1048576 // 1MB
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          value => value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)
        ),
    }),
    onSubmit: values => {
      const formData = new FormData();
      formData.append('Name', values.Name);
      formData.append('Email', values.Email);
      formData.append('Job', values.Job);
      formData.append('Degree', values.Degree);
      formData.append('Resume', values.Resume);

      fetch('http://localhost:3500/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        alert('Data added successfully');
        console.log('Success:', data);
        window.location.href = '/UserHome'; // Redirect to UserHome
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
  });

  return (
    <>
      {<br></br>}
      <h1 style={{color:'black'}}>Job Seekers Details</h1>
      <form onSubmit={formik.handleSubmit} className='form-container'>
        <label htmlFor="Name">Name</label>
        <input
          id="Name"
          name="Name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Name}
        />
        {formik.touched.Name && formik.errors.Name ? (
          <div>{formik.errors.Name}</div>
        ) : null}

        <label htmlFor="Email">Email</label>
        <input
          id="Email"
          name="Email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Email}
        />
        {formik.touched.Email && formik.errors.Email ? (
          <div>{formik.errors.Email}</div>
        ) : null}

        <label htmlFor="Job">Job</label>
        <input
          id="Job"
          name="Job"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Job}
        />
        {formik.touched.Job && formik.errors.Job ? (
          <div>{formik.errors.Job}</div>
        ) : null}

        <label htmlFor="Degree">Degree</label>
        <input
          id="Degree"
          name="Degree"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Degree}
        />
        {formik.touched.Degree && formik.errors.Degree ? (
          <div>{formik.errors.Degree}</div>
        ) : null}

        <label htmlFor="Resume">Resume</label>
        <input
          id="Resume"
          name="Resume"
          type="file"
          onChange={(event) => {
            formik.setFieldValue("Resume", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.Resume && formik.errors.Resume ? (
          <div>{formik.errors.Resume}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserDataUpload;

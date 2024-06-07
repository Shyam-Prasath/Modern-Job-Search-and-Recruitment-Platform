import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './HireCompany.css'

const HiringCompanyForm = () => {
  const formik = useFormik({
    initialValues: {
      CompanyName: '',
      ContactEmail: '',
      JobTitle: '',
      JobDescription: '',
      CompanyLogo: null,
    },
    validationSchema: Yup.object({
      CompanyName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      ContactEmail: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      JobTitle: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      JobDescription: Yup.string()
        .max(500, 'Must be 500 characters or less')
        .required('Required'),
      CompanyLogo: Yup.mixed()
        .required('Required')
        .test(
          'fileSize',
          'File too large',
          value => value && value.size <= 1048576 // 1MB
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
        ),
    }),
    onSubmit: values => {
      const formData = new FormData();
      formData.append('CompanyName', values.CompanyName);
      formData.append('ContactEmail', values.ContactEmail);
      formData.append('JobTitle', values.JobTitle);
      formData.append('JobDescription', values.JobDescription);
      formData.append('CompanyLogo', values.CompanyLogo);

      fetch('http://localhost:3500/uploadJob', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        alert('Job posting added successfully');
        console.log('Success:', data);
        window.location.href = '/HireHome'; // Redirect to job postings page
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
  });

  return (
    <>
      {<br></br>}
      <h1 style={{color:'black'}}>Company Hiring Details</h1>
      <form onSubmit={formik.handleSubmit} className='form-container'>
        <label htmlFor="CompanyName">Company Name</label>
        <input
          id="CompanyName"
          name="CompanyName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.CompanyName}
        />
        {formik.touched.CompanyName && formik.errors.CompanyName ? (
          <div className='error-message'>{formik.errors.CompanyName}</div>
        ) : null}

        <label htmlFor="ContactEmail">Contact Email</label>
        <input
          id="ContactEmail"
          name="ContactEmail"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ContactEmail}
        />
        {formik.touched.ContactEmail && formik.errors.ContactEmail ? (
          <div className='error-message'>{formik.errors.ContactEmail}</div>
        ) : null}

        <label htmlFor="JobTitle">Job Title</label>
        <input
          id="JobTitle"
          name="JobTitle"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.JobTitle}
        />
        {formik.touched.JobTitle && formik.errors.JobTitle ? (
          <div className='error-message'>{formik.errors.JobTitle}</div>
        ) : null}

        <label htmlFor="JobDescription">Job Description</label>
        <textarea
          id="JobDescription"
          name="JobDescription"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.JobDescription}
        />
        {formik.touched.JobDescription && formik.errors.JobDescription ? (
          <div className='error-message'>{formik.errors.JobDescription}</div>
        ) : null}

        <label htmlFor="CompanyLogo">Company Logo </label>
        <input
          id="CompanyLogo"
          name="CompanyLogo"
          type="file"
          onChange={(event) => {
            formik.setFieldValue("CompanyLogo", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.CompanyLogo && formik.errors.CompanyLogo ? (
          <div className='error-message'>{formik.errors.CompanyLogo}</div>
        ) : null}
        {<br></br>}
        {<br></br>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default HiringCompanyForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './UserHome.css';

const UserHome = () => {
    const [jobData, setJobData] = useState([]);
    const [filteredJobData, setFilteredJobData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [companyLogos, setCompanyLogos] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Fetch job data from the server
        axios.get('http://localhost:3500/jobData')
            .then(response => {
                setJobData(response.data);
                setFilteredJobData(response.data); // Initially set filtered data to all jobs
                fetchCompanyLogos(response.data);
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
            });
    }, []);

    // Update filtered job data when search query changes
    useEffect(() => {
        const filteredJobs = jobData.filter(job =>
            job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredJobData(filteredJobs);
    }, [searchQuery, jobData]);

    const fetchCompanyLogos = async (jobs) => {
        const logos = {};
        for (const job of jobs) {
            try {
                const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(job.companyName)}`);
                if (response.data && response.data.length > 0) {
                    logos[job.companyName] = response.data[0].logo;
                } else {
                    logos[job.companyName] = ''; // Set empty string if logo not found
                }
            } catch (error) {
                console.error('Error fetching company logo:', error);
                logos[job.companyName] = ''; // Set empty string if error occurs
            }
        }
        setCompanyLogos(logos);
    };

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleNewPosition = () => {
        navigate('/UserData', { replace: true });
    }

    return (
        <div>
            <nav className='navbar'>
                <main>
                    <div className='navbar-contents'>
                        <div className='left-side'><h1>JOB SEEKER</h1></div>
                        <div className='right-side'>
                            <button id='new_button' onClick={handleNewPosition}>New Position</button>
                        </div>
                    </div>
                </main>
            </nav>
            <div id='jobPostings'>
                <input
                    type="text"
                    placeholder="Search by job title"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className="container">
                    {filteredJobData.map(job => (
                        <div className="card" key={job._id}>
                            <img src={companyLogos[job.companyName]} alt='company-logo' />
                            <p>Company Name: {job.companyName}</p>
                            <p>Contact Email: {job.contactEmail}</p>
                            <p>Job Title: {job.jobTitle}</p>
                            <p>Job Description: {job.jobDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserHome;

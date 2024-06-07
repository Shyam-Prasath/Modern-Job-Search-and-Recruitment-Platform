import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hire.css'  // Import the CSS file
import { useNavigate } from 'react-router-dom';

const HireHome = () => {
    const [userData, setUserData] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from the server
        axios.get('http://localhost:3500/userData')
            .then(response => {
                setUserData(response.data);
                setFilteredUserData(response.data); // Initially set filtered data to all users
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    // Update filtered user data when search query changes
    useEffect(() => {
        const filteredUsers = userData.filter(user =>
            user.job.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUserData(filteredUsers);
    }, [searchQuery, userData]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleNewPosition = () => {
        navigate('/HiringCompany'); // Navigate to new position page
    };
    
    return (
        <div>
        <nav>
            <main>
                <div className='NavBar-contents'>
                    <div className='Left-Side'><h1>Hiring Canditate</h1></div>
                    <div className='Right-Side'>
                        <button id='New_Position' onClick={handleNewPosition}>New Position</button>
                    </div>
                </div>
            </main>
        </nav>
        <div id='home'>
            <input
                type="text"
                placeholder="Search by Job"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="container">
                {filteredUserData.map(user => (
                    <div className="card" key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Job: {user.job}</p>
                        <p>Degree: {user.degree}</p>
                        <p>Resume: <a href={user.resume} target="_blank" rel="noopener noreferrer">Download</a></p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default HireHome;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDataUpload from './UserDataUpload';
import UserHome from './UserHome';
import HiringCompanyForm from './HiringCompanyForm';
import HireHome from './HireHome';
import Login from './Login';
import Register from './Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserData" element={<UserDataUpload />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/HiringCompany" element={<HiringCompanyForm />} />
        <Route path="/HireHome" element={<HireHome />} />
      </Routes>
    </Router>
  );
};

export default App;

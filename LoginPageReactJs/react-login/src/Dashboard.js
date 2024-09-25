import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure you have axios installed
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        emailId: '',
        gender: '',
        address: '',
        experience: '',
        skills: [],
        languages: [], // Store languages as an array of objects
        signature: '',
    });

    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get('http://localhost:8080/api/dashboard/userdata', {
                    params: { username }
                });
                setFormData({
                    ...response.data,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditRedirect = () => {
        console.log("FormData before redirect:", formData);
        navigate('/register', { state: { formData, fromDashboard: true } });
    };

    const handleLogout = () => {
        
        localStorage.removeItem('username'); // Adjust according to how you're storing user data
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="container">
            <h1>User Dashboard</h1>

            <div>
                <h2>Personal Information</h2>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="First Name"
                    />
                </div>
                {formData.middleName && (
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Middle Name"
                    />
                </div>
                )}
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Last Name"
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Username"
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="emailId"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Email"
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Gender"
                    />
                </div>
                <div className="input-wrapper">
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Address"
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        placeholder="Experience"
                    />
                </div>
            </div>

            <div>
                <h3>Skills:</h3>
                <ul>
                    {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
                        formData.skills.map((skill, index) => (
                            <li key={index}>{skill.name}</li>
                        ))
                    ) : (
                        <li>No skills available</li>
                    )}
                </ul>
            </div>

            <div>
                <h2>Languages</h2>
                <ul>
                    {formData.languages.length > 0 ? (
                        formData.languages.map((language, index) => (
                            <li key={index}>
                                <strong>{language.language}</strong>:
                                <ul>
                                    <li>Speak: {language.speak ? "Yes" : "No"}</li>
                                    <li>Write: {language.write ? "Yes" : "No"}</li>
                                    <li>Listen: {language.listen ? "Yes" : "No"}</li>
                                </ul>
                            </li>
                        ))
                    ) : (
                        <li>No languages available</li>
                    )}
                </ul>
            </div>
            <button className="edit-button" onClick={handleEditRedirect}>
                Edit
            </button>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;

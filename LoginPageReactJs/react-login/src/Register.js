import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize formData with the received data from Dashboard
    const initialFormData = location.state ? {
        ...location.state.formData,
        password: '',
    } : {
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        emailId: '',
        gender: '',
        address: '',
        experience: '',
        skills: '',
        languages: [], // Store languages as an array of objects
        signature: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [newLanguage, setNewLanguage] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaveMode, setIsSaveMode] = useState(true);


    const isFromDashboard = location.state?.fromDashboard || false;

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/register/skills'); // Adjust URL as necessary
                setSkills(response.data); // Assuming response.data is an array of skills

                if (location.state && location.state.formData) {
                    // Map the selected skills from the formData
                    const formSkills = location.state.formData.skills || [];
                    setSelectedSkills(formSkills.map(skill => skill.id)); // Assuming you're storing skill IDs
                }

            } catch (error) {
                console.error("Error fetching skills!", error);
            }
        };

        const fetchLanguages = async () => { // Fetch languages function
            try {
                const response = await axios.get('http://localhost:8080/api/register/languages'); // Adjust URL as necessary
                setLanguages(response.data); // Assuming response.data is an array of languages
            } catch (error) {
                console.error("Error fetching languages!", error);
            }
        };

        fetchLanguages();
        fetchSkills();
    }, []);

    const handleSkillChange = (e) => {
        const selectedId = parseInt(e.target.value);
        if (!selectedSkills.includes(selectedId)) {
            setSelectedSkills([...selectedSkills, selectedId]); // Add the selected skill ID
        }
        e.target.value = ''; // Reset the dropdown to the default option
    };

    // Languages
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                languages: prevData.languages.map((lang) =>
                    lang.language === name ? { ...lang, [e.target.dataset.type]: checked } : lang
                ),
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleLanguageChange = (e) => {
        const language = e.target.value;

        if (language && !formData.languages.some(lang => lang.language === language)) {
            // Add the new language with default proficiency to the form data
            setFormData((prevState) => ({
                ...prevState,
                languages: [...prevState.languages, { language, speak: false, write: false, listen: false }],
            }));
        }
        setSelectedLanguage('');
    };

    const removeSkill = (id) => {
        setSelectedSkills(selectedSkills.filter(selectedId => selectedId !== id));
    };

    const removeLanguage = (language) => {
        setFormData((prevState) => ({
            ...prevState,
            languages: prevState.languages.filter(lang => lang.language !== language),
        }));
    };

    const handleDashoardRedirect = () => {
        navigate('/dashboard', { state: { formData } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            skills: selectedSkills, // Include selectedSkills in the form data
        };

        if (formData.password.length == 0) {
            setErrorMessage("Password is required.");
            return;
        } else if (formData.password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        

        console.log("Payload to be sent:", updatedFormData);

        try {
            let response;
            // Check if coming from the dashboard (new user)
            if (location.state) {
                response = await axios.put('http://localhost:8080/api/register/update', updatedFormData); // Existing user registration API
                alert(response.data);
            } else {
                response = await axios.post('http://localhost:8080/api/register/save', updatedFormData); //  New user registration API
                alert(response.data);
                navigate('/login');
            }

        } catch (error) {
            // Check if error response exists and handle accordingly
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message from backend
            } else {
                console.error("There was an error registering!", error);
                setErrorMessage("Something happened! Registration failed.");
            }
        }
    };

    const handleUserDelete = async (e) => {

        try {
            const username = localStorage.getItem('username');
            const response = await axios.put('http://localhost:8080/api/register/delete', {
                username
            });
            localStorage.removeItem('username');
            navigate('/login')
            alert(response.data);
        } catch (error) {
            // Check if error response exists and handle accordingly
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message from backend
            } else {
                console.error("There was an error registering!", error);
                setErrorMessage("Something happened! Deletion failed.");
            }
        }
    };

    return (
        <div className="container">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="firstName">First Name*</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="middleName">Middle Name</label>
                    <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="lastName">Last Name*</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="username">Username*</label>
                    <input autoComplete="off" type="text" id="username" name="username" value={formData.username} onChange={handleChange} required
                        disabled={location.state ? true : false} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="password">Password*</label>
                    <input autoComplete="off" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required={isSaveMode} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="emailId">Email Id*</label>
                    <input type="emailId" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} required />
                </div>
                <div className="mb-3 input-wrapper">
                    <label>Gender*</label>
                    <div className="gender-group">
                        <label htmlFor="male">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                required
                            /> Male
                        </label>
                        <label htmlFor="female">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            /> Female
                        </label>
                        <label htmlFor="others">
                            <input
                                type="radio"
                                id="others"
                                name="gender"
                                value="others"
                                checked={formData.gender === 'others'}
                                onChange={handleChange}
                            /> Others
                        </label>
                    </div>
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="address">Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="experience">Experience (In years)</label>
                    <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="skills">Skills*</label>
                    <select id="skills" onChange={handleSkillChange}>
                        <option value="">Select a skill</option>
                        {skills.map(skill => (
                            <option key={skill.id} value={skill.id}>{skill.name}</option>
                        ))}
                    </select>
                    <div className="selected-skills">
                        {selectedSkills.map(id => {
                            const skill = skills.find(s => s.id === id);
                            return skill ? (
                                <div key={id} style={{ display: 'flex', alignItems: 'left', marginTop: '7px', marginBottom: '5px', marginLeft: '5px' }}>
                                    <div style={{ flex: '1', maxWidth: '20px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {skill.name}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(id)}
                                        style={{
                                            marginLeft: '165px',
                                            border: 'none',
                                            background: 'none',
                                            color: 'red',
                                            cursor: 'pointer',
                                            fontSize: '20px', // Increase font size
                                            padding: '0 5px', // Add horizontal padding
                                            lineHeight: '1.1', // Adjust line height for better alignment
                                            flexShrink: 0,
                                        }}
                                    >
                                        &times; {/* Cross symbol for removal */}
                                    </button>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="language">Select Language:</label>
                    <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
                        <option value="">Select a language</option>
                        {languages.map(language => (
                            <option key={language.id} value={language.name}>{language.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 input-wrapper">
                    <label>Languages Known*</label>
                    {formData.languages.map((language, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'left', marginTop: '5px', marginBottom: '5px' }}>
                            <div style={{ flex: '1', maxWidth: '20px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {language.language}
                            </div>
                            <div style={{ marginLeft: '140px', flexShrink: 0, }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={language.language}
                                        data-type="speak"
                                        checked={language.speak}
                                        onChange={handleChange}
                                    />
                                    Speak
                                </label>
                            </div>
                            <div style={{ marginLeft: '10px', flexShrink: 0, }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={language.language}
                                        data-type="write"
                                        checked={language.write}
                                        onChange={handleChange}
                                    />
                                    Write
                                </label>
                            </div>
                            <div style={{ marginLeft: '10px', flexShrink: 0, }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={language.language}
                                        data-type="listen"
                                        checked={language.listen}
                                        onChange={handleChange}
                                    />
                                    Listen
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeLanguage(language.language)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    color: 'red',
                                    cursor: 'pointer',
                                    fontSize: '20px', // Increase font size
                                    marginLeft: '10px', // Add some spacing
                                }}
                            >
                                &times; {/* Cross symbol for removal */}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor="signature">Signature*</label>
                    <input type="text" id="signature" name="signature" value={formData.signature} onChange={handleChange} required />
                </div>
                <button type="submit">Save</button>
                {isFromDashboard && (
                    <div>
                        <button className="dashboard-button" onClick={handleDashoardRedirect}>Dashboard</button>
                    </div>
                )}

                {isFromDashboard && (
                    <button className="dashboard-button" onClick={() => {setIsSaveMode(false);handleUserDelete();}}>Delete Account</button>
                )}


                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Registration;

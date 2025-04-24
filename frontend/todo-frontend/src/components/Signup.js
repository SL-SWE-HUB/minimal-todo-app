import React, { useState } from 'react';
import { registerUser } from '../api/AuthService';
import { useNavigate } from 'react-router-dom'; 

function Signup( {setUserStatus} ){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const newUser = await registerUser({username, password});
            if(newUser){
            navigate('/login');
            }
            else
                setError('Registration failed');
        }catch(error){
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Signup;
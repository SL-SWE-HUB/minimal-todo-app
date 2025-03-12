import React, { useState } from 'react';
import { registerUser } from '../api/AuthService';

function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const newUser = await registerUser({username, password});
            setMessage(`User ${newUser.username} registered successfully`);
        }catch(error){
            setMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    )
}

export default Signup;
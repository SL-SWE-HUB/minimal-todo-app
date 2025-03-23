import React, {useState} from 'react';
import {loginUser} from '../api/AuthService';
import { useNavigate } from 'react-router-dom';

function Login( {setUserStatus} ){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await loginUser({username, password});
            if(result != null){
                setMessage(`User ${result.username} logged in successfully!`);
                setUserStatus('authenticated');
                navigate('/home');
            }
            else{
                setMessage('Invalid Credentials. Try Again.');
                setError('Invalid Credentials')
            }
        }catch(error){
            setMessage(`Error. Log in Failed. Try Again.`);
        }
    };

    const handleGuest = () => {
        setUserStatus('guest');
        navigate('/home');
    }
    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
            {error && <p>{error}</p>}
            <hr />
            <button onClick={handleGuest}>Continue as Guest</button>
        </div>
    );
}

export default Login;
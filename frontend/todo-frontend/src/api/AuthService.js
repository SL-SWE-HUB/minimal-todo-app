const AUTH_BASE_URL = 'http://localhost:8080/user';

export async function registerUser(user){
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    if(!response.ok){
        throw new Error(`Failed to register: ${response.statusText}`);
    }
    return response.json();
}

export async function loginUser(user){ 
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    if(!response.ok){
        throw new Error(`Failed to login: ${response.statusText}`);
    }
    return response.json();
}
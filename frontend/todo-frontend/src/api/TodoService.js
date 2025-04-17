const API_BASE_URL = 'http://localhost:8080/todo';

export async function getTodos(){
    const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        credentials: 'include'
    });
    console.log(response);
    if(!response.ok){
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    return response.json();
}

export async function createTodo(todoData){
    const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
        body: JSON.stringify(todoData)    
      });
      if (!response.ok) {
        throw new Error(`Failed to create todo: ${response.statusText}`);
      }
      return response.json();
}

export async function updateTodo(id, updatedTodo){
    const response = await fetch(`${API_BASE_URL}/updateTodo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(updatedTodo)
    });
    if(!response.ok){
        throw new Error(`Failed to update todo: ${response.statusText}`);
    }
    return response.json();
}

export async function deleteTodo(id){
    const response = await fetch(`${API_BASE_URL}/deleteTodo/${id}`, {
        method: "DELETE",
        credentials: 'include',
    });
    if(!response.ok){
        throw new Error(`Failed to delete todo ${response.statusText}`);
    }
    if(response.status === 204){
        return null;
    }
    const responseDetails = await response.text();
    return responseDetails ? JSON.parse(responseDetails) : null;
}


export async function loadUserTodos(userId){
    // forbidden
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      console.log(`Frontend TodoService loadUserTodos response.status: ${response.status}} | response.blob: ${response.blob}`);
      if (!response.ok) {
        throw new Error(`Failed to load user todos: ${response.statusText}`);
      }
      return response;
}
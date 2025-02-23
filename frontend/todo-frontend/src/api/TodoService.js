const API_BASE_URL = 'http://localhost:8080/todo';

export async function getTodos(){
    const response = await fetch(`${API_BASE_URL}`);
    console.log(response);
    if(!response.ok){
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    return response.json();
}

export async function createTodo(todo){
    const response = await fetch(`${API_BASE_URL}/newtodo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    });

    if(!response.ok){
        throw new Error(`Failed to create todo ${response.statusText}`);
    }
    return response.json();
}

export async function updateTodo(id, updatedTodo){
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
    });
    if(!response.ok){
        throw new Error(`Failed to update todo: ${response.statusText}`);
    }
    return response.json();
}

export async function deleteTodo(id){
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if(!response.ok){
        throw new Error(`Failed to delete todo ${response.statusText}`);
    }
    return response.json();
}
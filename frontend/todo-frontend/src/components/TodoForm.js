import React, {useState} from 'react';

/**
 * Functional Component: TodoForm
 * @param {object} props - Contains:
 * - onAdd: Callback function to add a new to-do item
 */

function TodoForm({ onAdd }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        if(!title.trim()){
            return;
        }

        const newTodo = {
            title: title.trim(),
            description: description.trim(),
            completed: false
        };

        onAdd(newTodo); 

        setTitle('');
        setDescription('');
    };

    return (
        <div className="center-form">
            <form onSubmit={handleSubmit} className="form-style">
                <div>
                    <label htmlFor="todo-title">Title:</label>
                    <input
                        type="text"
                        id="todo-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Enter todo title'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="todo-description">Description:</label>
                    <textarea
                    id="todo-description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter todo description"
                    />
                </div>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );

}

export default TodoForm;
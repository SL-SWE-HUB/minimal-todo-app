import React, {useState} from 'react';

/**
 * Functional Component: TodoForm
 * @param {object} props - Contains:
 * - onAdd: Callback function to add a new to-do item
 */

function TodoForm({ onAdd }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    /**
     * Handling form submissions (non-default)
     * Customized function, prevemts the default form submission behavior 
     * Validaties input, creates a new to-do obj, calls the onAdd(), and resets form
     */

    const handleSubmit = event => {
        event.preventDefault();
        if(!title.trim()){
            //If title is empty after trimming whitespace, dont submit (empty string)
            return;
        }

        const newTodo = {
            title: title.trim(),
            description: description.trim(),
            completed: false
        };

        onAdd(newTodo); // Gathered data -> New Obj is passed to parent component via onAdd

        // Form and title Reset 
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px'}}>
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
    );

}

export default TodoForm;
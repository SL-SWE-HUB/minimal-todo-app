import React from 'react';

/**
@param {object} props 
 *  - todo: the todo item object (Long id, String title, boolean completed)
 *  - onToggle: function to call when toggling completion
 *  - onDelete: function to call whe deleting the item 
 */

function TodoItem( {todo, onToggle, onDelete} ){
    const itemStyle = {
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom:'8px'
    };

    const titleStyle = {
        textDecoration: todo.completed ? 'line-through' : 'none'
    };



    return (
        <div style={itemStyle}>
            <h3 style={titleStyle}>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => onToggle(todo.id)}>{todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}</button>
            <button onClick={() => onDelete(todo.id)} style={{marginLeft: '8px'}}>Delete</button>
        </div>
    );
}

export default TodoItem;
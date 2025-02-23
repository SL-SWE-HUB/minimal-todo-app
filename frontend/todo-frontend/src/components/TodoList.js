import React from 'react';
import TodoItem from './TodoItem';

/**
 * @param {object} props - Contains
 * - todos: an array of todo-objects
 * - onToggle: Callback function for toggling a to-do's completion status
 * - onDelete: Callback fubction for deleting a to-do item
 */

function TodoList( {todos, onToggle, onDelete} ){
    if(todos.length === 0){
        return <p>No todos available. Please add some tasks!</p>;
    }

    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}


export default TodoList;
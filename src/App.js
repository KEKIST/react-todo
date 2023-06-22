import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        id: '',
        title: '',
        description: '',
        createdAt: '',
        completed: false,
    });

    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = () => {
        const id = uuid();
        const createdAt = new Date().toLocaleDateString();
        setTasks([...tasks, { ...newTask, id, createdAt }]);
        setNewTask({ id: '', title: '', description: '', createdAt: '', completed: false });
    };

    const handleEditTask = (id, updatedTask) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, ...updatedTask };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    const handleCompleteTask = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div>
            <table className="task-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            name="title"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={handleInputChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="description"
                            placeholder="Task description"
                            value={newTask.description}
                            onChange={handleInputChange}
                        />
                    </td>
                    <td></td>
                    <td>
                        <button onClick={handleAddTask}>Add Task</button>
                    </td>
                </tr>
                {tasks.map((task) => (
                    <tr key={task.id} className={task.completed ? 'completed' : ''}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.createdAt}</td>
                        <td>
                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            <button
                                onClick={() =>
                                    handleEditTask(task.id, {
                                        title: prompt('Enter new title:', task.title),
                                        description: prompt('Enter new description:', task.description),
                                    })
                                }
                            >
                                Edit
                            </button>
                            <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import './../Tasks.css';
import { BsArrowBarUp, BsArrowBarDown, BsTrash, BsCheckCircle, BsCheckCircleFill, BsExclamationCircle } from "react-icons/bs";

function ToDo() {
    const [tasks, setTasks] = useState(() => {
        // Initialize tasks from localStorage or default value
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : ["Read Chapter 4"];
    });

    const [newTask, setNewTask] = useState("");
    const [activeTasks, setActiveTasks] = useState(() => {
        // Initialize activeTasks from localStorage or default value
        const savedActiveTasks = localStorage.getItem('activeTasks');
        return savedActiveTasks ? JSON.parse(savedActiveTasks) : [false];
    });

    const [completedTasksCount, setCompletedTasksCount] = useState(0); // State for completed tasks count

    useEffect(() => {
        // Save tasks to localStorage whenever tasks or activeTasks change
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
    }, [tasks, activeTasks]);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    }

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setActiveTasks([...activeTasks, false]); // Initialize new task as inactive
            setNewTask("");
        }
    }

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedActiveTasks = [...activeTasks];
        updatedActiveTasks.splice(index, 1); // Remove corresponding active state
        setTasks(updatedTasks);
        setActiveTasks(updatedActiveTasks);
        if (activeTasks[index]) {
            setCompletedTasksCount(prevCount => prevCount - 1); // Decrease completed tasks count if deleted task was completed
        }
    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            const updatedActiveTasks = [...activeTasks];
            [updatedActiveTasks[index], updatedActiveTasks[index - 1]] = [updatedActiveTasks[index - 1], updatedActiveTasks[index]];
            setTasks(updatedTasks);
            setActiveTasks(updatedActiveTasks);
        }
    }

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            const updatedActiveTasks = [...activeTasks];
            [updatedActiveTasks[index], updatedActiveTasks[index + 1]] = [updatedActiveTasks[index + 1], updatedActiveTasks[index]];
            setTasks(updatedTasks);
            setActiveTasks(updatedActiveTasks);
        }
    }

    const importantTodo = (index) => {
        if (index === 0) {
            return;
        }
        const updatedTasks = [...tasks];
        const taskToMove = updatedTasks.splice(index, 1)[0];
        updatedTasks.unshift(taskToMove);
        const updatedActiveTasks = [...activeTasks];
        const activeTaskToMove = updatedActiveTasks.splice(index, 1)[0];
        updatedActiveTasks.unshift(activeTaskToMove);
        setTasks(updatedTasks);
        setActiveTasks(updatedActiveTasks);
    }

    const handleChangeActive = (index) => {
        setActiveTasks(prevActiveTasks => {
            const newActiveTasks = [...prevActiveTasks];
            newActiveTasks[index] = !newActiveTasks[index]; // Toggle active state of clicked task
            if (newActiveTasks[index]) {
                setCompletedTasksCount(prevCount => prevCount + 1); // Increase completed tasks count if task is marked as completed
            } else {
                setCompletedTasksCount(prevCount => prevCount - 1); // Decrease completed tasks count if task is marked as incomplete
            }
            return newActiveTasks;
        });
    }

    const deleteAllTasks = () => {
        setTasks([]);
        setActiveTasks([]);
        setCompletedTasksCount(0); // Reset completed tasks count
        localStorage.removeItem('tasks');
        localStorage.removeItem('activeTasks');
    }

    return (
        <div className='toDo'>
            <div>
                <input
                    type='text'
                    placeholder='I need to work on...'
                    value={newTask}
                    onChange={handleInputChange} />

                <button
                    className='t-btn'
                    id='add-button'
                    onClick={addTask}>
                    Add
                </button>

                <button
                    className='t-btn'
                    id='delete-all-button'
                    onClick={deleteAllTasks}>
                    Delete All 
                </button>
                <span className='t-btn completed'>{completedTasksCount} completed</span>
                <ol>
                    {tasks.map((task, index) =>
                        <li className={activeTasks[index] ? 'active-task' : 'inactive-task'} key={index}>
                            <ToggleIcons
                                active={activeTasks[index]}
                                handleChangeActive={() => handleChangeActive(index)} />
                            <span className='text'> {task} </span>

                            <button
                                className='t-btn'
                                id='priority-button'
                                onClick={() => importantTodo(index)}>
                                <BsExclamationCircle />
                            </button>

                            <button
                                className='t-btn'
                                id='delete-button'
                                onClick={() => deleteTask(index)}>
                                <BsTrash />
                            </button>
                            <button
                                className='t-btn move-button'
                                id='up-button'
                                onClick={() => moveTaskUp(index)}>
                                <BsArrowBarUp />
                            </button>
                            <button
                                className='t-btn move-button'
                                id='down-button'
                                onClick={() => moveTaskDown(index)}>
                                <BsArrowBarDown />
                            </button>

                        </li>
                    )}
                </ol>
            </div>

        </div>
    );
}

function ToggleIcons({ active, handleChangeActive }) {
    return (
        <div className="toggle-wrapper">
            {active ? (
                <BsCheckCircleFill
                    className="active"
                    id='checked'
                    alt="Done"
                    onClick={handleChangeActive}
                />
            ) : (
                <BsCheckCircle
                    className="inactive"
                    id='unchecked'
                    alt="Not Done"
                    onClick={handleChangeActive}
                />
            )}
        </div>
    );
}

export default ToDo;

import { createContext, useEffect, useState } from "react";

const TaskContext = createContext()

function TaskProvider({ children }) {

    // Khởi tạo state chung cho chức năng quản lý Task
    const [tasks, setTasks] = useState([])
    const [tasksThongKe, setTasksThongKe] = useState([])


    // Get data khởi tạo lần đầu
    useEffect(() => {
        getTask()
    }, [])

    // Xử lý get task từ db.json
    const getTask = async () => {
        const response = await fetch('http://localhost:3001/tasks')
        const responseJSON = await response.json()

        setTasks(responseJSON)
        setTasksThongKe(responseJSON)
    }

    // Xử lý create task vào db.json
    const createTask = async ({ name, detail, startDate, endDate, mode, rating, status }) => {
        const response = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, detail, startDate, endDate, mode, rating, status })
        })

        const data = await response.json()
        setTasks([...tasks, data])
    }

    // Xử lý update task vào db.json
    const updateTask = async ({ name, detail, startDate, endDate, mode, rating, status }, id) => {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, detail, startDate, endDate, mode, rating, status })
        })

        const data = await response.json()

        setTasks([...tasks.filter((task) => task.id !== id), data])
    }

    // Xử lý xóa task khỏi db.json
    const deleteTask = async(id) => {

        await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Xử lý search task by name db.json
    const findTaskByMultiCondition = async(name, status) => {
        if (status === 'All') {
            const response = await fetch(`http://localhost:3001/tasks/?name_like=${name}`)
            const responseJSON = await response.json()
            setTasks(responseJSON)
        } else {
            const response = await fetch(`http://localhost:3001/tasks/?name_like=${name}&status=${status}`)
            const responseJSON = await response.json()
            setTasks(responseJSON)
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, tasksThongKe, setTasksThongKe, deleteTask, createTask, getTask, updateTask, findTaskByMultiCondition }}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext, TaskProvider} 
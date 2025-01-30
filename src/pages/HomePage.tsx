import React, {useEffect, useState} from 'react';
import AddTaskForm from "../features/task/ui/AddTaskForm";
import TaskList from "../features/task/ui/TaskList";
import useTasks from "../features/task/lib/useTasks";
import {useTaskActions} from "../features/task/lib/useTaskActions";
import { taskStore} from "../app/store";

const HomePage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const taskActions = useTaskActions(selectedDate);
    const { state, actions } = taskStore
    const { data: tasks, tasksFromQuery, isLoading, isError } = useTasks(state.date);

    useEffect(() => {
        if (tasksFromQuery) {
            state.actions.setDate(tasksFromQuery,selectedDate);
        }
    }, [tasksFromQuery])

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error loading tasks</span>;
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <AddTaskForm date={selectedDate} onAddTask={taskActions.addTask} />
            <TaskList tasks={tasks} onDelete={taskActions.deleteTask}
                      onUpdate={taskActions.updateTask}
                      onUpdateCompleted={taskActions.updateTaskCompleted} />
        </div>
    );
};

export default HomePage;
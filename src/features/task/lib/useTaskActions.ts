import { useQueryClient } from '@tanstack/react-query';
import { ITask, getTasksFromStorage, saveTasksToStorage } from "../model";

export const useTaskActions = (date: string) => {
    const queryClient = useQueryClient();

    const addTask = async (text: string) => {
        const tasks = getTasksFromStorage(date);
        const newTask: ITask = {
            id: Date.now().toString(),
            text,
            completed: false,
            date,
        };
        const updatedTasks = [...tasks, newTask];
        saveTasksToStorage(date, updatedTasks);
        await queryClient.invalidateQueries({ queryKey: ['tasks', date] });
    };

    const deleteTask = async (taskId: string) => {
        const tasks = getTasksFromStorage(date);
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        saveTasksToStorage(date, updatedTasks);
        await queryClient.invalidateQueries({ queryKey: ['tasks', date] });
    };

    const updateTask = async (taskId: string, updatedText: string) => {
        const tasks = getTasksFromStorage(date);
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, text: updatedText } : task
        );
        saveTasksToStorage(date, updatedTasks);
        await queryClient.invalidateQueries({ queryKey: ['tasks', date] });
    };

    const updateTaskCompleted = async (taskId: string) => {
        const tasks = getTasksFromStorage(date);
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
        );
        saveTasksToStorage(date, updatedTasks);
        await queryClient.invalidateQueries({ queryKey: ['tasks', date] });
    };

    return { addTask, deleteTask, updateTask, updateTaskCompleted };
};
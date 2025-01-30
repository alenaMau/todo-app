import { Store } from '@tanstack/store';

export interface ITask {
    id: string;
    text: string;
    completed: boolean;
    date: string;
}

const initialState = {
    tasks: [] as ITask[],
    date: new Date().toISOString().split('T')[0],
};

export const taskStore = new Store({
    ...initialState,
    actions: {
        addTask(state, task: ITask) {
            return {
                ...state,
                tasks: [...state.tasks, task],
            };
        },
        deleteTask(state, taskId: string) {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== taskId),
            };
        },
        updateTask(state, updatedTask: ITask) {
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                ),
            };
        },
        updateTaskCompleted(state, taskId: string) {
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
            };
        },
        setDate(state, date: string) {
            return {
                ...state,
                date,
            };
        },
    },
});

export type TaskStore = typeof taskStore;
export type TaskState = typeof taskStore.state;
export type TaskActions = typeof taskStore.actions;
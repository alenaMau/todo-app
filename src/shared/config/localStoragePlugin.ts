import { Plugin } from '@tanstack/react-query';
import {getTasksFromStorage, ITask, saveTasksToStorage} from "../../features/task/model";

const localStoragePlugin: Plugin = {
    onHydrate: (state, { queryKey }) => {
        const [key, date] = queryKey;
        if (key === 'tasks') {
            const tasks = getTasksFromStorage(date as string);
            return { data: tasks };
        }
        return state;
    },
    onSuccess: (_, variables, __, context, { queryKey }) => {
        const [key, date] = queryKey;
        if (key === 'tasks' && context?.data) {
            saveTasksToStorage(date as string, context.data as ITask[]);
        }
    },
};

export default localStoragePlugin;
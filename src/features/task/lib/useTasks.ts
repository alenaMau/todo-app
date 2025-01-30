import {getTasksFromStorage, ITask} from "../model";
import { useQuery } from '@tanstack/react-query';

const fetchTasks = (date: string): ITask[] => {
    return getTasksFromStorage(date);
};

export const useTasks = (date: string) => {
    return useQuery<ITask[], Error>({
        queryKey: ['tasks', date],
        queryFn: () => fetchTasks(date),
        initialData: getTasksFromStorage(date),
    });
};

export default useTasks
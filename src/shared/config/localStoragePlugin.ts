import { getTasksFromStorage, ITask, saveTasksToStorage } from "../../features/task/model";

const localStoragePlugin = {
    onHydrate: (state: string, { queryKey }: { queryKey: [string, string] }) => {
        const [key, date] = queryKey;
        if (key === 'tasks') {
            const tasks = getTasksFromStorage(date);
            return { data: tasks };
        }
        return state;
    },
    onSuccess: function (
        _: any,
        __: any,
        ___: any,
        context: { data?: ITask[] },
        { queryKey }: { queryKey: [string, string] }
    ) {
        const [key, date] = queryKey;
        if (key === 'tasks' && context?.data) {
            saveTasksToStorage(date, context.data);
        }
    },
};

export default localStoragePlugin;
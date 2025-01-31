import React, { useEffect, useState } from "react";
import useTasks from "../lib/useTasks";
import DropDownMenu from "../../drop-down/ui/DropDownMenu";

interface ITaskListItem {
    onDelete: (taskId: string) => void
    onUpdate: (taskId: string, updatedText: string) => void;
    onUpdateCompleted: (taskId: string) => void
    onDateChange: (date: string) => void
}

const TaskList: React.FC<ITaskListItem> = ({ onDelete, onUpdate, onUpdateCompleted, onDateChange }) => {
    const [currentDate, setCurrentDate] = useState('')
    const date = new Date().toISOString().split('T')[0]
    const { data: tasks, isLoading, isError, error } = useTasks(currentDate ? currentDate : date)

    useEffect(() => {
        onDateChange(currentDate)
    }, [currentDate])

    if (isLoading) {
        return <span>Загрузка...</span>
    }
    if (isError) {
        return <span>Ошибка: {error.message}</span>
    }

    const handleUpdate = (taskId: string) => {
        const updatedText = prompt('Введите новый текст задачи:');
        if (updatedText) {
            onUpdate(taskId, updatedText);
        }
    };

    return (
        <div className="relative overflow-x-auto">
            <DropDownMenu onDateChange={setCurrentDate} />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#242424] dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Задача</th>
                    <th scope="col" className="px-6 py-3">Статус</th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id} className="bg-white border-b dark:bg-[#242424] dark:border-gray-9000 border-gray-200 outline">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {task.text}
                        </th>
                        <td className="px-6 py-4">
                            <button
                                className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 me-2 mb-2"
                                onClick={() => onUpdateCompleted(task.id)}>
                                {task.completed ? "Выполнено" : "Выполняется"}
                            </button>
                        </td>
                        <td>{task.date}</td>
                        <td className="px-6 py-4">
                            <button
                                className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 me-2 mb-2"
                                onClick={() => onDelete(task.id)}>
                                Удалить
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 me-2 mb-2"
                                onClick={() => handleUpdate(task.id)}>
                                Обновить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default TaskList;
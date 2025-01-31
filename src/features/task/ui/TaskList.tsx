import React, {useEffect, useState} from "react";
import useTasks from "../lib/useTasks";
import '../../../App.css'
import DropDownMenu from "../../drop-down/ui/DropDownMenu";
import Button from "../../../shared/components/Button.tsx";
import {TableHeader} from "../../../shared/components/TableHeader.tsx";

interface ITaskListItem {
    onDelete: (taskId: string) => void
    onUpdate: (taskId: string, updatedText: string) => void;
    onUpdateCompleted: (taskId: string) => void
    onDateChange: (date: string) => void
}

const TaskList: React.FC<ITaskListItem> = ({onDelete, onUpdate, onUpdateCompleted, onDateChange}) => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const {
        data: tasks,
        isLoading,
        isError,
        error
    } = useTasks(currentDate ? currentDate : new Date().toISOString().split('T')[0])

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
        <div className="relative overflow-x-auto justify-center w-full flex flex-col items-center">
            <DropDownMenu onDateChange={setCurrentDate}/>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#242424] dark:text-gray-400">
                <TableHeader/>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}
                        className="bg-white border-b dark:bg-[#242424] dark:border-gray-9000 border-gray-200 outline">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {task.text}
                        </th>
                        <td className="px-6 py-4">
                            <Button onClick={() => onUpdateCompleted(task.id)}>
                                {task.completed ? "Выполнено" : "Выполняется"}
                            </Button>
                        </td>
                        <td>{task.date}</td>
                        <td className="px-6 py-4">
                            <Button
                                onClick={() => onDelete(task.id)}>
                                Удалить
                            </Button>
                        </td>
                        <td className="px-6 py-4">
                            <Button
                                onClick={() => handleUpdate(task.id)}>
                                Обновить
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default TaskList;
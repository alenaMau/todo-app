import React, {useState} from 'react';

interface AddTaskFormProps {
    date: string
    onAddTask: (text: string) => void
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({onAddTask}) => {
    const [text, UseForm] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            onAddTask(text)
            UseForm('')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-row">
            <input
                type="text"
                value={text}
                className="bg-gray-100 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 m-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => UseForm(e.target.value)}
                placeholder="Новая задача"
            />
            <button type="submit"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Добавить
            </button>
        </form>
    );
};

export default AddTaskForm;
import React, {useEffect, useState} from 'react';
import {getTasksFromStorage} from "../../task/model";


interface DropDownMenuProps {
    onValueChange: (date: string) => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onValueChange }) => {
    const tasksPattern = /^\d{4}-\d{2}-\d{2}$/;
    const [isOpen, setIsOpen] = useState(false);


    const getAllStorageKeys = (): string[] => {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (tasksPattern.test(localStorage.key(i) as string)) {
                keys[i] = localStorage.key(i) as string
            }
        }
        return keys
    };


    const logTasksForAllDates = () => {
        const allKeys = getAllStorageKeys()
        allKeys.forEach(key => {
            if (tasksPattern.test(key)) {
                getTasksFromStorage(key.split('-').slice(1).join('-'));
            }
        });
    };

    useEffect(() => {
        logTasksForAllDates();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const keys = getAllStorageKeys();

    return (
        <div>
            <div className='w-full py-6 pb-8'>
                <div className="relative inline-block">
                    <button
                        type="button"
                        className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                        onClick={toggleDropdown}>
                        выберите дату
                    </button>
                    {isOpen && (
                        <div
                            className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {keys.map((key) => (
                                    <li key={key} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => onValueChange(key)}>
                                        {key}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropDownMenu;
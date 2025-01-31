import React, {useState} from 'react';

interface IDropDownMenu {
    onDateChange: (date: string) => void;
}

const DropDownMenu: React.FC<IDropDownMenu> = ({onDateChange}) => {
    const tasksPattern = /^\d{4}-\d{2}-\d{2}$/
    const [isOpen, setIsOpen] = useState(false)

    const getAllStorageKeys = (): string[] => {
        const keys: string[] = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key && tasksPattern.test(key)) {
                keys.push(key)
            }
        }
        return keys
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
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
                        Выберите дату
                    </button>
                    {isOpen && (
                        <div
                            className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {keys.map((key) => (
                                    <li key={key} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => onDateChange(key)}>
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
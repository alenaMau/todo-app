import React, {useState} from 'react';
import {ITask} from "../model";

interface TaskItemProps {
    task: ITask;
    onDeleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onDelete, onUpdate}) => {
    const handleDelete = () => {
        onDelete(task.id);
    };
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );

};



export default TaskItem;
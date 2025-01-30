import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AddTaskForm from "./features/task/ui/AddTaskForm";
import TaskList from "./features/task/ui/TaskList";
import {QueryClientProvider} from '@tanstack/react-query';
import HomePage from "./pages/HomePage";
import queryClient from "./shared/config/queryClient";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <HomePage/>
            <App/>
        </QueryClientProvider>
    </StrictMode>
)

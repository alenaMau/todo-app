import { QueryClient } from '@tanstack/react-query';
import localStoragePlugin from './localStoragePlugin'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000, // Данные считаются свежими в течение 5 секунд
            cacheTime: 10000, // Данные остаются в кеше в течение 10 секунд после того, как они стали несвежими
        },
    },
    plugins: [localStoragePlugin],
});

export default queryClient;
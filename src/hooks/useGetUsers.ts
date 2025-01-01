import { listAllUsers } from '@/api/listAllUsers';
import { useQuery } from '@tanstack/react-query';

export function useGetUsers(searchTerm?: string) {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: listAllUsers,
        select: (users) => {
            if(!searchTerm) return users;

            return users.filter(
                (user) => 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        },
        staleTime: 1000 * 60 *5
    })

    return query
}
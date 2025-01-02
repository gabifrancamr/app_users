import { listAllUsers } from "@/api/listAllUsers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

function getUsers(searchTerm?: string) {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: listAllUsers,
        staleTime: 1000 * 60 * 5
    });

    const filteredUsers = useMemo(() => {
        if (!searchTerm || !query.data) return query.data;

        return query.data.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [query.data, searchTerm]);

    return {
        ...query,
        allUsers: query.data,
        filteredUsers: filteredUsers || []
    };
}

export function useGetUsers() {
    const searchParams = useSearchParams();
    const search = searchParams?.get("search") || "";
    return getUsers(search);
}
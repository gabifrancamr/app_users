"use client"

import { UsersContext } from "@/contexts/usersContexts";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Input } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export function InputSearch() {
    const searchParams = useSearchParams()
    const searchTerm = searchParams?.get("search") || "";
    const [search, setSearch] = useState(searchTerm)

    const { users, setFilteredUsers } = useContext(UsersContext)

    const pathname = usePathname();
    const { replace } = useRouter();


    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (search.length >= 1) {
            params.set('page', '1');
            params.set("search", search)

            const { data: filteredUsers } = useGetUsers(searchTerm);

            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase()),
            )

            setFilteredUsers(filtered)
        } else {
            setFilteredUsers(users)
            params.delete("search")
        }

        replace(`${pathname}?${params.toString()}`);
    }, [search, users])

    return (
        < Input
            value={search}
            onChange={(e) => setSearch(e.target.value)
            }
        />
    )
}
"use client"

import { UsersContext } from "@/contexts/usersContexts";
import { Input } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export function InputSearch() {
    const [inputSearch, setInputSearch] = useState('')
    const { searchParams, users, setFilteredUsers } = useContext(UsersContext)

    const pathname = usePathname();
    const { replace } = useRouter();

    const inputSearchParam = searchParams?.get("search") || "";

    useEffect(() => {
        if (inputSearchParam) {
            setInputSearch(inputSearchParam)
        }
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (inputSearch.length >= 1) {
            params.set('page', '1');
            params.set("search", inputSearch)

            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
                    user.email.toLowerCase().includes(inputSearch.toLowerCase()),
            )

            setFilteredUsers(filtered)
        } else {
            setFilteredUsers(users)
            params.delete("search")
        }

        replace(`${pathname}?${params.toString()}`);
    }, [inputSearch, users])

    return (
        < Input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)
            }
        />
    )
}
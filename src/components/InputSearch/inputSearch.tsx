"use client"

import { Input } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function InputSearch() {
    const searchParams = useSearchParams()
    const searchParam = searchParams?.get("search") || "";
    const [search, setSearch] = useState(searchParam)

    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (search.length >= 1) {
            params.set('page', '1');
            params.set("search", search)

        } else {
            params.delete("search")
        }

        replace(`${pathname}?${params.toString()}`);
    }, [search])

    return (
        < Input
            value={search}
            onChange={(e) => setSearch(e.target.value)
            }
        />
    )
}
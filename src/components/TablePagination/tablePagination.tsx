"use client";

import {
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "@/components/ui/pagination";
import { UsersContext } from "@/contexts/usersContexts";
import { HStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";


export default function TablePagination() {
  
  const { currentPage, filteredUsers, usersPerPage, searchParams } = useContext(UsersContext)

  const usersLength = filteredUsers.length
  const totalPages = Math.ceil(usersLength / usersPerPage)

  const pathname = usePathname();
  const { replace } = useRouter();

  function createPageURL(pageNumber: number){
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationRoot
      count={usersLength}
      pageSize={5}
      page={currentPage}
      display={"flex"}
      justifyContent={"center"}
    >
      <HStack>
        <PaginationPrevTrigger
          disabled={currentPage <= 1} 
          onClick={() => createPageURL(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem 
            type="page" 
            value={index + 1} 
            key={index} 
            onClick={() => createPageURL(index + 1)} 
          />
        ))}
        <PaginationNextTrigger
          disabled={currentPage >= totalPages}
          onClick={() => createPageURL(currentPage + 1)}
        />
      </HStack>
    </PaginationRoot>
  );
}

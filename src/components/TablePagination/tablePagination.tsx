"use client";

import {
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { HStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

interface TablePaginationProps {
  totalUsers: number
}


export default function TablePagination({ totalUsers }: TablePaginationProps) {

  // const { filteredUsers } = useContext(UsersContext)

  const { currentPage, usersPerPage, params } = usePagination()

  // const usersLength = filteredUsers.length
  const totalPages = Math.ceil(totalUsers / usersPerPage)

  const pathname = usePathname();
  const { replace } = useRouter();

  function createPageURL(pageNumber: number) {
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationRoot
      count={totalUsers}
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

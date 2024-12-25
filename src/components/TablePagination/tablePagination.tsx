"use client";

import {
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "@/components/ui/pagination";
import { TablePaginationProps } from "@/types";
import { HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function TablePagination({
  currentPage,
  totalPages,
  usersLength,
}: TablePaginationProps) {
  return (
    <PaginationRoot
      count={usersLength}
      pageSize={5}
      page={currentPage}
      display={"flex"}
      justifyContent={"center"}
    >
      <HStack>
        <Link href={`dashboard?page=${currentPage - 1}`}>
          <PaginationPrevTrigger
            disabled={currentPage <= 1}
          />
        </Link>
        {[...Array(totalPages)].map((_, index) => (
          <Link href={`/dashboard?page=${index + 1}`}>
          <PaginationItem type="page" value={index + 1} key={index} />
          </Link>
        ))}
        <Link href={`dashboard?page=${currentPage + 1}`}>
        <PaginationNextTrigger
          disabled={currentPage >= totalPages}
        />
        </Link>
      </HStack>
    </PaginationRoot>
  );
}

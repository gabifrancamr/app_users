"use client"

import { InputSearch } from "@/components/InputSearch/inputSearch"
import { LoadingUsers } from "@/components/LoadingUsers/loadingUsers"
import { NotFoundUsers } from "@/components/NotFoundUsers/notFoundUsers"
import TablePagination from "@/components/TablePagination/tablePagination"
import UsersTable from "@/components/UsersTable/usersTable"
import { useGetUsers } from "@/hooks/useGetUsers"
import { Box, Flex } from "@chakra-ui/react"

export default function Dashboard() {
  const { isLoading, isError } = useGetUsers();

  return (
    <Box>
      {!isError ? (
        !isLoading ? (
          <Flex alignItems={"flex-start"} justify={"center"} padding={"1.5"}>
            <Box spaceY={3} width={{ base: '100%', md: '700px' }} padding={'2rem'}>
              <InputSearch />
              <UsersTable />
              <TablePagination />
            </Box>
          </Flex>
        ) : (
          <LoadingUsers />
        )
      ) : (
        <NotFoundUsers />
      )
      }
    </Box>
  )
}
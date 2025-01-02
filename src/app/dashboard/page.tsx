"use client"

import { InputSearch } from "@/components/InputSearch/inputSearch"
import { LoadingUsers } from "@/components/LoadingUsers/loadingUsers"
import { NotFoundUsers } from "@/components/NotFoundUsers/notFoundUsers"
import TablePagination from "@/components/TablePagination/tablePagination"
import UsersTable from "@/components/UsersTable/usersTable"
import { useGetUsers } from "@/hooks/useGetUsers"
import { Box, Flex } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"

export default function Dashboard() {

  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";
  const { filteredUsers, isLoading, isError } = useGetUsers(search);

  // if (isLoading) return <LoadingUsers />;
  // if (isError) return <NotFoundUsers />;

  // const {errorFindUsers, users} = useContext(UsersContext)

  return (
    <Box>
      {!isError ? (
        !isLoading ? (
          <Flex alignItems={"flex-start"} justify={"center"} padding={"1.5"}>
            <Box spaceY={3} width={{ base: '100%', md: '700px' }} padding={'2rem'}>
              <InputSearch />
              <UsersTable users={filteredUsers} />
              <TablePagination totalUsers={filteredUsers.length} />
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
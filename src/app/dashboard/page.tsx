"use client"

import { InputSearch } from "@/components/InputSearch/inputSearch"
import { LoadingUsers } from "@/components/LoadingUsers/loadingUsers"
import { NotFoundUsers } from "@/components/NotFoundUsers/notFoundUsers"
import TablePagination from "@/components/TablePagination/tablePagination"
import UsersTable from "@/components/UsersTable/usersTable"
import { UsersContext } from "@/contexts/usersContexts"
import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react"

export default function Dashboard() {
  const {errorFindUsers, users} = useContext(UsersContext)

  return (
    <Box>
      {!errorFindUsers ? (
        users.length > 0 ? (
          <Flex alignItems={"flex-start"} justify={"center"} padding={"1.5"}>
            <Box spaceY={3} width={{ base: '100%', md: '630px' }} padding={'2rem'}>
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
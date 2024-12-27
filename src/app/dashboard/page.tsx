"use client"

import TablePagination from "@/components/TablePagination/tablePagination"
import UsersTable from "@/components/UsersTable/usersTable"
import { User } from "@/types"
import { Box, Flex, Input, Spinner, Text } from "@chakra-ui/react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MdError } from "react-icons/md"

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [errorFindUsers, setErrorFindUsers] = useState(false)
  const [inputSearch, setInputSearch] = useState('')

  const searchParams = useSearchParams()
  const pageParam = searchParams?.get('page') || '1'

  const currentPage = parseInt(pageParam, 10) || 1
  const usersPerPage = 5

  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)
  const usersLength = filteredUsers.length
  const totalPages = Math.ceil(usersLength / usersPerPage)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          'https://techsoluctionscold.com.br/api-boats/tests/list_all.php',
        )
        setUsers(response.data)
        setFilteredUsers(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error)
        setErrorFindUsers(true)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (inputSearch.length === 0) {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(inputSearch.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [inputSearch, users])

  return (
    <Box>
      {!errorFindUsers ? (
        users.length > 0 ? (
          <Flex alignItems={"flex-start"} justify={"center"} padding={"1.5"} height={"100vh"}>
            <Box spaceY={3} width={{ base: '100%', md: 'auto' }} padding={'2rem'}>
              <Input
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <UsersTable currentUsers={currentUsers} />
              <TablePagination currentPage={currentPage} usersLength={usersLength} totalPages={totalPages} />
            </Box>
          </Flex>
        ) : (
          <Flex alignItems={"center"} justify={"center"} gap={"1.5"} height={"100vh"}>
            <Spinner />
            <Text textStyle={"2xl"}>Carregando usuários...</Text>
          </Flex>
        )
      ) : (
        <Flex alignItems={"center"} justify={"center"} gap={"1.5"} height={"100vh"}>
          <MdError size={30} />
          <Text textStyle={"2xl"}>Usuários não encontrados</Text>
        </Flex>
      )
      }
    </Box>
  )
}
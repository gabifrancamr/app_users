"use client"

import TablePagination from "@/components/TablePagination/tablePagination"
import { User } from "@/types"
import { Box, Flex, Input, Stack, Table } from "@chakra-ui/react"
import axios from "axios"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
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
        console.log('Response:', response.data)
        setUsers(response.data)
        setFilteredUsers(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error)
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
    <Flex alignItems={"center"} justify={"center"} padding={"1.5"}>
      {users.length > 0 ? (
        <Box spaceY={3} width={{ base: '100%', md: 'auto'}} padding={{base: '2rem'}}>
          <Input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <Stack gap="10">
            <Table.ScrollArea borderWidth="1px">
              <Table.Root variant="outline" interactive showColumnBorder>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>ID</Table.ColumnHeader>
                    <Table.ColumnHeader>Nome</Table.ColumnHeader>
                    <Table.ColumnHeader>E-mail</Table.ColumnHeader>
                    <Table.ColumnHeader>Phone</Table.ColumnHeader>
                    <Table.ColumnHeader>Photo</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {currentUsers.map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>0123456789</Table.Cell>
                      {user.photo_filename && (
                        <Table.Cell display={"flex"} justifyContent={"center"}>
                          <Image
                            src={`https://techsoluctionscold.com.br/api-boats/uploads/tests/${user.photo_filename}`}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Stack>
          <TablePagination currentPage={currentPage}  usersLength={usersLength} totalPages={totalPages} />
        </Box>
      ) : (
        <p>Carregando usuários</p>
      )}
    </Flex>
  )
}
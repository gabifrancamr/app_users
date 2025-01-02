import { UsersContext } from "@/contexts/usersContexts"
import { usePagination } from "@/hooks/usePagination"
import { Stack, Table } from "@chakra-ui/react"
import Image from "next/image"
import { useContext } from "react"
import { NotFoundUsers } from "../NotFoundUsers/notFoundUsers"

export default function UsersTable() {
    const { filteredUsers } = useContext(UsersContext)

    const { currentPage, usersPerPage } = usePagination()

    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentUsers = filteredUsers.slice(startIndex, endIndex)

    const baseUrlImg = 'https://techsoluctionscold.com.br/api-boats/uploads/tests/'

    return (
        <Stack gap="10">
            {currentUsers.length > 0 ? (
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
                            {currentUsers.map((user) => {
                                const imgSrc = baseUrlImg + user.photo_filename
                                return (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.id}</Table.Cell>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>0123456789</Table.Cell>
                                        <Table.Cell display={"flex"} justifyContent={"center"}>
                                            {user.photo_filename && (
                                                <Image
                                                    src={imgSrc}
                                                    alt="Imagem do Usuário"
                                                    width={100}
                                                    height={100}
                                                    quality={100}
                                                />
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            ) : (
                <NotFoundUsers />
            )}
        </Stack>
    )
}
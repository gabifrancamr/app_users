import { usePagination } from "@/hooks/usePagination"
import { User } from "@/types/types"
import { Stack, Table } from "@chakra-ui/react"
import Image from "next/image"
import { NotFoundUsers } from "../NotFoundUsers/notFoundUsers"

interface UsersTableProps {
    users: User[];
  }

export default function UsersTable({ users }: UsersTableProps) {
    const {currentPage, usersPerPage} = usePagination()
    
    const startIndex = (currentPage - 1) * usersPerPage 
    const endIndex = startIndex + usersPerPage 
    const currentUsers = users.slice(startIndex, endIndex) 

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
                            {currentUsers.map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell>{user.id}</Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>0123456789</Table.Cell>
                                    <Table.Cell display={"flex"} justifyContent={"center"}>
                                        {user.photo_filename && (
                                            <Image
                                                src={`https://techsoluctionscold.com.br/api-boats/uploads/tests/${user.photo_filename}`}
                                                alt="Imagem do Usuário"
                                                width={100}
                                                height={100}
                                                quality={100}
                                            />
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            ) : (
                <NotFoundUsers />
            )}
        </Stack>
    )
}
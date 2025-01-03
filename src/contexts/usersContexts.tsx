"use client"

import axios from "axios"
import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react"

export interface User {
    id: string
    name: string
    email: string
    phone_number: string
    photo_filename: string
    created_at: string
    is_admin: string
    isBroker: string
    Broker_name: string | null
    Broker_phone: string | null
    Broker_address: string | null
    Broker_email: string | null
  }

interface UsersContextType {
    users: User[]
    filteredUsers: User[]
    setFilteredUsers: (value: SetStateAction<User[]>) => void
    errorFindUsers: boolean
}

export const UsersContext = createContext({} as UsersContextType)

interface UsersProviderProps {
    children: ReactNode
}

export function UsersProvider({ children }: UsersProviderProps) {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [errorFindUsers, setErrorFindUsers] = useState(false)

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

    return (
        <UsersContext.Provider
            value={{
                users, filteredUsers, errorFindUsers, setFilteredUsers
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}
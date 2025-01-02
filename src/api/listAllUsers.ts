import { api } from "@/lib/axios";
import { User } from "@/types/types";

export async function listAllUsers() {
    try {
        const response = await api.post<User[]>('/list_all.php');
        return response.data as User[];
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Dados não encontrados');
    }
}
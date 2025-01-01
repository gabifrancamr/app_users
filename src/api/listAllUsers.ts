import { api } from "@/lib/axios";
import { User } from "@/types/types";

export async function listAllUsers() {
    const response = await api.post<User[]>('/list_all.php');
    return response.data as User[];
}
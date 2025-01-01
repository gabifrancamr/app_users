import { useSearchParams } from "next/navigation";

export function usePagination() {
    const searchParams = useSearchParams() 
    const pageParam = searchParams?.get('page') || '1' 
    const currentPage = parseInt(pageParam, 10) || 1 
    const params = new URLSearchParams(searchParams);
    const usersPerPage = 5 

    return {
        params, currentPage, usersPerPage
    }
}
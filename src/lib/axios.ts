import axios from 'axios';

export const api = axios.create({
    baseURL: "https://techsoluctionscold.com.br/api-boats/tests",
});
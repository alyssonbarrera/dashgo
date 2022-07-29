import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://dashgo-ignite-beryl.vercel.app/api'
})
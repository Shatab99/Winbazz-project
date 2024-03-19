import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath: 'baseApi',
    // baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:5000'}),
    baseQuery : fetchBaseQuery({baseUrl : 'https://winbaz88-server.onrender.com'}),
    tagTypes : ['users', "deposits"],
    endpoints : ()=>({})
})

export default baseApi
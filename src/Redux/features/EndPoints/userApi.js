import baseApi from "../Api/baseApi"


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => '/users',
            providesTags: ['users']
        }),
        getUserByEmail : builder.query({
           query : (email) =>`/users/${email}`,
        }),
        creatUser: builder.mutation({
            query : (data) =>({
                url : '/user',
                method : "POST",
                body : data
            }),
            invalidatesTags : ['users']
        }),
        deleteUserDb : builder.mutation({
            query : (id) =>({
                url : `/deleteUser/${id}`,
                method : 'DELETE'
            }),
            invalidatesTags : ['users']
        })
    })
})

export const { useGetAllUserQuery, useCreatUserMutation, useDeleteUserDbMutation , useGetUserByEmailQuery} = userApi
import baseApi from "../Api/baseApi"


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => '/users',
            providesTags: ['users']
        }),
        creatUser: builder.mutation({
            query : (data) =>({
                url : '/user',
                method : "POST",
                body : data
            }),
            invalidatesTags : ['users']
        })
    })
})

export const { useGetAllUserQuery, useCreatUserMutation } = userApi
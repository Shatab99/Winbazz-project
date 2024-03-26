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
        }),
        updateCred : builder.mutation({
            query : ({email , credit})=>({
                url : `/updateCred/${email}`,
                method : "PATCH",
                body : credit
            }),
            invalidatesTags : ['users']
        }) ,
        withdrawCred : builder.mutation({
            query : ({email , credit}) =>({
                url : `/withdrawCred/${email}`,
                method : "PATCH",
                body : credit
            }),
            invalidatesTags:['users','deposits']
        }),
        getReferUsers : builder.query({
            query : (referId) => `/refer/${referId}`
        }),
        updatePhone : builder.mutation ({
            query : ({email, number}) =>({
                url : `/updatePhone/${email}`,
                method : "PATCH",
                body : number
            }),
            invalidatesTags : ['users']
        }),
        getAdminPhone : builder.query({
            query : (id)=>`/adminPhone/${id}`
        }),
        upadteAdminPhone : builder.mutation ({
            query : (phone)=>({
                url : '/updateAdminPhone',
                method : 'PATCH',
                body : phone
            })
        })
    })
})

export const { useGetAllUserQuery, useCreatUserMutation, useDeleteUserDbMutation , useGetUserByEmailQuery , useUpdateCredMutation , useWithdrawCredMutation, useGetReferUsersQuery, useUpdatePhoneMutation, useGetAdminPhoneQuery, useUpadteAdminPhoneMutation} = userApi
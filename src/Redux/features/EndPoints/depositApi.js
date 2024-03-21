import baseApi from "../Api/baseApi"


const depositApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllDeposits: builder.query({
            query: () => '/deposits',
            providesTags: ['deposits']
        }),
        submitDeposit: builder.mutation({
            query: (data) => ({
                url: '/submitDeposit',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['deposits']
        }),
        deleteDeposit: builder.mutation({
            query: (id) => ({
                url: `/deleteDeposit/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['deposits']
        }),
        pendigHistory: builder.query({
            query: (email) => `/userDeposits/${email}`,
            providesTags: ['deposits']
        }),
        postHistory: builder.mutation({
            query: (data) => ({
                url: `/postHistory`,
                method: "POST",
                body : data
            }),
            invalidatesTags : ['deposits']
        }),
        seeHistory : builder.query({
            query : (email) =>`/history/${email}`,
            providesTags: ['deposits']
        }),
        deleteHistory : builder.mutation({
            query : (email) =>({
                url : `/clearHistory/${email}`,
                method : "DELETE"
            }),
            invalidatesTags : ['deposits']
        }),
        getAllWithdraws : builder.query({
            query : ()=> '/withdraw',
            providesTags : ['deposits']
        })
    })
})

export const { useGetAllDepositsQuery, useSubmitDepositMutation, useDeleteDepositMutation, usePendigHistoryQuery, usePostHistoryMutation,useSeeHistoryQuery, useDeleteHistoryMutation, useGetAllWithdrawsQuery } = depositApi
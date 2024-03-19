import baseApi from "../Api/baseApi"


const depositApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllDeposits : builder.query({
            query : () => '/deposits',
            providesTags: ['deposits']
        }),
        submitDeposit : builder.mutation({
            query : (data)=> ({
                url : '/submitDeposit',
                method : "POST",
                body : data
            }),
            invalidatesTags : ['deposits']
        }),
        deleteDeposit : builder.mutation({
            query : (id)=>({
                url : `/deleteDeposit/${id}`,
                method : 'DELETE'
            }),
            invalidatesTags:['deposits']
        })
    })
})

export const { useGetAllDepositsQuery, useSubmitDepositMutation, useDeleteDepositMutation } = depositApi
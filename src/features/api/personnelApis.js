import { providesListTag } from "../providesListTag";
import { restaurantSlice } from "../restaurantSlice";

const personnelApis = restaurantSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPersonnel: builder.mutation({
            query: ({ args }) => ({
                url: `Personnel`,
                method: 'POST',
                body: args
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'Personnel', id: 'LIST' }]
        }),
        getPersonnels: builder.query({
            query: () => ({
                url: `Personnel`,
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'Personnel')
        }),
        updatePersonnel: builder.mutation({
            query: ({ id, args }) => ({
                url: `Personnel/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: (_result, _error, arg) => [{ type: 'Personnel', id: arg.id }]
        }),
        deletePersonnel: builder.mutation({
            query: (id) => ({
                url: `Personnel/${id}`,
                method: 'DELETE'
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'Personnel', id: 'LIST' }]
        }),
        getPersonnelById: builder.query({
            query: (id) => `Personnel/${id}`,
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            keepUnusedDataFor: 0
        }),
        getPersonnelReserves: builder.query({
            query: ({ id, params }) => ({
                url: `Personnel/Reserves/${id}`,
                params: params
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'Reserve')
        }),
        updatePersonnelReserves: builder.mutation({
            query: ({id, args}) => ({
                url: `Personnel/Reserves/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{type: 'Reserve', id: 'LIST'}]
        })
    })
})

export const {
    useCreatePersonnelMutation,
    useGetPersonnelsQuery,
    useUpdatePersonnelMutation,
    useDeletePersonnelMutation,
    useGetPersonnelByIdQuery,
    useGetPersonnelReservesQuery,
    useUpdatePersonnelReservesMutation
} = personnelApis;
import { buildQueryParams } from "../buildQueryParams";
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
        getPersonnelList: builder.query({
            query: ({ pagination, sorting, columnFilters, columnFilterFns }) => ({
                url: `Personnel/GetList`,
                body: buildQueryParams(pagination, sorting, columnFilters, columnFilterFns),
                method: 'POST'
            }),
            transformResponse: (response, meta) => {
                return {
                    data: response.data,
                    pagination: {
                        totalCount: meta.response.headers.get('X-Total-Count'),
                        pageIndex: meta.response.headers.get('X-Page-Index'),
                        pageSize: meta.response.headers.get('X-Page-Size'),
                        totalPages: meta.response.headers.get('X-Total-Pages'),
                    }
                }
            },
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result.data, 'Personnel')
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
            query: ({ id, args }) => ({
                url: `Personnel/Reserves/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'Reserve', id: 'LIST' }]
        }),
        getAllPersonnels: builder.query({
            query: () => ({
                url: `Personnel`,
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'Personnel')
        }),
    })
})

export const {
    useCreatePersonnelMutation,
    useGetPersonnelListQuery,
    useUpdatePersonnelMutation,
    useDeletePersonnelMutation,
    useGetPersonnelByIdQuery,
    useGetPersonnelReservesQuery,
    useUpdatePersonnelReservesMutation,
    useGetAllPersonnelsQuery
} = personnelApis;
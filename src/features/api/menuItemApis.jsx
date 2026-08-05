import { providesListTag } from "../providesListTag";
import { restaurantSlice } from "../restaurantSlice";

const menuItemApis = restaurantSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMenuItem: builder.mutation({
            query: ({ args }) => ({
                url: `MenuItem`,
                method: 'POST',
                body: args
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'MenuItem', id: 'LIST' }]
        }),
        getMenuItems: builder.query({
            query: () => ({
                url: `MenuItem`,
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'MenuItem')
        }),
        updateMenuItem: builder.mutation({
            query: ({ id, args }) => ({
                url: `MenuItem/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: (_result, _error, arg) => [{ type: 'MenuItem', id: arg.id }]
        }),
        deleteMenuItem: builder.mutation({
            query: (id) => ({
                url: `MenuItem/${id}`,
                method: 'DELETE'
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'MenuItem', id: 'LIST' }]
        }),
        getMenuItemById: builder.query({
            query: (id) => `MenuItem/${id}`,
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            keepUnusedDataFor: 0
        }),
    })
})

export const {
    useCreateMenuItemMutation,
    useGetMenuItemsQuery,
    useUpdateMenuItemMutation,
    useDeleteMenuItemMutation,
    useGetMenuItemByIdQuery,
} = menuItemApis;
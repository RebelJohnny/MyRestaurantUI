import { providesListTag } from "../providesListTag";
import { restaurantSlice } from "../restaurantSlice";

const menuApis = restaurantSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: (params) => ({
                url: `Menu`,
                params: params
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'Menu')
        }),
        updateMenu: builder.mutation({
            query: (args) => ({
                url: `Menu`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'Menu', id: 'LIST'}]
        })
    })
})

export const {
    useGetMenuQuery,
    useUpdateMenuMutation
} = menuApis;
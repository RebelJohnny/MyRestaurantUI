import { buildQueryParams } from "../buildQueryParams";
import { providesListTag } from "../providesListTag";
import { restaurantSlice } from "../restaurantSlice";

const mealApis = restaurantSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMeal: builder.mutation({
            query: ({ args }) => ({
                url: `Meal`,
                method: 'POST',
                body: args
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'Meal', id: 'LIST' }]
        }),
        getAllMeals: builder.query({
            query: () => ({
                url: `Meal`,
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'Meal')
        }),
        updateMeal: builder.mutation({
            query: ({ id, args }) => ({
                url: `Meal/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: (_result, _error, arg) => [{ type: 'Meal', id: arg.id }]
        }),
        deleteMeal: builder.mutation({
            query: (id) => ({
                url: `Meal/${id}`,
                method: 'DELETE'
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'Meal', id: 'LIST' }]
        }),
        getMealById: builder.query({
            query: (id) => `Meal/${id}`,
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            keepUnusedDataFor: 0
        }),
        getMealList: builder.query({
            query: ({ pagination, sorting, columnFilters, columnFilterFns }) => ({
                url: `Meal/GetList`,
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
            providesTags: (result) => providesListTag(result.data, 'Meal')
        }),
    })
})

export const {
    useCreateMealMutation,
    useGetAllMealsQuery,
    useUpdateMealMutation,
    useDeleteMealMutation,
    useGetMealByIdQuery,
    useGetMealListQuery
} = mealApis;
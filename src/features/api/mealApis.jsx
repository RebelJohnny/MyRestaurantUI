import { providesListTag } from "../providesListTag";
import { restaurantSlice } from "../restaurantSlice";

const mealApis = restaurantSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMeal: builder.mutation({
            query: ({ args }) => ({
                url: `MenuItem`,
                method: 'POST',
                body: args
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'MenuItem', id: 'LIST' }]
        }),
        getMeals: builder.query({
            query: () => ({
                url: `MenuItem`,
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            providesTags: (result) => providesListTag(result, 'MenuItem')
        }),
        updateMeal: builder.mutation({
            query: ({ id, args }) => ({
                url: `MenuItem/${id}`,
                method: 'PUT',
                body: args
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: (_result, _error, arg) => [{ type: 'MenuItem', id: arg.id }]
        }),
        deleteMeal: builder.mutation({
            query: (id) => ({
                url: `MenuItem/${id}`,
                method: 'DELETE'
            }),
            transformErrorResponse: (response) => response.data.problem,
            invalidatesTags: [{ type: 'MenuItem', id: 'LIST' }]
        }),
        getMealById: builder.query({
            query: (id) => `MenuItem/${id}`,
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data.problem,
            keepUnusedDataFor: 0
        }),
    })
})

export const {
    useCreateMealMutation,
    useGetMealsQuery,
    useUpdateMealMutation,
    useDeleteMealMutation,
    useGetMealByIdQuery,
} = mealApis;
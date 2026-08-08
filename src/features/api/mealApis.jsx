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
        getMeals: builder.query({
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
    })
})

export const {
    useCreateMealMutation,
    useGetMealsQuery,
    useUpdateMealMutation,
    useDeleteMealMutation,
    useGetMealByIdQuery,
} = mealApis;
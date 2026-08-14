export const buildQueryParams = (pagination, sorting, columnFilters, columnFilterFns) => {
    return {
        paginationParams: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize
        },

        filters: columnFilters.map((filter) => ({
            field: filter.id,
            filterFn: columnFilterFns[filter.id] ?? 'contains',
            value: filter.value
        })),

        sorts: sorting.map((sort) => ({
            field: sort.id,
            isDescending: sort.desc
        }))
    }
}
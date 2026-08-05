export const providesListTag = (result, tag) => {
    return result
    ? [
        ...result.map(({ id }) => ({ type: tag, id })),
        { type: tag, id: 'LIST' },
      ]
    : [{ type: tag, id: 'LIST' }]
}
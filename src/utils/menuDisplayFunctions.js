export const getMealChipSx = (type) => {
    switch (type) {
        case 1:
            return {
                backgroundColor: '#e3f2fd',
                color: '#1565c0',
            };

        case 2:
            return {
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
            };

        default:
            return {
                backgroundColor: '#f5f5f5',
                color: '#616161',
            };
    }
};
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetAllMealPeriodsQuery } from '@/features/api/mealPeriodApis';

export default function MealPeriodSelect({ period, setPeriod }) {

    const {
        data = []
    } = useGetAllMealPeriodsQuery();
    const handleChange = (event) => {
        setPeriod(event.target.value);
    };
    React.useEffect(() => {
        if (data.length === 1) {
            setPeriod(data[0].id)
        }
    }, [data])
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">وعده</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={period}
                    label="وعده"
                    onChange={handleChange}
                    size='small'
                >

                    {data.map((mealPeriod) => (
                        <MenuItem
                            key={mealPeriod.id}
                            value={mealPeriod.id}
                        >
                            {mealPeriod.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
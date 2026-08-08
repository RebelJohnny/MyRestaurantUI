import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetMealPeriodsQuery } from '@/features/api/mealPeriodApis';

export default function MealPeriodSelect({period, setPeriod}) {

    const {
        data = []
    } = useGetMealPeriodsQuery();
    const handleChange = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">وعده</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={period}
                    label="وعده"
                    onChange={handleChange}
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
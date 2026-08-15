import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetAllMealsQuery } from '@/features/api/mealApis';
import { useFormikContext } from 'formik';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};

function getStyles(mealId, mealIds, theme) {
    return {
        fontWeight: mealIds.includes(mealId)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MealsSelect() {
    const { values, setFieldValue } = useFormikContext();
    const theme = useTheme();

    const {
        data = []
    } = useGetAllMealsQuery();

    const handleChange = (event) => {
        const { target: { value } } = event;
        setFieldValue('mealIds', value);
    };

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl sx={{ marginBottom: 1 }} fullWidth size='small'>
                <InputLabel id="demo-multiple-chip-label">غذا</InputLabel>
                <Select
                    size='small'
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={values.mealIds}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="غذا" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((mealId) => {
                                const meal = data.find((m) => m.id === mealId);
                                return (
                                    <Chip
                                        key={mealId}
                                        label={meal?.name ?? mealId}
                                    />
                                );
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {data.map((meal) => (
                        <MenuItem
                            key={meal.id}
                            value={meal.id}
                            style={getStyles(meal.id, values.mealIds, theme)}
                        >
                            {meal.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
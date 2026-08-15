import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetAllPersonnelsQuery } from '@/features/api/personnelApis';

export default function PersonnelSelect({personnel, setPersonnel}) {

    const {
        data = []
    } = useGetAllPersonnelsQuery();
    const handleChange = (event) => {
        setPersonnel(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">پرسنل</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={personnel}
                    label="پرسنل"
                    onChange={handleChange}
                    size='small'
                >
                    {data.map((personnel) => (
                        <MenuItem
                            key={personnel.id}
                            value={personnel.id}
                        >
                            {personnel.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
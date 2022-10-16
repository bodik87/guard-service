import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, TextField } from '@mui/material';

export default function Adress() {
  const [street, setStreet] = React.useState('');
  const [house, setHouse] = React.useState('');

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };
  const handleHouseChange = (event) => {
    setHouse(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="street">Вулиця</InputLabel>
          <Select
            labelId="street"
            id="street"
            value={street}
            name="street"
            label="Вулиця"
            onChange={handleStreetChange}
          >
            <MenuItem value={'Жулянська'}>Жулянська</MenuItem>
            <MenuItem value={'Щастя'}>Щастя</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="house">Будинок</InputLabel>
          <Select
            labelId="house"
            name="house"
            value={house}
            onChange={handleHouseChange}
            label="Будинок"
          >
            <MenuItem value={"2-a"}>2-a</MenuItem>
            <MenuItem value={"2-б"}>2-б</MenuItem>
            <MenuItem value={"2-в"}>2-в</MenuItem>
          </Select>
          {/* <FormHelperText>Without label</FormHelperText> */}
        </FormControl>
        <FormControl sx={{ m: 1, maxWidth: 120 }}>
          <TextField
            sx={{ m: 1, minWidth: 120 }}
            margin="normal"
            required
            fullWidth
            name="apartment"
            label="Квартира"
            type=""
            id="apartment"
          />
        </FormControl>
      </Box>
    </div>
  );
}

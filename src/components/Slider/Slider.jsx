import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, FormHelperText } from '@mui/material';

function valuetext(value) {
  return `${value} грн`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([100, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 400, ml: 2, display: 'flex' }}>
      <Box sx={{
        width: 300, ml: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
      }}>
        <FormHelperText id="component-helper-text">
          {`Сортувати в диапазонi: ${value}`}
        </FormHelperText>
        <Slider
          getAriaLabel={() => ''}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          defaultValue={20}
          step={100}
          marks
          min={0}
          max={2000}
        />
      </Box>
      <Button
        onClick={() => { }}
        variant="contained"
        sx={{ ml: 4 }}
      >
        Сортувати
      </Button>
    </Box>
  );
}
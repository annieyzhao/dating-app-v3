import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup({firstQ, secondQ, label}) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="firstQ" control={<Radio />} label={firstQ} />
        <FormControlLabel value="secondQ" control={<Radio />} label={secondQ} />
      </RadioGroup>
    </FormControl>
  );
}

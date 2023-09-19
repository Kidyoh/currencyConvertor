import React from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';

import countriesData from './data/countries.json';

const SelectCountry = (props) => {
  const { value, setValue, label, onChange} = props;

  const dataFilter = countriesData.filter(item => "currency" in item);
  const dataCountries = dataFilter.map(item => {
    return `${item.currency} - ${item.name}`;
  });

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={onChange}
        options={ dataCountries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;

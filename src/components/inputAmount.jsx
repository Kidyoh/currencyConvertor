import React, { useContext } from 'react'
import {Grid, InputAdornment, TextField } from '@mui/material'
import { CurrencyContext } from '../context/CurrencyContext';


const InputAmount = () => {

  const { input, setInput} = useContext(CurrencyContext);
  return (
    <Grid item xs={12} md>
        <TextField
          onChange={(e) => setInput(e.target.value)}
          label="Amount"
          fullWidth
          InputProps={{
            type: "number",
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
    </Grid>
  )
}

export default InputAmount;
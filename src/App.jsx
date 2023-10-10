// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'react-dropdown/style.css';
import './App.css';
import SelectCountry from './components/selectCountry';
import { Box, Container, Grid, Link, TextField, Typography, InputAdornment, Button } from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

function App() {

  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("ETB - Ethiopia");
  const [to, setTo] = useState("USD - United States");
  const [output, setOutput] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
      `../exchange_rates.json`)
      .then(res => {
        setExchangeRates(res.data) 
      })
      .catch(err => {
        console.error(err)
      })
  }, []);



  
  function convert() {
    const fromCurrency = from.split(" ")[0];
    const toCurrency = to.split(" ")[0];

    const fromRate = exchangeRates.rates[fromCurrency];
    const toRate = exchangeRates.rates[toCurrency];
    
    const usdRate = exchangeRates.rates["USD"];
  
    const result = (input / fromRate) * (toRate / usdRate);
  
    setOutput(result.toFixed(2)); 
  }

useEffect(() => {
  if (input){

  convert()}
  
}, [from, to])
  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem" }}>Shega Exchange Rates</Typography>
     <Grid container spacing={2}>
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
        <SelectCountry value={from} label="From" onChange={(event, newValue) => setFrom(newValue)} />
        <Grid item xs={12} md="auto">
          <Button onClick={flip} sx={{
            borderRadius: 1,
            height: "100%"
          }}>
            <CompareArrowsIcon sx={{
              fontSize: 30
            }} />
          </Button>
        </Grid>
        <SelectCountry value={to} label="To" onChange={(event, newValue) => setTo(newValue)}/>
        
      </Grid>
      <Button onClick={convert} sx={{
            borderRadius: 1,
            height: "22%"
          }} md={{marginTop: "1rem"}}>  
           Convert
          </Button>
      {input ? (
          <Box sx={{ textAlign: "bottom", marginTop: "1rem" }}>
            <Typography>{input} {from} =</Typography>
            <Typography variant='h5' sx={{ marginTop: "4px", fontWeight: "bold" }}>{output} {to}</Typography>
            <p>{input + " " + from + " = " + output + " " + to}</p>
          </Box>
        ) : ""}

    </Container>
  );
}

export default App;
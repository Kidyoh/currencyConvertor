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
      `src/components/data/exchange_rates.json`)
      .then(res => {
        setExchangeRates(res.data) 
      })
      .catch(err => {
        console.error(err)
      })
  }, []);

//function to convert currencies
  function convert() {
    const toCurrency = to.split(" ")[0];
    const rate = exchangeRates.rates[toCurrency];
  
    if(rate == null) {
      alert('Rate not available for ' + toCurrency);  
      return;
    }
  
    setOutput(input * rate);
  }
  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  useEffect(() => {
    if (input) {
      convert();
    }
  })

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem" }}>Shega Exchange Rates</Typography>
     <Grid container spacing={2}>
     <Grid item xs={12} md="auto">
        <TextField
          onChange={(e) => setInput(e.target.value)}
          label="Amount"
          fullWidth
          InputProps={{
            type: "number",
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
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
        <SelectCountry value={to} label="To"  />
     </Grid>
        {input ? (
          <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
            <Typography>{input} {from} =</Typography>
            <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold" }}>{output.toFixed(2)} {to}</Typography>
            <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
          </Box>
        ) : ""}
      </Grid>


    </Container>
  );
}

export default App;
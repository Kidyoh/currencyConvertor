import { createContext, useState } from 'react'

export const CurrencyContext = createContext();
const CurrencyProvider = ({children}) => {
    const [from, setFrom] = useState("🇺🇸 USD - United States");
    const [to, setTo] = useState("🇪🇹 ETB - Ethiopia");
    const [input, setInput] = useState("");

    const value = {
        from,
        setFrom,
        to,
        setTo,
        input,
        setInput
    };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  )
}

export default CurrencyProvider
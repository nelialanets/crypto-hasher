import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'

const Crypto = createContext();

const CryptoContext = ({children}) => {
const [symbol, setSymbol] = useState('$');


  return <Crypto.Provider value={{symbol, setSymbol}}>{children}</Crypto.Provider>
};

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
};
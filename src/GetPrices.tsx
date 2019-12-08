import React, { useState } from "react";
import { useGet } from "restful-react";
import styled from "styled-components";

const SearchBar = styled.input`
  text-align: left;
  padding: 10px 60px;
  border-radius: 4px;
  background: #040404;
  font-family: Andale Mono, monospace;
  font-size: 20px;
  letter-spacing: 1.5px;
  color: #fff;
  border: 1px solid #333;
  &:active {
    outline: none;
    border: 1px solid pink;
  }
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
    border: 2px solid #f4e211;
  }
`;
const GetPrices: React.FC = () => {
  const [savedCoinArr, setSavedCoinArr] = useState([]);
  const [formInput, setFormInput] = useState("");
  const [formFinalInput, setForFinalInput] = useState("");
  const { data: pricesData, refetch: fetchPrices } = useGet({
    path: `/prices?key=${process.env.REACT_APP_CRYPTO_API_KEY}`
  });
  const [exchangeData, setExchangeData] = useState(pricesData);

  const { data: currencyData, refetch: fetchCurrencyData } = useGet({
    path: `/exchange-rates/history?key=${
      process.env.REACT_APP_CRYPTO_API_KEY
    }&currency=${
      formInput.length > 0 ? formInput : "BTC"
    }&start=2019-04-14T00%3A00%3A00Z&end=2019-05-14T00%3A00%3A00Z`,
    lazy: true
  });
  return (
    <>
      {/* <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          fetchPrices();
        }}
      >
        <button>Click Meh 4 cryptoz</button>
      </form> */}
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setForFinalInput(formInput);
        }}
      >
        <SearchBar
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            console.log(input.toUpperCase());
            setFormInput(input.toUpperCase());
          }}
          type="text"
        ></SearchBar>
        <button>Click to search 4 cryptoz</button>
      </form>
      <ul>
        {pricesData &&
          pricesData.map((coin: any, i: number) => {
            if (coin.currency === formFinalInput) {
              return (
                <li key={i}>
                  <span>{coin.currency}: </span>
                  <span>{coin.price}</span>
                </li>
              );
            } else if (
              i === 0 &&
              formFinalInput.length == 3 &&
              formFinalInput !== coin.currency
            ) {
              return (
                <li>
                  <span>Please Enter Valid Coin Ticker Symbol</span>
                </li>
              );
            }
          })}
      </ul>

      {/* {pricesData && <span>{JSON.stringify(pricesData)}</span>} */}
    </>
  );
};

export default GetPrices;

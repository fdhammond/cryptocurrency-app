import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCoins from "../hooks/useSelectCoins";
import { coins } from "../data/coins.js";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCoins }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [coin, SelectCoins] = useSelectCoins("Select Coin", coins);
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCoins(
    "Select Crypto",
    cryptos
  );

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const response = await fetch(url);
      const result = await response.json();

      const arrCryptos = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return object;
      });

      setCryptos(arrCryptos);
    };
    consultAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([coin, cryptoCurrency].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCoins({
      coin,
      cryptoCurrency,
    });
  };

  return (
    <>
      {error && <Error>All fields must be filled</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCryptoCurrency />
        <InputSubmit type="submit" value="quote" />
      </form>
    </>
  );
};

export default Form;

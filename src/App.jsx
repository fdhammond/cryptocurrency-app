import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImageCrypto from "./img/imagen-criptos.png";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [coins, setCoins] = useState({});
  const [quoteResult, setQuoteResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      const quoteCrypto = async () => {
        setLoading(true);
        setQuoteResult({});
        const { coin, cryptoCurrency } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${coin}`;

        const response = await fetch(url);
        const result = await response.json();

        setQuoteResult(result.DISPLAY[cryptoCurrency][coin]);
        setLoading(false);
      };
      quoteCrypto();
    }
  }, [coins]);

  return (
    <Container>
      <Image src={ImageCrypto} alt="Cryptocurrency Image" />
      <div>
        <Heading>Cryptocurrencies Conversor</Heading>
        <Form setCoins={setCoins} />
        {quoteResult.PRICE && <Result quoteResult={quoteResult} />}
        {loading && <Spinner />}
      </div>
    </Container>
  );
}

export default App;

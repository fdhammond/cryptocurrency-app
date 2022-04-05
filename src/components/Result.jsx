import styled from "@emotion/styled";

const Container = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  gap: 1rem;
  margin-top: 30px;
`;

const Image = styled.img`
  display: block;
  width: 120px;
`;

const Text = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

const Result = ({ quoteResult }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    quoteResult;
  return (
    <Container>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="crypto image" />
      <Price>
        Price: <span>{PRICE}</span>
      </Price>
      <Text>
        Highest Price of day: <span>{HIGHDAY}</span>
      </Text>
      <Text>
        Lowest Price of day: <span>{LOWDAY}</span>
      </Text>
      <Text>
        Variation last 24 hours: <span>{CHANGEPCT24HOUR}</span>
      </Text>
      <Text>
        Last Update: <span>{LASTUPDATE}</span>
      </Text>
    </Container>
  );
};

export default Result;

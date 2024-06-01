import { useState } from "react";
import styled from "styled-components";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;

  button {
    background: transparent;
    border: none;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.5rem;
    cursor: pointer;
  }

  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export default ChartsContainer;

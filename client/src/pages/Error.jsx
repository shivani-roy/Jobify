import { useRouteError, Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import styled from "styled-components";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error?.status === 404) {
    return (
      <Wrapper>
        <div>
          <img
            src={img}
            alt="not found"
          />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong! please try again later.</h3>
        <Link to="/dashboard">back home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 3rem;
    margin-top: -3rem;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    line-height: 1.5;
    margin-bottom: 0.5rem;
    color: var(--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
    display: block;
  }

  a:hover {
    opacity: 0.6;
  }
`;

export default Error;

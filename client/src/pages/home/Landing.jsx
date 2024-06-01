import main from "../../assets/images/main.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo } from "../../components";

const Landing = () => {
  return (
    <StyledWrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            laudantium sunt a aliquam molestias aperiam perspiciatis culpa sint
            minus aut! Quaerat odio, beatae aspernatur ipsa nemo reiciendis
            mollitia vero non.
          </p>
          <Link
            to="/register"
            className="btn register-link"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="btn"
          >
            Login / Demo User
          </Link>
        </div>

        <img
          src={main}
          alt="job hunt"
          className="img main-img"
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--text-secondary-color);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }

  .register-link {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .main-img {
    display: none;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  @media screen and (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default Landing;

import { Link, Form, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login Successful");
      return redirect("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };

    try {
      await customFetch.post("/auth/login", data);
      toast.success("Welcome!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
      >
        <Logo />
        <h4>Login</h4>

        <FormRow
          type="email"
          name="email"
        />
        <FormRow
          type="password"
          name="password"
        />

        <SubmitBtn />

        <button
          type="button"
          className="btn btn-block"
          onClick={loginDemoUser}
        >
          explore the app
        </button>

        <p>
          Not a member yet?
          <Link
            to="/register"
            className="member-btn"
          >
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 3rem;
  }

  .form {
    max-width: 450px;
    border-top: 5px solid var(--primary-500);
  }

  input:focus {
    outline: none;
    box-shadow: none;
    border: 2px solid skyblue;
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 1rem;
  }

  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

export default Login;

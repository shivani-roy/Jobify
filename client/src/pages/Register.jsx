import { Form, Link, redirect } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login"); // must return something
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
      >
        <Logo />
        <h4>Register</h4>

        <FormRow
          type="text"
          name="name"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormRow
          type="text"
          name="location"
        />
        <FormRow
          type="email"
          name="email"
        />

        <FormRow
          type="password"
          name="password"
        />

        <SubmitBtn />
        <p>
          Already a member?{" "}
          <Link
            to="/login"
            className="member-btn"
          >
            Login
          </Link>
        </p>
      </Form>
      <Link to="/login">Login Page</Link>
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
    max-width: 500px;
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

export default Register;

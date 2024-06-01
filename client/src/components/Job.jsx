import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import styled from "styled-components";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

day.extend(advancedFormat);

const Job = ({
  _id,
  company,
  position,
  jobLocation,
  jobStatus,
  jobType,
  createdAt,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>

        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo
            icon={<FaLocationArrow />}
            text={jobLocation}
          />

          <JobInfo
            icon={<FaCalendarAlt />}
            text={date}
          />

          <JobInfo
            icon={<FaBriefcase />}
            text={jobType}
          />
          
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link
            to={`../edit-job/${_id}`}
            className="btn edit-btn"
          >
            Edit
          </Link>

          <Form
            method="post"
            action={`../delete-job/${_id}`}
          >
            <button
              type="submit"
              className="btn delete-btn"
            >
              delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--text-secondary-color);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    text-transform: uppercase;
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 2rem;
  }

  .info {
    h5 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      text-transform: capitalize;
      opacity: 0.8;
      letter-spacing: var(--letter-spacing);
    }
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;

    @media screen and (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--border-radius);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }

  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }

  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Job;

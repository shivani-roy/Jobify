import { Form, useSubmit, Link } from "react-router-dom";
import { useAllJobsContext } from "../pages/jobs/AllJobs";
import { FormRow, FormRowSelect, Wrapper } from ".";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  console.log(searchValues, search);

  const submit = useSubmit();

  const debounce = (fn) => {
    let timeout;

    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        fn(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            // onChange={(e) => {
            //   // console.log(e.currentTarget.form);
            //   submit(e.currentTarget.form);
            // }}

            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            name="sort"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link
            to="/dashboard/all-jobs"
            className="btn form-btn delete-btn"
          >
            Clear Filters
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;

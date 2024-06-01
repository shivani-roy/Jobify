import { FormRow, FormRowSelect, Wrapper, SubmitBtn } from "../../components";
import { useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../../../../utils/constants";
import customFetch from "../../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]); 
      // invalidates all queries starting with 'jobs'
      toast.success("Job added successfully");
      return redirect("all-jobs");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
      >
        <h4 className="form-title">add job</h4>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
          />

          <FormRow
            type="text"
            name="company"
          />

          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;

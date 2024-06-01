import { redirect, useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow, Wrapper, SubmitBtn } from "../../components";
import customFetch from "../../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get("avatar");
    if (file && file.size > 500000) {
      toast.error("Image size too large");
      return null;
    }

    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
      return redirect('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      return null;
    }

  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        encType="multipart/form-data"
      >
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            defaultValue={name}
          />

          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />

          <FormRow
            type="email"
            name="email"
            defaultValue={email}
          />

          <FormRow
            type="text"
            name="location"
            defaultValue={location}
          />
          
          <div className="form-row">
            <label
              htmlFor="avatar"
              className="form-label"
            >
              select an image file (max 0.5 MB)
            </label>

            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*" //will only accept image files
            />
          </div>

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;

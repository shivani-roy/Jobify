const FormRow = ({ name, type, defaultValue = "", labelText, onChange }) => {
  return (
    <div className="form-row">
      <label
        htmlFor={name}
        className="form-label"
      >
        {labelText || name}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        // autoComplete="current-password"
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;

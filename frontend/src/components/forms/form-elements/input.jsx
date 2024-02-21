import moment from "moment";

const FormInput = ({
  fieldName,
  fieldTitle,
  initialVal,
  register,
  errors,
  validation,
  type,
}) => {
  return (
    <>
      <label htmlFor={fieldName}>{fieldTitle}</label>
      <input
        id={`field-${fieldName}`}
        type={type}
        defaultValue={initialVal ?? ""}
        {...register(fieldName, validation)}
        aria-invalid={errors[fieldName] ? "true" : "false"}
      />
      {errors[fieldName]?.message && (
        <p role="alert">{errors[fieldName].message}</p>
      )}
      {errors[fieldName] && errors[fieldName].type === "required" && (
        <span role="alert">This is required</span>
      )}
    </>
  );
};
export default FormInput;

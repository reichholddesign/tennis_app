import { useForm } from "react-hook-form";
import moment from "moment";

const TextInput = ({
  fieldName,
  fieldTitle,
  initialVal,
  register,
  errors,
  validation,
  type,
}) => {
  if (type === "date") {
    initialVal = moment(new Date(initialVal)).format("YYYY-MM-DD");
  }

  return (
    <>
      <label htmlFor={fieldName}>{fieldTitle}</label>
      <input
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
export default TextInput;

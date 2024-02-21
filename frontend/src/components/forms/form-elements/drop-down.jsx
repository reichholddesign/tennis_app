import { useForm } from "react-hook-form";
import moment from "moment";

const FormDropDown = ({
  fieldName,
  fieldTitle,
  initialVal,
  register,
  errors,
  validation,
  options,
}) => {
  return (
    <>
      <label htmlFor={fieldName}>{fieldTitle}</label>
      <select
        id={`field-${fieldName}`}
        name={fieldName}
        defaultValue={initialVal ?? ""}
        {...register(fieldName, validation)}
        aria-invalid={errors[fieldName] ? "true" : "false"}
      >
        {options &&
          options.map((optionVal) => (
            <option key={optionVal.value} value={optionVal.value}>
              {optionVal.label}
            </option>
          ))}
      </select>
      {errors[fieldName]?.message && (
        <p role="alert">{errors[fieldName].message}</p>
      )}
      {errors[fieldName] && errors[fieldName].type === "required" && (
        <span role="alert">This is required</span>
      )}
    </>
  );
};
export default FormDropDown;

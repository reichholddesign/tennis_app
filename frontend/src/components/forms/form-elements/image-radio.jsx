import { useForm } from "react-hook-form";
import moment from "moment";

const FormRadioButtonsWithImages = ({
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
      <fieldset>
        <legend>{fieldTitle}</legend>
        {options &&
          options.map((optionVal, i) => (
            <div key={optionVal.url}>
              <input
                type="radio"
                id={`field-${fieldName}-${i + 1}`}
                name={fieldName}
                value={`${optionVal.url},${optionVal.label}`}
                {...register(fieldName, validation)}
                aria-invalid={errors[fieldName] ? "true" : "false"}
              />
              <label htmlFor={`field-${fieldName}-${i + 1}`}>
                <img
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={optionVal.url}
                  alt={optionVal.label}
                />
              </label>
            </div>
          ))}
      </fieldset>
      {errors[fieldName]?.message && (
        <p role="alert">{errors[fieldName].message}</p>
      )}
      {errors[fieldName] && errors[fieldName].type === "required" && (
        <span role="alert">This is required</span>
      )}
    </>
  );
};
export default FormRadioButtonsWithImages;

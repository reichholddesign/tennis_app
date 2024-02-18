import { useState, useEffect } from "react";
import TextInput from "./form-elements/text-input";
import { useForm } from "react-hook-form";

const ProfileForm = ({
  profile,
  formData,
  setFormData,
  createProfileMutation,
}) => {
  const [selectedGender, setSelectedGender] = useState(profile.gender ?? "");
  const [selectedHand, setSelectedHand] = useState(profile.hand ?? "");
  const [customGenderValue, setCustomGenderValue] = useState(
    profile.specified_gender ?? ""
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const handleChange = (e) => {
    console.log(errors);
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (name === "gender") {
      setSelectedGender(value);
      setFormData({ ...formData, [name]: value });
    } else if (name === "hand") {
      setSelectedHand(value);
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // console.log(data);
    createProfileMutation.mutate({
      ...data,
    });
  };

  const handlecustomGenderValueChange = (event) => {
    setCustomGenderValue(event.target.value);
    setFormData({ ...formData, ["specified_gender"]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextInput
          fieldName={"first_name"}
          fieldTitle={"First name:"}
          initialVal={profile.first_name}
          register={register}
          errors={errors}
          validation={{ required: true }}
          type={"text"}
        />

        <TextInput
          fieldName={"last_name"}
          fieldTitle={"Last name:"}
          initialVal={profile.last_name}
          register={register}
          errors={errors}
          validation={{}}
          type={"text"}
        />

        <TextInput
          fieldName={"dob"}
          fieldTitle={"Date of birth:"}
          initialVal={profile.dob}
          register={register}
          errors={errors}
          validation={{
            validate: (date) =>
              new Date(date) > new Date() ? "it wrong" : true,
          }}
          type={"date"}
        />

        {/* <label htmlFor="dob">Date of birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          defaultValue={profile.dob ?? ""}
          onChange={handleChange}
          // aria-invalid={errors.dob ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive"></div> */}

        <label htmlFor="height">{"Height(cm):"}</label>
        <input
          type="number"
          id="height"
          name="height"
          defaultValue={profile.height ?? 0}
          onChange={handleChange}
          // aria-invalid={errors.height ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.height} */}
        </div>

        <label htmlFor="genderSelect">Gender</label>
        <select
          id="genderSelect"
          name="gender"
          value={selectedGender}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Nonbinary">Nonbinary</option>
          <option value="Other">Prefer to self-describe</option>
          <option value="Decline">Decline to state</option>
        </select>

        {selectedGender === "Other" && (
          <div>
            <label htmlFor="specified_gender"></label>
            <input
              type="text"
              id="specified_gender"
              name="specified_gender"
              value={customGenderValue}
              onChange={handlecustomGenderValueChange}
            />
          </div>
        )}

        <label htmlFor="handSelect">Hand</label>
        <select
          id="handSelect"
          name="hand"
          value={selectedHand}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="Right">Right</option>
          <option value="Left">Left</option>
          <option value="Ambidextrous">Ambidextrous</option>
        </select>

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          defaultValue={profile.rating ?? ""}
          onChange={handleChange}
          // aria-invalid={errors.rating ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.rating} */}
        </div>

        {/* <label htmlFor="nationality">Nationality:</label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          aria-invalid={errors.nationality ? 'true' : 'false'}
        /> */}

        {/* <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={profile.location ?? ""}
          onChange={handleChange}
          aria-invalid={errors.location ? 'true' : 'false'}
        /> */}

        {/* <div className="error" role="alert" aria-live="assertive">
          {errors.nationality}
        </div>

        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleChange}
          accept="imdob/*"
          aria-invalid={errors.photo ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {errors.photo}
        </div> */}
      </div>

      <input type="submit" />
    </form>
  );
};

export default ProfileForm;

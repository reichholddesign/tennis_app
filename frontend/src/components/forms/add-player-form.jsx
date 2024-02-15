import { useState, useEffect } from "react";

const AddPlayerForm = ({ formData, setFormData, createPlayersMutation }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedHand, setSelectedHand] = useState("");
  const [customValue, setCustomValue] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (name === "gender") {
      setSelectedGender(value);
      setFormData({ ...formData, [name]: value });
      // If "Other" is selected, enable the custom value input
      if (value === "Other") {
        setCustomValue("");
      } else {
        setFormData({ ...formData, specified_gender: "NULL" });
      }
    } else if (name === "hand") {
      setSelectedHand(value);
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPlayersMutation.mutate({
      ...formData,
    });

    //     const formDataToSend = new FormData();

    //     for (const key in formData) {
    //       formDataToSend.append(key, formData[key]);
    //     }

    // try {
    //     const accessToken = await getAccessTokenSilently();
    //     const publicApi = `http://localhost:6060/player/profile-update`;

    //     const metadataResponse = await fetch(publicApi, {
    //       method: "POST",
    //       headers:
    //     {
    //       'Content-Type': 'application/json',
    //           Authorization: `Bearer ${accessToken}`,
    //     },
    //     body: formDataToSend

    //     });

    //     const msg = await metadataResponse.json();
    //     console.log(msg)

    //   } catch (e) {
    //     console.log(e);
    //   }
  };

  const handleCustomValueChange = (event) => {
    console.log("form data ", formData);
    setCustomValue(event.target.value);
    setFormData({ ...formData, ["specified_gender"]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="first_name"
          defaultValue={""}
          onChange={handleChange}
          // aria-invalid={errors.first_name ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.first_name} */}
        </div>

        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="last_name"
          defaultValue={""}
          onChange={handleChange}
          // aria-invalid={errors.last_name ? 'true' : 'false'}
        />

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
            <label htmlFor="customValueInput"></label>
            <input
              type="text"
              id="customValueInput"
              name="customValue"
              value={customValue}
              onChange={handleCustomValueChange}
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
          defaultValue={""}
          onChange={handleChange}
          // aria-invalid={errors.rating ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.rating} */}
        </div>
      </div>

      <label htmlFor="notes">Notes:</label>
      <textarea
        type="text"
        id="notes"
        name="notes"
        defaultValue={""}
        onChange={handleChange}
        // aria-invalid={errors.rating ? 'true' : 'false'}
      />
      <div className="error" role="alert" aria-live="assertive">
        {/* {errors.rating} */}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPlayerForm;

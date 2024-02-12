import { useState, useEffect } from "react";

const UpdatePlayerForm = ({
  player,
  formData,
  setFormData,
  updatePlayer,
  setIsEditing,
}) => {
  const [selectedGender, setSelectedGender] = useState(player.gender ?? "");
  const [selectedHand, setSelectedHand] = useState(player.hand ?? "");
  const [customGenderValue, setCustomGenderValue] = useState(
    player.specified_gender ?? ""
  );

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    updatePlayer();
  };

  const handlecustomGenderValueChange = (event) => {
    setCustomGenderValue(event.target.value);
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
          defaultValue={player.first_name ?? ""}
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
          defaultValue={player.last_name ?? ""}
          onChange={handleChange}
          // aria-invalid={errors.last_name ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.lastname} */}
        </div>

        <label htmlFor="genderSelect">Gender</label>
        <select
          id="genderSelect"
          name="gender"
          value={selectedGender ?? ""}
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
          defaultValue={player.rating ?? ""}
          onChange={handleChange}
          // aria-invalid={errors.rating ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.rating} */}
        </div>
        <label htmlFor="notes">Notes:</label>

        <textarea
          type="text"
          id="notes"
          name="notes"
          defaultValue={player.notes ?? ""}
          onChange={handleChange}
          // aria-invalid={errors.rating ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.rating} */}
        </div>

        {/* <label htmlFor="notes">Notes:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          defaultValue={player.rating ?? ""}
          onChange={handleChange}
          // aria-invalid={errors.rating ? 'true' : 'false'}
        /> */}
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
          defaultValue={player.location ?? ""}
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

      <button type="submit">Submit</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );
};

export default UpdatePlayerForm;

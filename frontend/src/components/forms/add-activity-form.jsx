import { useState, useEffect } from "react";

const AddActivityForm = ({
  formData,
  setFormData,
  addActivity,
  playersData,
}) => {
  const [playerSelection, setPlayerSelection] = useState([]);

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

    addActivity();
  };

  // const handleCustomValueChange = (event) => {
  //   console.log("form data ", formData);
  //   setCustomValue(event.target.value);
  //   setFormData({ ...formData, ["specified_gender"]: event.target.value });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
          // aria-invalid={errors.dob ? 'true' : 'false'}
        />

        <div className="error" role="alert" aria-live="assertive"></div>

        <label htmlFor="surfaceSelect">Surface:</label>
        <select id="surfaceSelect" name="surface" onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="Hard">Hard</option>
          <option value="Clay">Clay</option>
          <option value="Astroturf">Astroturf</option>
          <option value="Grass">Grass</option>
          <option value="Carpet">Carpet</option>
        </select>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
          // aria-invalid={errors.first_name ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.first_name} */}
        </div>

        {/* <label htmlFor="player">Player {"("}Opponent{")"}</label>
        <input
          type="text"
          id="opponent"
          name="opponent"
          onChange={handleChange}
          // aria-invalid={errors.first_name ? 'true' : 'false'}
        /> */}

        <label htmlFor="typeSelect">Player</label>
        <select id="typeSelect" name="player" onChange={handleChange}>
          <option value="">Select an option</option>
          {playersData &&
            playersData.map((player) => {
              return (
                <option key={player.player_id} value={player.player_id}>
                  {player.first_name}
                </option>
              );
            })}
        </select>

        <label htmlFor="typeSelect">Type:</label>
        <select id="typeSelect" name="type" onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="Singles">Singles</option>
          <option value="Doubles">Doubles</option>
        </select>

        <label htmlFor="formatSelect">Format:</label>
        <select id="formatSelect" name="format" onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="1 Set">1 Set</option>
          <option value="3 Sets">3 Sets</option>
          <option value="5 Sets">5 Sets</option>
        </select>

        <label htmlFor="score">Score</label>
        <input
          type="text"
          id="score"
          name="score"
          onChange={handleChange}
          // aria-invalid={errors.first_name ? 'true' : 'false'}
        />
        <div className="error" role="alert" aria-live="assertive">
          {/* {errors.first_name} */}
        </div>

        <label htmlFor="outcomeSelect">Outcome:</label>
        <select id="outcomeSelect" name="outcome" onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="W">Win</option>
          <option value="L">Loss</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivityForm;

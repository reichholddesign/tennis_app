import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "../../services/api-calls";
import FormInput from "./form-elements/input";
import FormDropDown from "./form-elements/drop-down";

const AddActivityForm = ({ activity, mutationFunction }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [numSets, setNumSets] = useState();

  const getPlayersQuery = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const playersData = await getData(
        `/players/${encodeURI(user_id)}`,
        accessToken
      );
      // map data for player select
      const playerSelectOptions = playersData.map((player) => ({
        value: player.player_id,
        label: `${player.first_name} ${player?.last_name || ""}`,
      }));
      return [
        { value: "", label: "Select" },
        ...playerSelectOptions,
        { value: "New", label: "Add New Player" },
      ];
    },
  });

  const watchPlayer = watch("player_id", false);
  const watchType = watch("type", activity?.type || false);
  const watchFormat = watch("sets", activity?.format || false);

  // const handleFormatChange = (e) => {

  // };

  const onSubmit = async (data) => {
    mutationFunction.mutate({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <FormInput
          fieldName={"date"}
          fieldTitle={"Date:"}
          initialVal={moment(new Date(activity?.date)).format("YYYY-MM-DD")}
          register={register}
          errors={errors}
          validation={{ required: true }}
          type={"date"}
        />

        {getPlayersQuery.isSuccess && (
          <FormDropDown
            fieldName={"player_id"}
            fieldTitle={"Player:"}
            initialVal={activity?.player_id}
            register={register}
            errors={errors}
            validation={{}}
            options={getPlayersQuery.data}
          />
        )}

        {watchPlayer === "New" && (
          <>
            <fieldset>
              <legend>New Player Name</legend>
              <FormInput
                fieldName={"name"}
                fieldTitle={"First name:"}
                initialVal={""}
                register={register}
                errors={errors}
                validation={{ required: true }}
                type={"text"}
              />

              <FormInput
                fieldName={"last_name"}
                fieldTitle={"Last name:"}
                initialVal={""}
                register={register}
                errors={errors}
                validation={{}}
                type={"text"}
              />
            </fieldset>
          </>
        )}

        <FormDropDown
          fieldName={"surface"}
          fieldTitle={"Surface: "}
          initialVal={activity?.surface}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select" },
            { value: "Hard", label: "Hard" },
            { value: "Clay", label: "Clay" },
            { value: "Astroturf", label: "Astroturf" },
            { value: "Grass", label: "Grass" },
            { value: "Carpet", label: "Carpet" },
          ]}
        />

        <FormInput
          fieldName={"duration"}
          fieldTitle={"Duration:"}
          initialVal={""}
          register={register}
          errors={errors}
          validation={{}}
          type={"text"}
        />

        <FormDropDown
          fieldName={"type"}
          fieldTitle={"Type: "}
          initialVal={activity?.type}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select" },
            { value: "Singles Practice", label: "Singles Practice" },
            { value: "Singles Match", label: "Singles Match" },
          ]}
        />

        {watchType === "Singles Match" && (
          <>
            <FormDropDown
              fieldName={"sets"}
              fieldTitle={"Number of sets: "}
              initialVal={activity?.format}
              register={register}
              errors={errors}
              validation={{
                onChange: (e) => setNumSets(parseInt(e.target.value)),
              }}
              options={[
                { value: "", label: "Select" },
                { value: 1, label: "1 Set" },
                { value: 2, label: "2 Sets" },
                { value: 3, label: "3 Sets" },
                { value: 4, label: "4 Sets" },
                { value: 5, label: "5 Sets" },
              ]}
            />

            {watchFormat && (
              <>
                {[...Array(numSets)].map((_, index) => (
                  <div key={index}>
                    <fieldset>
                      <legend>{`Set ${index + 1}`}</legend>
                      <FormDropDown
                        fieldName={`set-${index + 1}-user-score`}
                        fieldTitle={`You: `}
                        initialVal={{}}
                        register={register}
                        errors={errors}
                        validation={{}}
                        options={[
                          { value: "0", label: "0" },
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                          { value: "4", label: "4" },
                          { value: "5", label: "5" },
                          { value: "6", label: "6" },
                          { value: "7", label: "7" },
                          { value: "8", label: "8" },
                          { value: "9", label: "9" },
                          { value: "10", label: "10" },
                          { value: "11", label: "11" },
                          { value: "12", label: "12" },
                        ]}
                      />
                      <FormDropDown
                        fieldName={`set-${index + 1}-player-score`}
                        fieldTitle={`Opponent: `}
                        initialVal={{}}
                        register={register}
                        errors={errors}
                        validation={{}}
                        options={[
                          { value: "0", label: "0" },
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                          { value: "4", label: "4" },
                          { value: "5", label: "5" },
                          { value: "6", label: "6" },
                          { value: "7", label: "7" },
                          { value: "8", label: "8" },
                          { value: "9", label: "9" },
                          { value: "10", label: "10" },
                          { value: "11", label: "11" },
                          { value: "12", label: "12" },
                        ]}
                      />
                    </fieldset>
                  </div>
                ))}
                <FormDropDown
                  fieldName={"outcome"}
                  fieldTitle={"Outcome: "}
                  initialVal={activity?.outcome}
                  register={register}
                  errors={errors}
                  validation={{}}
                  options={[
                    { value: "", label: "Select" },
                    { value: "Win", label: "Win" },
                    { value: "Loss", label: "Loss" },
                    { value: "N/A", label: "N/A" },
                  ]}
                />
              </>
            )}
          </>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivityForm;

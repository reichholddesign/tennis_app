import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import moment from "moment";

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
      return [{ value: "", label: "Select an option" }, ...playerSelectOptions];
    },
  });

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

        <FormDropDown
          fieldName={"surface"}
          fieldTitle={"Surface: "}
          initialVal={activity?.surface}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select an option" },
            { value: "Hard", label: "Hard" },
            { value: "Clay", label: "Clay" },
            { value: "Astroturf", label: "Astroturf" },
            { value: "Grass", label: "Grass" },
            { value: "Carpet", label: "Carpet" },
          ]}
        />

        <FormInput
          fieldName={"location"}
          fieldTitle={"Location:"}
          initialVal={activity?.location}
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
            { value: "", label: "Select an option" },
            { value: "Singles", label: "Singles" },
            { value: "Doubles", label: "Doubles" },
          ]}
        />
        <FormDropDown
          fieldName={"format"}
          fieldTitle={"Format: "}
          initialVal={activity?.format}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select an option" },
            { value: "1 Set", label: "1 Set" },
            { value: "3 Sets", label: "3 Sets" },
            { value: "5 Sets", label: "5 Sets" },
          ]}
        />

        <FormInput
          fieldName={"score"}
          fieldTitle={"Score:"}
          initialVal={activity?.score}
          register={register}
          errors={errors}
          validation={{}}
          type={"text"}
        />

        <FormDropDown
          fieldName={"outcome"}
          fieldTitle={"Outcome: "}
          initialVal={activity?.outcome}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select an option" },
            { value: "Win", label: "Win" },
            { value: "Loss", label: "Loss" },
            { value: "N/A", label: "N/A" },
          ]}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivityForm;

import FormInput from "./form-elements/input";
import FormDropDown from "./form-elements/drop-down";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GetUnsplashPhoto from "../../services/unsplash";
import FormRadioButtonsWithImages from "./form-elements/image-radio";

const ProfileForm = ({ profile, createProfileMutation, route }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const watchGender = watch("gender", profile.gender || false);

  const onSubmit = (data) => {
    createProfileMutation.mutate({
      ...data,
      route: route,
    });
  };

  let getProfileImgOptionsQuery;

  if (route === "create") {
    getProfileImgOptionsQuery = useQuery({
      queryKey: ["profilePhotoOptions"],
      queryFn: async () => {
        let data = await GetUnsplashPhoto("tennis");
        data = data.map((item) => ({
          url: item.urls.thumb,
          label: item.alt_description,
        }));
        return data;
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {route === "create" && getProfileImgOptionsQuery.isSuccess && (
          <>
            <FormRadioButtonsWithImages
              fieldName={"profile_img_url"}
              fieldTitle={"Select Profile Image: "}
              // initialVal={{}}
              register={register}
              errors={errors}
              validation={{ required: true }}
              options={getProfileImgOptionsQuery.data}
            />
          </>
        )}

        <FormInput
          fieldName={"first_name"}
          fieldTitle={"First name:"}
          initialVal={profile.first_name}
          register={register}
          errors={errors}
          validation={{ required: true }}
          type={"text"}
        />

        <FormInput
          fieldName={"last_name"}
          fieldTitle={"Last name:"}
          initialVal={profile.last_name}
          register={register}
          errors={errors}
          validation={{}}
          type={"text"}
        />

        <FormDropDown
          fieldName={"gender"}
          fieldTitle={"Gender: "}
          initialVal={profile.gender}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select an option" },
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
            { value: "Nonbinary", label: "Nonbinary" },
            { value: "Other", label: "Prefer to self-describe" },
          ]}
        />

        {watchGender === "Other" && (
          <>
            <FormInput
              fieldName={"specified_gender"}
              fieldTitle={"Specify Gender:"}
              initialVal={profile.specified_gender}
              register={register}
              errors={errors}
              validation={{}}
              type={"text"}
            />
          </>
        )}

        <FormDropDown
          fieldName={"hand"}
          fieldTitle={"Hand: "}
          initialVal={profile.hand}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select an option" },
            { value: "Right", label: "Right" },
            { value: "Left", label: "Left" },
            { value: "Ambidextrous", label: "Ambidextrous" },
          ]}
        />
        <FormDropDown
          fieldName={"rating"}
          fieldTitle={"Rating: "}
          initialVal={profile.rating}
          register={register}
          errors={errors}
          validation={{}}
          options={[
            { value: "", label: "Select an option" },
            { value: "1", label: "1.0 (just starting to play tennis)" },
            { value: "1.5", label: "1.5" },
            { value: "2", label: "2.0" },
            { value: "2.5", label: "2.5" },
            { value: "3", label: "3.0" },
            { value: "3.5", label: "3.5" },
            { value: "4", label: "4.0" },
            { value: "4.5", label: "4.5" },
            { value: "5", label: "5.0" },
            { value: "5.5", label: "5.5" },
            { value: "6", label: "6.0" },
            { value: "6.5", label: "6.5" },
            {
              value: "7",
              label: "7.0 (world class professional tennis player)",
            },
          ]}
        />
      </div>

      <input style={{ margin: "1em 0" }} type="submit" />
    </form>
  );
};

export default ProfileForm;

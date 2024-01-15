const EditButton = ({ isEditing, setIsEditing }) => {
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      <button onClick={handleEditProfile}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
    </>
  );
};

export default EditButton;

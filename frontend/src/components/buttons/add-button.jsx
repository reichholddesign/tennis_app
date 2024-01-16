const AddButton = ({ isAdding, setIsAdding }) => {
  const handleEditProfile = () => {
    setIsAdding(!isAdding);
  };
  return (
    <>
      <button onClick={handleEditProfile}>{isAdding ? "Cancel" : "Add"}</button>
    </>
  );
};

export default AddButton;

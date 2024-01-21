const DeleteButton = ({ setIsDeleting }) => {
  const handleDeleteItem = () => {
    setIsDeleting(true);
  };
  return (
    <>
      <button onClick={handleDeleteItem}>Delete</button>
    </>
  );
};

export default DeleteButton;

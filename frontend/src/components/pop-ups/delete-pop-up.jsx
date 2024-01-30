const DeletePopUp = ({ itemToDelete, deleteItem }) => {
  const handleDelete = (deleting) => {
    deleteItem(deleting);
  };

  return (
    <>
      <div>
        <p>Delete {itemToDelete}?</p>
        <button onClick={() => handleDelete(true)}>Yes</button>
        <button onClick={() => handleDelete(false)}>No</button>
      </div>
    </>
  );
};

export default DeletePopUp;

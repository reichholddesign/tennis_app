const DeletePopUp = ({ itemToDelete, deleteActivity }) => {
  const handleDelete = (deleting) => {
    console.log(deleting);
    deleteActivity(deleting);
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

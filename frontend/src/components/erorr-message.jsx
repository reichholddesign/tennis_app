const ErrorMsg = ({ msg }) => {
  return (
    <div>
      <h1 style={{ color: "red" }}>Court Violation:</h1>
      <p>{msg}</p>
    </div>
  );
};

export default ErrorMsg;



const LoginProfile = ({user}) => {

console.log(user)
  return (
 
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
  );
};

export default LoginProfile;
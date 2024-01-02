import { useState } from "react";

const Login = ({ setLoggedIn }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleLogin = () => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.name === name && userData.password === password) {
      setLoggedIn(true);
    } else {
      setInvalidCredentials(true);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      {invalidCredentials && <p>Invalid Credentials</p>}
    </div>
  );
};

export default Login;

import { useState } from "react";
import Navbar from "../components/Navbar";
import FormCard from "../components/FormCard";

const Login = () => {
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // call login API
  };

  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <FormCard title="Member Login">
          <form onSubmit={handleLogin}>
            <input
              className="form-control mb-3"
              placeholder="Registration ID"
              value={regId}
              onChange={(e) => setRegId(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-success w-100">
              Login
            </button>
          </form>

        </FormCard>
      </div>
    </>
  );
};

export default Login;

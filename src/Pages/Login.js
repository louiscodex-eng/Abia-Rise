import { useState } from "react";
import Navbar from "../components/Navbar";
import FormCard from "../components/FormCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const Navigate = useNavigate(); 


 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(
      "https://govtregistrationapi.onrender.com/api/Registration/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RegID: regId,
          Password: password,
        }),
      }
    );

    const data = await response.json();
    

    if (!response.ok) {
      // 🔥 show backend message if available
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store token
    localStorage.setItem("token", data.token);
    localStorage.setItem("regId", data.regId);

      toast.success( data.message ||
          "Login successful! Redirecting to dashboard...",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

    // OPTIONAL redirect
    // ✅ Navigate to dashboard
    setTimeout(() => {
      Navigate("/dashboard");
    }, 800);

  } catch (error) {
    toast.error(error.message || "Something went wrong, try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <ToastContainer />
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

           <button
  className="btn btn-success w-100 d-flex justify-content-center align-items-center"
  disabled={loading}
>
  {loading ? (
    <>
      <span
        className="spinner-border spinner-border-lg me-2"
        role="status"
      />
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>

          </form>

        </FormCard>
      </div>
    </>
  );
};

export default Login;

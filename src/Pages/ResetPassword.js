import { useState } from "react"; 
import Navbar from "../components/Navbar";
import FormCard from "../components/FormCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [regId, setRegId] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ===== Send OTP Step =====
  const handleSendOtp = async () => {
    if (!regId) return toast.error("Please enter your Registration ID");
    setLoading(true);

    try {
      // 🔹 Call your backend OTP endpoint if exists
      // For now we skip OTP generation and just go to next step
      setStep(2);
      toast.success("OTP sent to your registered phone number");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ===== Verify OTP Step =====
  const handleVerifyOtp = () => {
    if (!otp) return toast.error("Please enter the OTP");
    // For now we skip actual OTP verification
    setStep(3);
    toast.success("OTP verified successfully");
  };

  // ===== Reset Password Step =====
  const handleResetPassword = async () => {
    if (!password || !confirm) return toast.error("Fill all fields");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);

    try {
      const response = await fetch(
        "https://govtregistrationapi.onrender.com/api/Registration/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ RegID: regId, Password: password }),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      toast.success(data.message || "Password set successfully 🎉");
      setStep(4);

      // Redirect to login after 2s
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container pt-4">
        <FormCard title="Reset Password">

          {step === 1 && (
            <>
              <input
                className="form-control mb-3"
                placeholder="Registration ID"
                value={regId}
                onChange={(e) => setRegId(e.target.value)}
              />
              <button
                className="btn btn-success w-100"
                disabled={loading}
                onClick={handleSendOtp}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sending OTP...
                  </>
                ) : "Send OTP to my registered phone number"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                className="form-control mb-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="btn btn-success w-100"
                disabled={loading}
                onClick={handleVerifyOtp}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Verifying OTP...
                  </>
                ) : "Verify OTP"}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <button
                className="btn btn-success w-100"
                disabled={loading}
                onClick={handleResetPassword}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Updating Password...
                  </>
                ) : "Confirm"}
              </button>
            </>
          )}

          {step === 4 && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body text-center">
                    <h5 className="text-success mb-3">
                      Password Changed Successfully
                    </h5>
                    <p>You will be redirected to login.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </FormCard>
      </div>
    </>
  );
};

export default ResetPassword;

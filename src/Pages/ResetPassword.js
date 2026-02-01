import { useState } from "react";
import Navbar from "../components/Navbar";
import FormCard from "../components/FormCard";
import useOtpTimer from "../components/useOtpTimer";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [regId, setRegId] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
const { minutes, seconds, expired } = useOtpTimer();
const navigate = useNavigate();

  return (
    <>
      <Navbar />
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
                onClick={() => setStep(2)}
              >
                Send OTP to my registered phone number
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
      disabled={expired}
    />

    <small className={`d-block mb-3 ${expired ? "text-danger" : "text-muted"}`}>
      {expired
        ? "OTP expired. Please restart."
        : `OTP expires in ${minutes}:${seconds.toString().padStart(2, "0")}`}
    </small>

    <button
      className="btn btn-success w-100"
      disabled={expired}
      onClick={() => setStep(3)}
    >
      Verify OTP
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
  onClick={() => {
    setStep(4);
    setTimeout(() => navigate("/login"), 2000);
  }}
>
  Confirm
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

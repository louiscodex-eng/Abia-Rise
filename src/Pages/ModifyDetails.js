import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormCard from "../components/FormCard";
import useOtpTimer from "../components/useOtpTimer";


const ModifyDetails = () => {
  const [regId, setRegId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const { minutes, seconds, expired } = useOtpTimer();


  const navigate = useNavigate();

  const handleProceed = () => {
    // send OTP API
    setStep(2);
  };

  const handleConfirm = () => {
    // verify OTP API
    navigate("/"); // redirect to registration page
  };

  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <FormCard title="Modify Membership Details">
          {step === 1 && (
            <>
              <input
                className="form-control mb-3"
                placeholder="Enter your Registration ID"
                value={regId}
                onChange={(e) => setRegId(e.target.value)}
              />
              <button
                className="btn btn-success w-100"
                onClick={handleProceed}
              >
                Proceed
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
        ? "OTP expired. Please restart the process."
        : `OTP expires in ${minutes}:${seconds.toString().padStart(2, "0")}`}
    </small>

    <button
      className="btn btn-success w-100"
      disabled={expired}
      onClick={handleConfirm}
    >
      Confirm
    </button>
  </>
)}

        </FormCard>
      </div>
    </>
  );
};

export default ModifyDetails;

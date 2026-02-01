import { useState, useEffect } from "react";
import logo from "../abia-rise.png";
import nigeriaStatesLGA from "../data/nigeriaStatesLGA";
import nigeriaWards from "../data/nigeriaWards.json";
import Navbar from "../components/Navbar";

function Register() {
  // ===== State =====
  const [isVoters, setVoters] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nin, setNin] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [ward, setWard] = useState("");
  const [country, setCountry] = useState("");
  const [isNigeria, setIsNigeria] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wardsData, setWardsData] = useState({});
  const [loadingWards, setLoadingWards] = useState(true);
  const [isCitizen, setIsCitizen] = useState("");

  // ===== Transform wards JSON =====
  useEffect(() => {
    const transformed = {};
    nigeriaWards.forEach((stateObj) => {
      const stateName = stateObj.state.trim();
      transformed[stateName] = {};
      stateObj.lgas.forEach((lgaObj) => {
        const lgaName = lgaObj.name.trim();
        transformed[stateName][lgaName] = lgaObj.wards.map((w) => w.name.trim());
      });
    });
    setWardsData(transformed);
    setLoadingWards(false);
  }, []);

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        firstName,
        middleName,
        lastName,
        dob,
        email,
        phoneNumber: phone,
        NationalId: nin,
        gender,
        maritalStatus,
        state,
        lga,
        ward,
        isVoters,
        country: "Nigeria",
      };
      const response = await fetch(
        "https://govtregistrationapi.onrender.com/api/Registration/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Registration failed");
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar active="register" />

      <div className="container pt-4 pb-5">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3"
            style={{ maxHeight: "120px",borderRadius: "50%" }}
          />
          <h3 className="fw-bold mb-1">Abia Rise</h3>
          <h5 className="text-muted mb-3">Membership Registration Form</h5>
        </div>

        <div
          className="card shadow-sm mx-auto position-relative"
          style={{ maxWidth: "900px", overflow: "hidden" }}
        >
          {/* Watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              opacity: 0.05,
              zIndex: 0,
              pointerEvents: "none",
              backgroundImage: `url(${logo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />

          <div className="card-body position-relative" style={{ zIndex: 1 }}>
            {/* First Question */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                Do you have a Voters Card?
              </label>
              <select
                className="form-select"
                value={isVoters}
                onChange={(e) => setVoters(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            {/* If user selects No */}
            {isVoters === "No" && (
              <div className="alert alert-danger">
                Please visit the nearest INEC Registration Centre to obtain your PVC or call 09011111111
              </div>
            )}

            {/* If user selects Yes, show the full form */}
            {isVoters === "Yes" && (
               <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <h6 className="fw-bold mb-3">Personal Details</h6>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="National Identity Number"
                    value={nin}
                    onChange={(e) => setNin(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Gender & Marital Status */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    required
                  >
                    <option value="">Marital Status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widow</option>
                    <option>Widower</option>
                  </select>
                </div>
              </div>

              {/* Citizenship */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={isCitizen}
                    onChange={(e) => {
                      setIsCitizen(e.target.value);
                      setState("");
                      setLga("");
                      setWard("");
                      setCountry("");
                    }}
                    required
                  >
                    <option value="">Do you reside in Nigeria?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* State / LGA / Ward */}
              {isCitizen === "Yes" && (
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setLga("");
                        setWard("");
                      }}
                      required
                    >
                      <option value="">Select State of origin</option>
                      {Object.keys(nigeriaStatesLGA).map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={lga}
                      onChange={(e) => setLga(e.target.value)}
                      disabled={!state}
                      required
                    >
                      <option value="">Select LGA</option>
                      {state &&
                        nigeriaStatesLGA[state].map((lgaName) => (
                          <option key={lgaName} value={lgaName}>
                            {lgaName}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      disabled={!state || !lga || loadingWards}
                      required
                    >
                      <option value="">
                        {loadingWards ? "Loading wards..." : "Select Ward"}
                      </option>
                     {state && lga && wardsData[state] && wardsData[state][lga]
  ? wardsData[state][lga].map((wardName) => (
      <option key={wardName} value={wardName}>
        {wardName}
      </option>
    ))
  : null}

                    </select>
                  </div>
                </div>
              )}

           
              {/* Voter & Membership */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={isVoters}
                    onChange={(e) => setVoters(e.target.value)}
                    required
                  >
                    <option value="">Do you have a voters card?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  {isVoters === "Yes" && (
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          placeholder="Enter Voter's Card No."
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={isNigeria}
                    onChange={(e) =>
                      setIsNigeria(e.target.value)
                    }
                    required
                  >
                    <option value="">
                      Select country of residence
                    </option>
                    <option>Nigeria</option>
                    <option>Other Country</option>
                  </select>
                </div>
              </div>

              {/* If user selects Nigeria */}
{isNigeria === "Nigeria" && (
  <div className="row g-3 mb-3">
    <div className="col-md-6">
      <select
        className="form-select"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setLga("");
          setWard("");
        }}
        required
      >
        <option value="">Select State</option>
        {Object.keys(nigeriaStatesLGA).map((stateName) => (
          <option key={stateName} value={stateName}>
            {stateName}
          </option>
        ))}
      </select>
    </div>
  </div>
)}

{/* If user selects Other Country */}
{isNigeria === "Other Country" && (
  <div className="row g-3 mb-3">
    <div className="col-md-6">
      <select
        className="form-select"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      >
        <option value="">Select your Country</option>
        <option value="Ghana">Ghana</option>
        <option value="Cameroon">Cameroon</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Others">Others</option>
      </select>
    </div>
  </div>
)}

              {/* Passport Upload */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Upload Passport Photograph
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  required
                />
              </div>

              {/* Terms */}
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>

              {/* Register Button */}
              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Register"}
                </button>
              </div>

              <p className="text-muted small">
                Note: This is a pre-membership registration form. You will be
                contacted by your Local Government / Ward Representative once
                your membership registration is approved and ready for pickup.
              </p>
            </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

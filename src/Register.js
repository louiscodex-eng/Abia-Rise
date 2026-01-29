import { useState } from "react";
import logo from "./abia-rise.png";
import nigeriaStatesLGA from "./data/nigeriaStatesLGA";

function Register() {
  // ===== Personal Details =====
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nin, setNin] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [loading, setLoading] = useState(false);
const [pdfUrl, setPdfUrl] = useState(null);


  // ===== Other Details =====
  const [lga, setLga] = useState("");
  const [state,setState] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [isNigerian, setIsNigerian] = useState("");
    const [isMembershipApplied, setIsMembershipApplied] = useState("");
    const [isVoters, setVoters] = useState("");

  // ===== Account Info =====
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //======Helper Functions ======
  function base64ToBlob(base64, contentType = "application/pdf") {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: contentType });
}

  // ===== Submit Function =====
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
      NationalId:nin,
      gender,
      maritalStatus,
      state,
      lga,
      city,
      ward,
      isNigerian,
      isVoters,
      isMembershipApplied,
      country: "Nigeria",
      username,
      password,
    };

    const response = await fetch(
      "https://govtregistrationapi.onrender.com/api/Registration/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    // 🔑 Convert Base64 → PDF
    const pdfBlob = base64ToBlob(data.pdfBase64);
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);

    setPdfUrl(pdfObjectUrl);
    alert("Registration successful! PDF generated.");

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container my-5">
      {/* Header */}
      <div
  className="text-center mb-4 py-3"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#088d01",
    zIndex: 1000,
  }}
>
    <div className="text-center py-3">
  <img
    src={logo}
    alt="Logo"
    style={{ height: "150px", borderRadius: "50%", border: "3px solid #ffffff" }}
    className="mb-2"
  />
  </div>
  </div>

     <div style={{ marginTop: "250px" }}>
  <h3 className="text-center fw-bold">Abia Rise</h3>
  <h5 className="text-center mb-3">
    Membership Registration Form
  </h5>

  <div className="text-center mb-4">
    <h6>Register|Login</h6>
  </div>
</div>
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "900px" }}>
  <div className="card-body">
    <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <h6 className="fw-bold mb-3">Personal Details</h6>

        {/* Names */}
        <div className="row mb-3">
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
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* DOB & Email */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
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

        {/* Phone & NIN */}
        <div className="row mb-3">
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
        <div className="row mb-3">
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
            </select>
          </div>
        </div>

        {/* Other Details */}
        <h6 className="fw-bold mt-4 mb-3">Other Details</h6>

        <div className="row mb-3">
            {/* state */}
             <div className="col-md-6">
    <select
      className="form-select"
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        setLga(""); // reset LGA when state changes
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
            <input
              className="form-control"
              placeholder="City / Town"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <select
              className="form-select"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              required
            >
              <option value="">Select Ward</option>
              <option>Ward 1</option>
              <option>Ward 2</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Do you have voters card?</label>
            <select
              className="form-select"
              value={isVoters}
              onChange={(e) => setVoters(e.target.value)}
              required
            >
              <option value=""></option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium">Have you applied for a membership card before?</label>
            <select
              className="form-select"
              value={isMembershipApplied}
              onChange={(e) => setIsMembershipApplied(e.target.value)}
              required
            >
              <option value=""></option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">State of Residence</label>
            <select
              className="form-select"
              value={isNigerian}
              onChange={(e) => setIsNigerian(e.target.value)}
              required
            >
              <option value="">Current State of Residence</option>
              <option>Nigeria</option>
              <option>Others</option>
            </select>
          </div>
        </div>

        
        {/* Account Access Info */}
        <h6 className="fw-bold mt-4 mb-3">Account Access Info</h6>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {/* terms and conditions */}
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
         {pdfUrl && (
  <div className="mt-4">
    <h5 className="fw-bold text-center">Your Membership PDF</h5>

    <iframe
      src={pdfUrl}
      title="Membership PDF"
      width="100%"
      height="600px"
      style={{ border: "1px solid #ccc" }}
    />

    <div className="d-grid mt-3">
      <a href={pdfUrl} download="membership.pdf">
        <button className="btn btn-primary">
          Download PDF
        </button>
      </a>
    </div>
  </div>
)}

        {/* Note */}
        <p className="text-muted small">
          Note: This is a pre membership registration form. You will be contacted
          by your Local Government / Ward Representative once your membership
          registration is approved and ready for pickup.
        </p>
          </form>
       </div>
    </div>

    </div>
  );
}

export default Register;

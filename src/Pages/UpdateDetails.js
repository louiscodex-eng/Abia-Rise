import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../abia-rise.png";
import nigeriaStatesLGA from "../data/nigeriaStatesLGA";
import nigeriaWards from "../data/nigeriaWards.json";
import Navbar from "../components/Navbar";
import IDCard from "../components/IDCard";
import residenceInfo from "../data/residenceInfo.js";

function UpdateDetails() {
  // ===== Personal Details =====
 
  const [loading, setLoading] = useState(false);
  const [isCitizen] = useState("");
 
  const [registeredUser] = useState(null);
  const [profile, setProfile] = useState(null);


  // ===== Other Details =====
  const [ setLga] = useState("");
  const [setState] = useState("");
  const [setWard] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isNigeria] = useState("");
  const [isVoters] = useState("");
  const [ setPassportUrl] = useState("");
  
  const [ setCountry] = useState("");
  // ===== Wards Data =====
  const [wardsData, setWardsData] = useState({});
  const [loadingWards, setLoadingWards] = useState(true);

  // ===== Transform local JSON into usable wardsData =====
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

  const fetchMyProfile = async () => {
  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    const regId = localStorage.getItem("regId");

    if (!token || !regId) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(
      "https://govtregistrationapi.onrender.com/api/Registration/my-profile",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile");
    }

    setProfile(data);
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMyProfile();
}, []);

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

const [formData, setFormData] = useState({
  regID: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  email: "",
  phoneNumber: "",
  nationalId: "",
  gender: "",
  maritalStatus: "",
  isCitizen: "",
  state: "",
  lga: "",
  ward: "",
  isVoters: "",
  country: "",
  passportUrl: "",
});
useEffect(() => {
  if (profile) {
    setFormData({
      ...profile,
      dob: profile.dob?.split("T")[0], // fix date input
    });
  }
}, [profile]);


  // ===== Submit Function =====
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(
        "https://govtregistrationapi.onrender.com/api/Registration/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }
  
      toast.success(data.message || "Profile updated successfully 🎉");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar active="update-details" />
      
      {/* Toast Container - Required for notifications */}
      <ToastContainer />

      <div className="container pt-4 pb-5">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3"
            style={{ maxHeight: "120px" }}
          />
          <h3 className="fw-bold mb-1">Labour Party</h3>
          <h5 className="text-muted mb-3">Update Details</h5>
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
 {loading && (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" style={{ width: 80, height: 80 }} />
  </div>
)}
          <div className="card-body position-relative" style={{ zIndex: 1 }}>
            <form onSubmit={handleUpdate}>
              {/* Personal Details */}
              <h6 className="fw-bold mb-3">Personal Details</h6>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">FirstName</label>
                  <input
                    className="form-control"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">Middle Name</label>
                  <input
                    className="form-control"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">Last Name</label>
                  <input
                    className="form-control"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">
                    Do you reside in Nigeria?
                  </label>
                  <select
                    className="form-select"
                    value={formData.isCitizen}
                    onChange={(e) => {
                      setFormData({...formData, isCitizen: e.target.value});
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
                    <label className="form-label fw-medium">State of Origin</label>
                    <select
                      className="form-select"
                      value={formData.state}
                      onChange={(e) => {
                        setFormData({...formData, state: e.target.value});
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
                    <label className="form-label fw-medium">
                      Local Government Area (LGA)
                    </label>
                    <select
                      className="form-select"
                      value={formData.lga}
                      onChange={(e) => setFormData({...formData, lga: e.target.value})}
                      disabled={!formData.state}
                      required
                    >
                      <option value="">Select LGA</option>
                      {formData.state &&
                        nigeriaStatesLGA[formData.state].map((lgaName) => (
                          <option key={lgaName} value={lgaName}>
                            {lgaName}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-medium">Ward</label>
                    <select
                      className="form-select"
                      value={formData.ward}
                      onChange={(e) => setFormData({...formData, ward: e.target.value})}
                      disabled={!formData.state || !formData.lga || loadingWards}
                      required
                    >
                      <option value="">
                        {loadingWards ? "Loading wards..." : "Select Ward"}
                      </option>
                      {formData.state && formData.lga && wardsData[formData.state] && wardsData[formData.state][formData.lga]
                        ? wardsData[formData.state][formData.lga].map((wardName) => (
                            <option key={wardName} value={wardName}>
                              {wardName}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              )}

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">Phone Number</label>
                  <input
                    className="form-control"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">
                    National Identity Number(NIN)
                  </label>
                  <input
                    className="form-control"
                    placeholder="National Identity Number"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Gender & Marital Status - FIXED */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">Gender *</label>
                  <select
                    className="form-select"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">Marital Status *</label>
                  <select
                    className="form-select"
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                    required
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widow">Widow</option>
                    <option value="Widower">Widower</option>
                  </select>
                </div>
              </div>

              {/* Voter & Membership */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">
                    Do you have a voters card?
                  </label>
                  <select
                    className="form-select"
                    value={formData.isVoters}
                    onChange={(e) => setFormData({...formData, isVoters: e.target.value})}
                    required
                  >
                    <option value="">Do you have a voters card?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-medium">Country of Residence</label>
                  <select
                    className="form-select"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    required
                  >
                    <option value="">Select country of residence</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other Country">Other Country</option>
                  </select>
                </div>
              </div>

              {/* Voters Card Number - Shows when Yes is selected */}
              {isVoters === "Yes" && (
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Voter's Card Number</label>
                    <input
                      className="form-control"
                      placeholder="Enter Voter's Card No."
                      value={formData.votersCardNo}
                      onChange={(e) => setFormData({...formData, votersCardNo: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* If user selects Nigeria */}
              {isNigeria === "Nigeria" && (
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">State of Residence</label>
                    <select
                      className="form-select"
                      value={formData.residenceState}
                      onChange={(e) => setFormData({...formData, residenceState: e.target.value})}
                      required
                    >
                      <option value="">Select State</option>
                      {Object.keys(residenceInfo).map((stateName) => (
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
                    <label className="form-label fw-medium">Country of Residence</label>
                    <select
                      className="form-select"
                      value={formData.countryOfResidence}
                      onChange={(e) => setFormData({...formData, countryOfResidence: e.target.value})}
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
                  onChange={(e) => setPassportUrl(e.target.files[0])}
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
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Updating,Please Wait...
                    </>
                  ) : (
                    "Update Details"
                  )}
                </button>
              </div>

              <p className="text-muted small">
                Note: This is a pre-membership registration form. You will be
                contacted by your Local Government / Ward Representative once
                your membership registration is approved and ready for pickup.
              </p>
            </form>
          </div>
        </div>

        {/* Show ID Card after successful registration */}
        {registeredUser && (
          <div className="mt-4">
            <IDCard user={registeredUser} />
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateDetails;
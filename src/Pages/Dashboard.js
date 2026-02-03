import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDCard from "../components/IDCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch(
        "https://govtregistrationapi.onrender.com/api/Registration/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch dashboard");
      }

      setUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <>
        <Navbar />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-success"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );

  if (!user) return null;

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div
        className="container-fluid py-4 px-3 px-md-4"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="text-center text-md-start">
              <h2 className="fw-bold text-success mb-1">
                Welcome, {user.firstName} {user.lastName}!
              </h2>
              <p className="text-muted mb-0">
                Here's your membership information
              </p>
            </div>
          </div>
        </div>

        {/* Profile Overview Card */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                {/* Profile Picture */}
                <div className="mb-3">
                  <img
                    src={user.passportUrl}
                    alt="User Passport"
                    className="rounded-circle shadow-sm"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      border: "4px solid #198754",
                    }}
                  />
                </div>

                {/* User Info */}
                <h5 className="fw-bold mb-3">
                  {user.firstName} {user.middleName || ""} {user.lastName}
                </h5>

                <div className="text-start">
                  <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">
                      Registration Number
                    </small>
                    <strong className="text-success">{user.regID}</strong>
                  </div>

                  <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">
                      Email Address
                    </small>
                    <strong className="text-break">{user.email}</strong>
                  </div>

                  <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">
                      Phone Number
                    </small>
                    <strong>{user.phoneNumber}</strong>
                  </div>

                  {user.niN && (
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">NIN</small>
                      <strong>{user.niN}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Card */}
          <div className="col-12 col-lg-8">
            <div className="card h-100 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 text-success">
                  Personal Information
                </h5>

                <div className="row g-3">
                  {/* Date of Birth */}
                  {user.dob && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">
                          Date of Birth
                        </small>
                        <strong>
                          {new Date(user.dob).toLocaleDateString()}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* Gender */}
                  {user.gender && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">
                          Gender
                        </small>
                        <strong>{user.gender}</strong>
                      </div>
                    </div>
                  )}

                  {/* Marital Status */}
                  {user.maritalStatus && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">
                          Marital Status
                        </small>
                        <strong>{user.maritalStatus}</strong>
                      </div>
                    </div>
                  )}

                  {/* State */}
                  {user.state && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">State</small>
                        <strong>{user.state}</strong>
                      </div>
                    </div>
                  )}

                  {/* LGA */}
                  {user.lga && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">LGA</small>
                        <strong>{user.lga}</strong>
                      </div>
                    </div>
                  )}

                  {/* Ward */}
                  {user.ward && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">Ward</small>
                        <strong>{user.ward}</strong>
                      </div>
                    </div>
                  )}

                  {/* Country */}
                  {user.country && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">
                          Country
                        </small>
                        <strong>{user.country}</strong>
                      </div>
                    </div>
                  )}

                  {/* Voter Status */}
                  {user.IsVoters && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">
                          Voter's Card
                        </small>
                        <strong>{user.IsVoters}</strong>
                      </div>
                    </div>
                  )}

                  {/* Citizenship */}
                  {user.IsCitizen && (
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded h-100">
                        <small className="text-muted d-block mb-1">
                          Nigerian Citizen
                        </small>
                        <strong>{user.IsCitizen}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Membership ID Card Section */}
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-3">
              <h4 className="fw-bold text-success">Your Membership Card</h4>
              <p className="text-muted">
                Download your official Labour Party membership card
              </p>
            </div>

            {/* Using your existing IDCard component */}
            <div className="d-flex justify-content-center">
              <div
                style={{
                  maxWidth: "100%",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <IDCard user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
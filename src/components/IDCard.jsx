import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { QRCodeCanvas } from "qrcode.react";
import logo from "./abia-rise.png";
import "../App.css";
import qrCode from "./qrcode.png";

function IDCard({ user }) {
  const downloadPdf = async () => {
    const element = document.getElementById("id-card");
    
    // Temporarily remove truncation for PDF generation
    const truncatedElements = element.querySelectorAll('.truncate-text');
    truncatedElements.forEach(el => {
      el.style.whiteSpace = 'normal';
      el.style.overflow = 'visible';
      el.style.textOverflow = 'clip';
    });

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
    });

    // Restore truncation after PDF generation
    truncatedElements.forEach(el => {
      el.style.whiteSpace = 'nowrap';
      el.style.overflow = 'hidden';
      el.style.textOverflow = 'ellipsis';
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [125, 65],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 125, 65);
    pdf.save("labour-party-id-card.pdf");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="text-center mt-5">
      {/* ID CARD WRAPPER */}
      <div
        id="id-card"
        className="border border-success rounded mx-auto"
        style={{
          width: "515px",
          height: "280px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#dbdbdb",
        }}
      >
        {/* 🔹 BACKGROUND IMAGE LAYER */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('/abia-rise.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: 1,
          }}
        />

        {/* 🔹 CARD CONTENT (FULL OPACITY) */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "12px",
            height: "100%",
          }}
        >
          {/* HEADER */}
          <div
            className="d-flex align-items-center mb-3 px-2 py-1 rounded"
            style={{ backgroundColor: "#198754" }}
          >
            {/* LOGO */}
            <img src={logo} alt="logo" style={{ width: "65px" }} />

            {/* TITLE */}
            <div className="flex-grow-1 text-center text-white">
              <h2 className="mb-0 fw-bold">Abia Arise</h2>
              <small>Arise for a new Abia!!</small>
            </div>
          </div>

          {/* BODY */}
          <div className="row">
            {/* DETAILS */}
            <div className="col-8">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                {/* ROW 1 */}
                <div style={{ display: "flex" }}>
                  <span style={{ flex: "0 1 45%", minWidth: 0 }}>
                    <span className="fw-bold text-success">Name: </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "140px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={`${user.firstName || user.FirstName} ${user.lastName || user.LastName}`}
                    >
                      {user.firstName || user.FirstName}{" "}
                      {user.lastName || user.LastName}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 55%", minWidth: 0 }}>
                    <span
                      style={{ marginLeft: "30px" }}
                      className="fw-bold text-success"
                    >
                      NIN:{" "}
                    </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "110px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={user.niN || user.NiN || user.NIN || user.nationalId}
                    >
                      {user.niN || user.NiN || user.NIN || user.nationalId}
                    </span>
                  </span>
                </div>

                {/* ROW 2 */}
                <div style={{ display: "flex" }}>
                  <span style={{ flex: "0 0 50%", minWidth: 0 }}>
                    <span className="fw-bold text-success">RegID: </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "130px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={user.regID || user.RegID}
                    >
                      {user.regID || user.RegID}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 50%", minWidth: 0 }}>
                    <span
                      style={{ marginLeft: "-5px" }}
                      className="fw-bold text-success"
                    >
                      State:{" "}
                    </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={user.state || user.State}
                    >
                      {user.state || user.State}
                    </span>
                  </span>
                </div>

                {/* ROW 3 */}
                <div style={{ display: "flex" }}>
                  <span style={{ flex: "0 0 50%", marginLeft: "-10px", minWidth: 0 }}>
                    <span className="fw-bold text-success">LGA: </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={user.lga}
                    >
                      {user.lga}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 50%", minWidth: 0 }}>
                    <span
                      style={{ paddingLeft: "30px" }}
                      className="fw-bold text-success"
                    >
                      Ward:{" "}
                    </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "80px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={user.ward}
                    >
                      {user.ward}
                    </span>
                  </span>
                </div>

                {/* ROW 4 */}
                <div style={{ display: "flex" }}>
                  <span style={{ flex: "0 0 48%", marginLeft: "-12px", minWidth: 0 }}>
                    <span className="fw-bold text-success">DOB: </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "130px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={formatDate(user.dob || user.DOB)}
                    >
                      {formatDate(user.dob || user.DOB)}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 52%", minWidth: 0 }}>
                    <span
                      style={{ marginLeft: "34px" }}
                      className="fw-bold text-success"
                    >
                      Gender:{" "}
                    </span>
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "80px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}
                      title={user.gender || user.Gender}
                    >
                      {user.gender || user.Gender}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* PASSPORT */}
            <div className="col-4 d-flex align-items-end justify-content-center">
              <img
                src={user.passportUrl || user.PassportUrl}
                alt="passport"
                className="img-thumbnail"
                style={{
                  width: "130px",
                  height: "120px",
                  objectFit: "cover",
                  borderColor: "#198754",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD */}
      <button className="btn btn-success mt-3" onClick={downloadPdf}>
        Download ID Card (PDF)
      </button>

      {/* QR CODE - Moved below download button */}
      {/* <div className="mt-3">
        <p className="text-muted mb-2">Scan QR Code:</p>
        <QRCodeCanvas
          value={user.regID}
          size={120}
          bgColor="#ffffff"
          fgColor="#198754"
        />
      </div> */}
      {/* QR CODE - Static PNG Image */}
<div className="mt-3 text-center">
  <p className="text-muted mb-2">Download using the CRONTOCODE Mobile App</p>

  <img
    src={qrCode}
    alt="QR Code"
    width={120}
    height={120}
  />
</div>

    </div>
  );
}

export default IDCard;
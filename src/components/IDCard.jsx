import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { QRCodeCanvas } from "qrcode.react";
import logo from "./abia-rise.png";
import "../App.css";
import qrCode from './qrcode.png';
import signature from './signature.png';

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

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-GB");
  // };

  return (
    <div className="text-center mt-5">
      {/* ID CARD WRAPPER */}
      <div
        id="id-card"
        className="border border-success rounded mx-auto"
        style={{
          width: "450px",
          height: "280px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f4fff6",
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
              {/* MEMBERSHIP NUMBER - Added below Forward Ever */}
              <div className="fw-bold" style={{ fontSize: "15px", marginTop: "2px" }}>
               {user.regID || user.RegID}
              </div>
            </div>


          </div>

          {/* BODY */}
          <div className="row">
            {/* DETAILS */}
            <div className="col-8 fw-medium text-start px-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  color: "#404040",

                }}
              >
               
                {/* ROW  1
                <div style={{ display: "flex" }}>
                  <span>
                    
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "430px",
                        fontSize: "14px",
                        //whiteSpace: "nowrap",
                        //overflow: "hidden",
                        //textOverflow: "ellipsis",
                        //verticalAlign: "",
                      }}
                      title={`${user.regId || user.RegID}`}
                    >
                      {`Membership NO: ${user.regID || user.RegID}`}
                    </span>
                  </span>
                 
                </div> */}
                {/* row 2 */}
               
                <div style={{ display: "flex" }}>
                  <span>
                    
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "430px",
                        fontSize: "14px",
                        //whiteSpace: "nowrap",
                        //overflow: "hidden",
                        //textOverflow: "ellipsis",
                        //verticalAlign: "",
                      }}
                      title={`${user.firstName} ${user.lastName} ${user.middleName || ""}`}
                    >
                      {`Full Name: ${user.firstName} ${user.lastName} ${user.middleName || ""}`}
                    </span>
                  </span>
                 
                </div>

                {/* ROW 3 */}
                <div style={{ display: "flex" }}>
                  <span>
                    
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "430px",
                        fontSize: "14px",
                        //whiteSpace: "nowrap",
                        //overflow: "hidden",
                        //textOverflow: "ellipsis",
                        //verticalAlign: "",
                      }}
                      title={`${user.state}`}
                    >
                      {`State: ${user.state}`}
                    </span>
                  </span>
                </div>

 {/* new row */}
                <div style={{ display: "flex" }}>
                  <span>
                    
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "430px",
                        fontSize: "14px",
                        //whiteSpace: "nowrap",
                        //overflow: "hidden",
                        //textOverflow: "ellipsis",
                        //verticalAlign: "",
                      }}
                      title={`${user.lga}`}
                    >
                      {`LGA: ${user.lga}`}
                    </span>
                  </span>
                 
                </div>
                

                {/* new row - CHANGED FROM NIN TO WARD */}
                <div style={{ display: "flex" }}>
                  <span>
                    
                    <span
                      className="truncate-text"
                      style={{
                        display: "inline-block",
                        maxWidth: "430px",
                        fontSize: "14px",
                        //whiteSpace: "nowrap",
                        //overflow: "hidden",
                        //textOverflow: "ellipsis",
                        //verticalAlign: "",
                      }}
                      title={`${user.ward || user.Ward}`}
                    >
                      {`Ward: ${user.ward || user.Ward}`}
                    </span>
                  </span>
                 
                </div>
                
                
                 {/* ROW 4 - Signature */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="text-center">
                    <img
                      src={signature}
                      alt="signature"
                      style={{
                        width: "100px",
                        height: "auto",
                        maxHeight: "50px",
                        objectFit: "contain",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#666",
                        marginTop: "-15px",
                        fontStyle: "italic",
                      }}
                    >
                      Authorized Signatory
                    </div>
                  </div>
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
          value={user.regID || user.RegID}
          size={120}
          bgColor="#ffffff"
          fgColor="#198754"
        />
      </div> */}
      <div className="mt-3 text-center">
  <p className="text-muted mb-2">Download the ID Card to your mobile phone</p>

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
import logo from "../abia-rise.png";

const FormCard = ({ title, children }) => {
  return (
    <div
      className="card shadow-sm mx-auto position-relative"
      style={{ maxWidth: "900px", overflow: "hidden" }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "400px",
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div className="card-body position-relative" style={{ zIndex: 1 }}>
        <h5 className="fw-bold mb-4 text-center">{title}</h5>
        {children}
      </div>
    </div>
  );
};

export default FormCard;

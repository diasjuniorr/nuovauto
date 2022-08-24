import Dialog from "../../components/dialog/dialog.component";
const periciaIMG = require("../../assets/pericia.jpg");

const Pericia = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "800px",
        minWidth: "1200px",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>Pericia</h1>
      <div
        style={{
          backgroundImage: `url(${periciaIMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "800px",
          minWidth: "1200px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: "100px", left: "370px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "100px", left: "570px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "100px", left: "760px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "100px", left: "900px" }}>
          <Dialog />
        </div>
        {/* <div style={{ position: "absolute", top: "370px", left: "35px" }}>
      <Dialog />
    </div> */}
        <div style={{ position: "absolute", top: "370px", left: "270px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "370px", left: "670px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "370px", left: "1067px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "650px", left: "370px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "650px", left: "570px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "650px", left: "760px" }}>
          <Dialog />
        </div>
        <div style={{ position: "absolute", top: "650px", left: "900px" }}>
          <Dialog />
        </div>
      </div>
    </div>
  );
};

export default Pericia;

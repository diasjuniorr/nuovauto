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
        <Dialog top={100} left={340} />
        <Dialog top={100} left={540} />
        <Dialog top={100} left={730} />
        <Dialog top={100} left={900} />
        <Dialog top={370} left={270} />
        <Dialog top={370} left={670} />
        <Dialog top={260} left={780} />
        <Dialog top={480} left={780} />
        <Dialog top={370} left={940} />
        <Dialog top={370} left={1067} />
        <Dialog top={650} left={340} />
        <Dialog top={650} left={540} />
        <Dialog top={650} left={730} />
        <Dialog top={650} left={900} />
      </div>
    </div>
  );
};

export default Pericia;

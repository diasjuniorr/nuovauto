const periciaIMG = require("../../../assets/pericia.jpg");

interface PericiaImgContainerProps {
  children: React.ReactNode;
}

const PericiaImgContainer: React.FC<PericiaImgContainerProps> = ({
  children,
}) => {
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
        {children}
      </div>
    </div>
  );
};

export default PericiaImgContainer;

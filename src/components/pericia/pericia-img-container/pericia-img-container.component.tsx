import { Breakpoint, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const periciaIMG = require("../../../assets/pericia.jpg");

type BreakpointOrNull = Breakpoint | null;

interface PericiaImgContainerProps {
  children: React.ReactNode;
}

const PericiaImgContainer: React.FC<PericiaImgContainerProps> = ({
  children,
}) => {
  function useWidth() {
    const theme: Theme = useTheme();
    const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
    return (
      keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matches = useMediaQuery(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      }, null) || "xs"
    );
  }

  const width = useWidth();
  const getWidth = (width: Breakpoint) => {
    switch (width) {
      case "xs":
        return "400px";
      case "sm":
        return "600px";
      case "md":
        return "800px";
      default:
        return "900px";
    }
  };

  return (
    <div
      style={{
        marginTop: "64px",
        maxWidth: `${getWidth(width)}`,
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${periciaIMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "580px",
          minWidth: "800px",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PericiaImgContainer;

// const width = useWidth();
// const getWidth = (width: Breakpoint) => {
//   switch (width) {
//     case "xs":
//       return "400px";
//     case "sm":
//       return "600px";
//     case "md":
//       return "800px";
//     case "lg":
//       return "960px";
//     default:
//       return "1280px";
//   }
// };

// return (
//   <div
//     style={{
//       marginTop: "64px",
//       maxWidth: `${getWidth(width)}`,
//       overflowX: "auto",
//       whiteSpace: "nowrap",
//     }}
//   >
//     <div
//       style={{
//         backgroundImage: `url(${periciaIMG})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         minHeight: "800px",
//         minWidth: "1200px",
//         position: "relative",
//       }}
//     >

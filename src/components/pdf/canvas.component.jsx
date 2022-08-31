import React from "react";
import PropTypes from "prop-types";

const Canvas = ({ draw, height, width }) => {
  const canvas = React.useRef();
  React.useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context);
  });
  return <canvas id="pdf-canvas" ref={canvas} height={height} width={width} style={{display: "none"}}/>;
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
export default Canvas;

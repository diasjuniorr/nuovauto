import React from "react";
import PropTypes from "prop-types";

const Canvas = ({ draw, height, width, id }) => {
  const canvas = React.useRef();
  React.useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context);
  });
  return <canvas id={id} ref={canvas} height={height} width={width} style={{display: "none"}}/>;
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};
export default Canvas;

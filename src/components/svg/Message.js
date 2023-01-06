import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgMessage = (props) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 0H5C2.24 0 0 2.23 0 4.98v6.98c0 2.75 2.24 4.98 5 4.98h1.5c.27 0 .63.18.8.4l1.5 1.99c.66.88 1.74.88 2.4 0l1.5-1.99c.19-.25.49-.4.8-.4H15c2.76 0 5-2.23 5-4.98V4.98C20 2.23 17.76 0 15 0ZM6 10c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.44 1-1 1Zm4 0c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.44 1-1 1Zm4 0c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.44 1-1 1Z"
      fill={props.color}
    />
  </Svg>
);
export default SvgMessage;

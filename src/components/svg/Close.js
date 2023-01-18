import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgClose = (props) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.001 1 15 15M1 15 14.999 1"
      stroke="#04060F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgClose;

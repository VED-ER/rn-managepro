import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgArrowLeft = (props) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.57 5.93 3.5 12l6.07 6.07M20.5 12H3.67"
      stroke="#04060F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgArrowLeft;

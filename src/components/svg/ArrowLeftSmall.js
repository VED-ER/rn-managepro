import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgArrowLeftSmall = (props) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 4.08 8.48 10.6c-.77.77-.77 2.03 0 2.8L15 19.92"
      stroke={props.color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgArrowLeftSmall;

import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgAdd = (props) => (
  <Svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.5 15h15M15 22.5v-15"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgAdd;

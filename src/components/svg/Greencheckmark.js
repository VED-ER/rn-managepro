import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgGreencheckmark = (props) => (
  <Svg
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13 .5C6.112.5.5 6.112.5 13c0 6.887 5.612 12.5 12.5 12.5 6.887 0 12.5-5.613 12.5-12.5C25.5 6.112 19.887.5 13 .5Zm5.975 9.625-7.088 7.087a.937.937 0 0 1-1.325 0l-3.537-3.537a.943.943 0 0 1 0-1.325.943.943 0 0 1 1.325 0l2.875 2.875L17.65 8.8a.943.943 0 0 1 1.325 0 .943.943 0 0 1 0 1.325Z"
      fill="#70BA1B"
    />
  </Svg>
);
export default SvgGreencheckmark;

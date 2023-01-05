import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SvgFacebookLogo = (props) => (
  <Svg
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={21} cy={21} r={21} fill="#F3F3F3" />
    <Path
      d="m25.648 22.25.547-3.594H22.72v-2.343c0-1.016.468-1.954 2.031-1.954h1.602v-3.086S24.906 11 23.539 11c-2.852 0-4.727 1.758-4.727 4.883v2.773H15.61v3.594h3.204V31h3.906v-8.75h2.93Z"
      fill="#04060F"
    />
  </Svg>
);
export default SvgFacebookLogo;

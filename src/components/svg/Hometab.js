import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgHometab = (props) => (
  <Svg
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.83 6.01 13.28.77C12-.25 10-.26 8.73.76L2.18 6.01C1.24 6.76.67 8.26.87 9.44l1.26 7.54C2.42 18.67 3.99 20 5.7 20h10.6c1.69 0 3.29-1.36 3.58-3.03l1.26-7.54c.18-1.17-.39-2.67-1.31-3.42ZM11.75 16c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3Z"
      fill={props.color}
    />
  </Svg>
);
export default SvgHometab;

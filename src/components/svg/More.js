import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgMore = (props) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.167 8.333C3.25 8.333 2.5 9.083 2.5 10s.75 1.667 1.667 1.667c.916 0 1.666-.75 1.666-1.667s-.75-1.667-1.666-1.667ZM15.833 8.333c-.916 0-1.666.75-1.666 1.667s.75 1.667 1.666 1.667c.917 0 1.667-.75 1.667-1.667s-.75-1.667-1.667-1.667ZM10 8.333c-.917 0-1.667.75-1.667 1.667s.75 1.667 1.667 1.667 1.667-.75 1.667-1.667-.75-1.667-1.667-1.667Z"
      fill="#181A20"
    />
  </Svg>
);
export default SvgMore;

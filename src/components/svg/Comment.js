import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComment = (props) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.667 12.667h-.334c-2.666 0-4-.667-4-4V5.333c0-2.666 1.334-4 4-4h5.334c2.666 0 4 1.334 4 4v3.334c0 2.666-1.334 4-4 4h-.334c-.206 0-.406.1-.533.266l-1 1.334c-.44.586-1.16.586-1.6 0l-1-1.334a.753.753 0 0 0-.533-.266Z"
      stroke="#626879"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.667 5.333h6.666M4.667 8.667h4"
      stroke="#626879"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgComment;

import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgCalendar = (props) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.667 4.792a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625ZM13.333 4.792a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625ZM7.083 12.083a.83.83 0 0 1-.316-.066.86.86 0 0 1-.275-.175.86.86 0 0 1-.242-.592.83.83 0 0 1 .067-.317c.041-.1.1-.191.175-.275a.86.86 0 0 1 .275-.175.851.851 0 0 1 .908.175c.15.159.242.375.242.592 0 .05-.009.108-.017.167a.53.53 0 0 1-.05.15.631.631 0 0 1-.075.15c-.025.041-.067.083-.1.125a.876.876 0 0 1-.592.241ZM10 12.083a.83.83 0 0 1-.317-.066.86.86 0 0 1-.275-.175.86.86 0 0 1-.241-.592.83.83 0 0 1 .066-.317c.042-.1.1-.191.175-.275a.86.86 0 0 1 .275-.175.835.835 0 0 1 .909.175c.15.159.241.375.241.592 0 .05-.008.108-.016.167a.529.529 0 0 1-.05.15.626.626 0 0 1-.075.15c-.025.041-.067.083-.1.125a.876.876 0 0 1-.592.241ZM12.917 12.083a.831.831 0 0 1-.317-.066.862.862 0 0 1-.275-.175 60.77 60.77 0 0 0-.1-.125.634.634 0 0 1-.075-.15.532.532 0 0 1-.05-.15c-.008-.059-.017-.117-.017-.167 0-.217.092-.433.242-.592a.862.862 0 0 1 .275-.175.833.833 0 0 1 .908.175c.15.159.242.375.242.592 0 .05-.008.108-.017.167a.532.532 0 0 1-.05.15.634.634 0 0 1-.075.15c-.025.041-.066.083-.1.125a.876.876 0 0 1-.591.241ZM7.083 15a.829.829 0 0 1-.316-.067.96.96 0 0 1-.275-.175.876.876 0 0 1-.242-.591.83.83 0 0 1 .067-.317c.041-.108.1-.2.175-.275.308-.308.875-.308 1.183 0 .15.158.242.375.242.592a.876.876 0 0 1-.242.591.876.876 0 0 1-.592.242ZM10 15a.876.876 0 0 1-.592-.242.876.876 0 0 1-.241-.591.83.83 0 0 1 .066-.317c.042-.108.1-.2.175-.275.309-.308.875-.308 1.184 0a.777.777 0 0 1 .175.275c.041.1.066.208.066.317a.876.876 0 0 1-.241.591A.876.876 0 0 1 10 15ZM12.917 15a.876.876 0 0 1-.592-.242.779.779 0 0 1-.175-.275.831.831 0 0 1-.067-.316c0-.109.025-.217.067-.317.042-.108.1-.2.175-.275a.832.832 0 0 1 .908-.175c.05.017.1.042.15.075.042.025.084.067.125.1.15.158.242.375.242.592a.876.876 0 0 1-.242.591.876.876 0 0 1-.591.242ZM17.083 8.2H2.917a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h14.166a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z"
      fill="#04060F"
    />
    <Path
      d="M13.333 18.958H6.667c-3.042 0-4.792-1.75-4.792-4.791V7.082c0-3.042 1.75-4.792 4.792-4.792h6.666c3.042 0 4.792 1.75 4.792 4.792v7.083c0 3.042-1.75 4.792-4.792 4.792ZM6.667 3.542c-2.384 0-3.542 1.158-3.542 3.541v7.083c0 2.384 1.158 3.542 3.542 3.542h6.666c2.384 0 3.542-1.158 3.542-3.541V7.082c0-2.383-1.158-3.542-3.542-3.542H6.667Z"
      fill="#04060F"
    />
  </Svg>
);
export default SvgCalendar;
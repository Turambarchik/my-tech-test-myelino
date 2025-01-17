import * as React from "react"
import Svg, { SvgProps, Path, Ellipse } from "react-native-svg"

export const CheckPlanCardIcon = (props: SvgProps) => (
  <Svg
    width={10}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="teal"
      d="M5 5.7c-.426 0-.835-.158-1.136-.44a1.451 1.451 0 0 1-.471-1.06c0-.398.17-.78.47-1.06.302-.282.71-.44 1.137-.44.426 0 .835.158 1.136.44.302.28.471.662.471 1.06 0 .197-.041.392-.122.574-.081.182-.2.347-.349.487-.149.139-.326.25-.521.325A1.707 1.707 0 0 1 5 5.7ZM5 0a4.668 4.668 0 0 0-3.182 1.23C.974 2.018.5 3.086.5 4.2.5 7.35 5 12 5 12s4.5-4.65 4.5-7.8c0-1.114-.474-2.182-1.318-2.97A4.668 4.668 0 0 0 5 0Z"
    />
    <Ellipse cx={5.001} cy={4.434} fill="teal" rx={3.441} ry={3.391} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M5 6.261a2.413 2.413 0 0 0 1.684-.687 2.346 2.346 0 0 0 .698-1.66 2.318 2.318 0 0 0-.698-1.66A2.385 2.385 0 0 0 5 1.565a2.4 2.4 0 0 0-1.685.687 2.33 2.33 0 0 0-.698 1.66c0 .623.251 1.22.698 1.66A2.4 2.4 0 0 0 5 6.262Zm-.062-1.398 1.324-1.565-.407-.334L4.717 4.31l-.589-.581-.374.369.794.782.205.202.185-.219Z"
      clipRule="evenodd"
    />
  </Svg>
)

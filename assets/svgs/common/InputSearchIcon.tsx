import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const InputSearchIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="teal"
      d="M12.497 12.523a.789.789 0 0 1 1.114 0l2.043 1.65h.036a1.078 1.078 0 0 1 0 1.514 1.05 1.05 0 0 1-1.497 0l-1.696-1.944-.065-.073a.867.867 0 0 1 .065-1.147ZM6.862 0c1.82 0 3.566.73 4.852 2.031a6.974 6.974 0 0 1 2.01 4.905c0 3.83-3.072 6.936-6.862 6.936S0 10.767 0 6.936C0 3.106 3.072 0 6.862 0Z"
    />
  </Svg>
)


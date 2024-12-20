import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg"

export const BreadCrumpsArrowIcon = (props: SvgProps) => (
  <Svg
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#292941"
        stroke="#292941"
        strokeWidth={0.6}
        d="M2.186.978 2.182.974A.837.837 0 0 0 1.558.7C1.05.7.7 1.136.7 1.629c0 .243.086.47.23.642l.007.009L5.221 7 .937 11.72l-.008.01a.989.989 0 0 0-.229.641c0 .493.35.929.858.929a.82.82 0 0 0 .628-.286l4.858-5.356.002-.003A.97.97 0 0 0 7.3 7a.957.957 0 0 0-.257-.66L2.186.979Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect
          width={14}
          height={8}
          y={14}
          fill="#fff"
          rx={4}
          transform="rotate(-90 0 14)"
        />
      </ClipPath>
    </Defs>
  </Svg>
)

import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

const Play = () => {
  const theme = useTheme();
  return (
    <View>
      <Svg width={64} height={64} viewBox="0 0 64 64">
        <Path
          fill="none"
          stroke={theme.colors.text}
          strokeLinejoin="bevel"
          strokeMiterlimit={10}
          strokeWidth={2}
          d="m27 15 17 17-17 17"
        />
        <Circle
          cx={32}
          cy={32}
          r={30.999}
          fill="none"
          stroke={theme.colors.text}
          strokeMiterlimit={10}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

export default Play;

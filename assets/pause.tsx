import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

const Pause = () => {
  const theme = useTheme();
  return (
    <View>
      <Svg width={64} height={64} viewBox="0 0 64 64">
        <G fill="none" stroke={theme.colors.text} strokeMiterlimit={10} strokeWidth={2}>
          <Path d="M25 23v18M38 23v18M53.92 10.081c12.107 12.105 12.107 31.732 0 43.838-12.106 12.108-31.734 12.108-43.839 0-12.107-12.105-12.107-31.732 0-43.838 12.105-12.108 31.732-12.108 43.839 0z" />
        </G>
      </Svg>
    </View>
  );
};

export default Pause;

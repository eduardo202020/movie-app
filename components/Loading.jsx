import { View, Text, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

import * as Progress from "react-native-progress";
import { theme } from "../theme";

const Loading = () => {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;

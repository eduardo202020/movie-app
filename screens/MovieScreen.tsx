import { View, Text } from "react-native";
import React from "react";

type Props = {
  a: string;
};

const MovieScreen = ({ a }: Props) => {
  return (
    <View>
      <Text>MovieScreen</Text>
    </View>
  );
};

export default MovieScreen;

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }) => {
  // console.log("item.poster_path: ", item.poster_path);

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        // source={require("../assets/images/moviePoster1.png")}
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;

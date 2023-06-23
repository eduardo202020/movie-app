import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const isCarousel = React.useRef(null);

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideScale={0.8}
        sliderWidth={width}
        itemWidth={width * 0.6}
        slideStyle={{ display: "flex", alignItems: "center", elevation: 5 }}
        vertical={false}
        // layout="default"
        // layoutCardOffset={9}
        ref={isCarousel}
        // inactiveSlideShift={0}
        // useScrollView={true}
        // autoplay={true}
        // loop={true}
      />
    </View>
  );
};

export default TrendingMovies;

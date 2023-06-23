import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";

import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");
// api
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

const MovieScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setcast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const { params: item } = useRoute();
  const navigation = useNavigation();

  const movieName = "Ant man and the wasp";

  useEffect(() => {
    // call api
    // console.log("item id: ", item);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("got movie details: ", data);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("credits: ", data);
    if (data && data.cast) {
      setcast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log("got similar movies: ", data);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}

      <View className="w-full">
        <SafeAreaView
          className={
            "absolute w-full z-20 flex flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-xl p-1 "
            style={styles.background}
          >
            <ChevronLeftIcon color="white" size="28" strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite((favorite) => !favorite)}
          >
            <HeartIcon
              size={35}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/images/moviePoster2.png")}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie.title}
        </Text>
        {/* status , relese, runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center ">
            {movie?.status} · {movie?.release_date?.split("-")[0]} ·{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            const showDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "·" : null}
              </Text>
            );
          })}

          {/* <Text className="text-neutral-400 font-semibold text-base text-center">
            Action ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy ·
          </Text> */}
        </View>
        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}

      <Cast cast={cast} navigation={navigation} />

      {/* similar moview */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
};

export default MovieScreen;

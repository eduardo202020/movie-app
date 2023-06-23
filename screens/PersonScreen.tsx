import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const { height, width } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

const PersonScreen = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3]);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <ScrollView
      className="flex-1 bg-neutral-900 "
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}

      <SafeAreaView
        className={
          "w-full z-20 flex flex-row justify-between items-center px-4" +
          verticalMargin
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

      {/* person details */}

      {loading ? (
        <Loading />
      ) : (
        <View className="">
          <View
            className="flex-row w-72 mx-auto justify-center rounded-full"
            style={{
              shadowColor: "white",
              shadowRadius: 50,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 10,
              backgroundColor: "white",
              elevation: 30,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={require("../assets/images/castImage2.png")}
                style={{
                  height: height * 0.43,
                  width: width * 0.8,
                }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Keanu Reeves
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              London, United Kingdom
            </Text>
          </View>
          <View className="mx-3 p-4  flex-row mt-6  justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 pr-2 items-center justify-center ">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 pr-2 items-center justify-center ">
              <Text className="text-white font-semibold ">Birday</Text>
              <Text className="text-neutral-300 text-sm">2010</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 pr-2 items-center">
              <Text className="text-white font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className="-pl-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">64</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2 ">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
              itaque fugiat dolore eveniet assumenda excepturi delectus aut id
              minus natus, ullam corrupti, magni quis dicta rem vel omnis
              mollitia provident. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Voluptatem sapiente fugiat, sed reiciendis
              itaque placeat sit officia numquam cumque aspernatur ea. Animi
              incidunt labore deleniti blanditiis maxime, non similique saepe?
            </Text>
          </View>
          {/* Movies */}

          <MovieList title="Movies" data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

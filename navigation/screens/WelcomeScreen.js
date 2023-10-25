import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import RNCheerio from "react-native-cheerio";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [signName, setSignName] = React.useState("");
  const [videoLink, setVideoLink] = React.useState("");
  const [name, setName] = React.useState("");
  // get signOfTheDay from signing Savvy by Google (copyright!)
  React.useEffect(() => {
    retrieveData();
    let ignoreStaleRequest = false;
    fetch("https://www.signingsavvy.com/signoftheday")
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.text();
      })
      .then((data) => {
        if (!ignoreStaleRequest) {
          // get sign of the day
          const $ = RNCheerio.load(data);
          const header = $(".signing_header h2").text();
          setSignName(header);

          // get link to sign of the day
          const videoLink = $('link[rel="preload"][as="video"]').attr("href");
          setVideoLink(videoLink);
        }
      })
      .catch((error) => console.log(error));
    return () => {
      ignoreStaleRequest = true;
    };
  });
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      //console.log(value);
      const details = await AsyncStorage.getItem(value);
      //console.log(details);
      const json = JSON.parse(details);
      //console.log(json);
      const temp = json.FirstName;
      // We have data!!
      setName(temp);
      //alert(name);
      //console.log(name);
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  // TODO - Add a loading screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name} </Text>
      <Text style={styles.header}>Sign Of The Day: </Text>
      <Text style={styles.signName}>{signName}</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoLink,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
      <Text>Video copyright: signingsavvy.com/signoftheday/ </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
  },
  signName: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: "bold",
  },
});

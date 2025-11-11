import { Theme, useRoute, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Pressable, View, StyleSheet, Text } from "react-native";
import { AudioPro, AudioProState, useAudioPro } from "react-native-audio-pro";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../hooks";
import { TrackDetailsScreenProps } from "../../types/navigation";
import Slider from "@react-native-community/slider";
import Play from "../../assets/play";
import Pause from "../../assets/pause";

const TrackDetails = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const route = useRoute<TrackDetailsScreenProps>();
  const { trackId } = route.params;
  const { position, duration } = useAudioPro();

  const selector = useAppSelector((state) => state.tracks);
  const selectedTrack = selector.tracks.find((x) => x.trackId === trackId);

  const track = {
    id: selectedTrack.trackId,
    url: selectedTrack.audio,
    title: selectedTrack.name,
    artwork: selectedTrack.albumImage,
    artist: selectedTrack.artistName,
  };

  useEffect(() => {
    AudioPro.play(track);
  }, []);

  const isPlaying = AudioPro.getState() === AudioProState.PLAYING;

  const onPressPlay = () => {
    isPlaying ? AudioPro.pause() : AudioPro.resume();
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={{ uri: track.artwork }} style={styles.thumbnail} />
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>{track.artist}</Text>
      </View>

      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={position}
        thumbTintColor={theme.colors.text}
        maximumTrackTintColor={theme.colors.text}
        minimumTrackTintColor={"#827f7fff"}
      />

      <Pressable onPress={onPressPlay} style={styles.playBtn}>
        {isPlaying ? <Pause /> : <Play />}
      </Pressable>
    </SafeAreaView>
  );
};

const makeStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    thumbnail: {
      height: 360,
      aspectRatio: 1,
      resizeMode: "cover",
      borderRadius: 16,
    },

    title: {
      color: colors.text,
      fontSize: 24,
      marginTop: 16,
      textAlign: "center",
      marginHorizontal: 16,
      flexWrap: "wrap",
    },
    artist: {
      color: colors.text,
      marginTop: 8,
    },
    playBtn: {
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 16,
    },
  });
};

export default TrackDetails;

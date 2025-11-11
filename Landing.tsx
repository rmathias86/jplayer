import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { debounce } from "lodash";
import { useCallback } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchTracks } from "./features/tracks/tracksSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { LandingScreenNavigationProp } from "./types/navigation";

export const Landing = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const navigation = useNavigation<LandingScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { tracks } = useAppSelector((state) => state.tracks);

  const handleSearch = useCallback(
    debounce(({ searchTerm }: { searchTerm: String }) => {
      dispatch(searchTracks(searchTerm));
    }, 500),
    [],
  );

  const onSearchTextChange = (term: String) => handleSearch({ searchTerm: term });

  const onItemPress = (item: any) => {
    navigation.navigate("TrackDetails", { trackId: item.trackId, name: item.name });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        placeholder="Search for artists, albuns, songs and more"
        placeholderTextColor={theme.colors.text}
        onChangeText={onSearchTextChange}
        style={styles.searchBox}
        defaultValue=""
      />
      <FlatList
        data={tracks}
        style={styles.listContainer}
        renderItem={({ item }: { item: any }) => (
          <Pressable style={styles.itemContainer} onPress={() => onItemPress(item)}>
            <Image
              source={{ uri: item.albumImage }}
              style={{
                height: 75,
                aspectRatio: 1,
                borderRadius: 8,
              }}
            />
            <View style={{ marginLeft: 8, justifyContent: "center" }}>
              <Text style={styles.itemTrackName}>{item.name}</Text>
              <Text style={styles.itemArtist}>{item.artistName}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const makeStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    searchBox: {
      height: 48,
      padding: 12,
      marginHorizontal: 8,
      borderWidth: 0.5,
      borderRadius: 16,
      borderColor: "#5f616c",
      elevation: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      flexDirection: "row",
      color: "white",
    },
    listContainer: { marginTop: 8, marginBottom: 16 },
    itemContainer: {
      flexDirection: "row",
      borderRadius: 16,
      borderWidth: 0.2,
      padding: 8,
      margin: 8,
      borderColor: "#5f616c",
    },

    itemTrackName: {
      color: colors.text,
      fontSize: 16,
    },
    itemArtist: {
      color: colors.text,
    },
  });
};

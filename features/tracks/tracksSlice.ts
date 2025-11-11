import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

interface TracksState {
  tracks: any[];
  status: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  status: "idle",
  error: null,
};

export const searchTracks = createAsyncThunk("tracks/searchTracks", async (inputSearch: String) => {
  const response = await fetch(
    baseUrl + `&search=${inputSearch}&limit=20&include=musicinfo&groupby=artist_id`,
  );
  return await response.json();
});

const searchTracksSlice = createSlice({
  name: "searchTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTracks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(searchTracks.fulfilled, (state, action) => {
        const results = action.payload.results;

        const extractFields = results.map((item: any) => ({
          albumImage: item.album_image,
          artistName: item.artist_name,
          name: item.name,
          duration: item.duration,
          trackId: item.id,
          audio: item.audio,
        }));

        state.status = "fulfilled";
        state.tracks = extractFields;
      })
      .addCase(searchTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default searchTracksSlice.reducer;

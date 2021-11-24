import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { discoverMovies, searchMovies } from './moviesAPI';

export interface Movie {
  id: number | null;
  name: string;
  img: string;
  overview: string;
  vote_average: number | null;
}

export const initialState: Movie = {
  id: null,
  name: "",
  img: "",
  overview: "",
  vote_average: null
};

export interface MoviesState {
  current: Movie;
  list?: Movie[];
  status: 'idle' | 'loading' | 'failed';
}

const moviesInitialState: MoviesState = {
  current: initialState,
  list: undefined,
  status: 'idle'
}

// Discover movies
export const discoverMoviesAsync = createAsyncThunk(
  'discover',
  async () => {
    const response = await discoverMovies();
    return getResultsFrom(response)
  }
);

// Search movies
export const searchMoviesAsync = createAsyncThunk(
  'search',
  async (name: string) => {
    const response = await searchMovies(name);
    return getResultsFrom(response)
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    addToList: (state, action: PayloadAction<Movie>) => {
      state.list = state.list ? [...state.list!, action.payload] : [action.payload];
      state.status = 'idle';
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      state.list = state.list?.filter(f => f.id !== action.payload);
      state.status = 'idle';
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(discoverMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(discoverMoviesAsync.rejected, (state) => {
        state.status = 'idle';
      })
      .addCase(discoverMoviesAsync.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'idle';
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'idle';
      });
  },
});

export const { addToList, removeFromList } = moviesSlice.actions;

//Loading status
export const selectStatus = (state: RootState) => state.movies.status;

//Select current movie
export const selectMovie = (state: RootState) => state.movies.current;

//Select movie list
export const selectMovies = (state: RootState) => state.movies.list;

export const searchMoviesThunk = (searchTerm: string): AppThunk => (
  dispatch
) => {
  dispatch(searchMoviesAsync(searchTerm));
};

export const discoverMoviesThunk = (): AppThunk => (
  dispatch
) => {
  dispatch(discoverMoviesAsync());
};

export default moviesSlice.reducer;

function getResultsFrom(response: any): Movie[] {
  return response.data.results.map((m: any) => {
    return {
      id: m.id,
      name: m.original_title,
      img: m.backdrop_path,
      vote_average: m.vote_average,
      overview: m.overview
    } as Movie;
  });
}

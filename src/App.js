import React from 'react';
import MovieList from "./MovieList";

const API_KEY = "ac938f2c1a3b9d22ac903dee17dbbbb8"
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`

function App() {
  return <div style={{display: "flex"}}>
      <MovieList title={"Tranding Now"} url={URL}/>
      <MovieList title={"Sci-Fi Hits"} url={`${URL}&with_genres=878`}/>
      <MovieList title={"Comedy Hits"} url={`${URL}&with_genres=35`}/>
  </div>
}

export default App;

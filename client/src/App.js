import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieEdit from "./Movies/MovieEdit";
import axios from "axios";

const App = () => {
   const [savedList, setSavedList] = useState([]);
   const [movieList, setMovieList] = useState([]);
   const [counter, setCounter] = useState(0);

   const getMovieList = () => {
      axios
         .get("http://localhost:5000/api/movies")
         .then((res) => setMovieList(res.data))
         .catch((err) => console.log(err.response));
   };

   const addToSavedList = (movie) => {
      setSavedList([...savedList, movie]);
   };

   useEffect(() => {
      getMovieList();
   }, [counter]);

   return (
      <>
         <SavedList list={savedList} />

         <Route exact path="/">
            <MovieList movies={movieList} />
         </Route>

         <Route path="/movies/:id">
            <Movie addToSavedList={addToSavedList} />
         </Route>

         <Route path="/update-movie/:id">
            <MovieEdit setCounter={setCounter} counter={counter} />
         </Route>
      </>
   );
};

export default App;

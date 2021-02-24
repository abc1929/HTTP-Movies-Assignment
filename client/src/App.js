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
   const [counter, setCounter] = useState(0); // used to refresh homepage

   const getMovieList = () => {
      axios
         .get("http://localhost:5000/api/movies")
         .then((res) => setMovieList(res.data))
         .catch((err) => console.log(err.response));
   };

   const addToSavedList = (movie) => {
      if (savedList.filter((i) => i.id === movie.id).length) {
         return;
      }
      setSavedList([...savedList, movie]);
   };

   const removeFromSave = (movie) => {
      setSavedList(savedList.filter((i) => i.id !== movie.id));
   };

   // const getNewID = () => {
   //    const target = Number(movieList[movieList.length - 1]?.id) + 1;
   //    return target > 0 ? target : 0;
   // };

   useEffect(() => {
      getMovieList();
   }, [counter]);

   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <SavedList list={savedList} removeFromSave={removeFromSave} />

         <Route exact path="/">
            <MovieList movies={movieList} />
         </Route>

         <Route path="/movies/:id">
            <Movie
               addToSavedList={addToSavedList}
               setCounter={setCounter}
               counter={counter}
            />
         </Route>

         <Route path="/update-movie/:id">
            <MovieEdit setCounter={setCounter} counter={counter} />
         </Route>

         <Route path="/add-movie/">
            <MovieEdit setCounter={setCounter} counter={counter} />
         </Route>
      </div>
   );
};

export default App;

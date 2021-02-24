import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieEditCard from "./MovieEditCard";

function MovieEdit({ addToSavedList, setCounter, counter }) {
   const [movie, setMovie] = useState(null);
   const params = useParams();

   const fetchMovie = (id) => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then((res) => setMovie(res.data))
         .catch((err) => console.log(err.response));
   };

   const saveMovie = () => {
      addToSavedList(movie);
   };

   useEffect(() => {
      fetchMovie(params.id);
   }, [params.id]);

   if (!movie) {
      return <div>Loading movie information...</div>;
   }

   return (
      <div className="save-wrapper">
         <MovieEditCard
            movie={movie}
            setCounter={setCounter}
            counter={counter}
         />
      </div>
   );
}

export default MovieEdit;

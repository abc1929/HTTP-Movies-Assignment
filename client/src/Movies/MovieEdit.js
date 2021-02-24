import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import MovieEditCard from "./MovieEditCard";

function MovieEdit({ addToSavedList, setCounter, counter }) {
   const [movie, setMovie] = useState(null);
   const params = useParams();
   const partialurl = useLocation().pathname;

   const fetchMovie = (id) => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then((res) => setMovie(res.data))
         .catch((err) => console.log(err.response));
   };

   const setUpNewMovie = () => {
      return {
         id: params.id,
         title: "",
         director: "",
         metascore: null,
         stars: [],
      };
   };

   const isAddMovie = () => {
      return partialurl.match(/add-movie/i) !== null;
   };

   useEffect(() => {
      fetchMovie(params.id);
   }, [params.id]);

   if (!movie && !isAddMovie()) {
      return <div>Loading movie information...</div>;
   }

   return (
      <div className="save-wrapper" style={{ justifyContent: "center" }}>
         <MovieEditCard
            movie={isAddMovie() ? setUpNewMovie() : movie}
            setCounter={setCounter}
            counter={counter}
         />
      </div>
   );
}

export default MovieEdit;

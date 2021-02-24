import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { NavLink, useHistory } from "react-router-dom";

function Movie({ addToSavedList, setCounter, counter }) {
   const [movie, setMovie] = useState(null);
   const params = useParams();
   const history = useHistory();

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
         <NavLink
            to={"/update-movie/" + movie.id}
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
         >
            <MovieCard movie={movie} />
         </NavLink>

         <div style={{ marginLeft: "-10%", marginTop: "5%", zIndex: 100 }}>
            <div className="save-button" onClick={saveMovie}>
               Save
            </div>
            <NavLink
               to={"/update-movie/" + movie.id}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <div className="edit-button">Edit</div>
            </NavLink>
            <div
               className="red-button delete-button"
               onClick={() => {
                  document.querySelector(".delete-modal").style.visibility =
                     "visible";
               }}
            >
               Delete
            </div>
            <div className="delete-modal">
               <div className="delete-modal-card">
                  <h2> Are You Sure You Want to Delete This? </h2>

                  <div
                     style={{
                        width: "20vw",
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "4%",
                     }}
                  >
                     <button
                        className="edit-button red-button"
                        style={{
                           padding: "3% 6%",
                           textAlign: "center",
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           axios
                              .delete(
                                 "http://localhost:5000/api/movies/" + params.id
                              )
                              .then((res) => {
                                 setCounter(counter + 1);
                                 history.goBack();
                              });
                        }}
                     >
                        I'm Sure
                     </button>
                     <button
                        className="edit-button"
                        style={{
                           padding: "3% 6%",
                           textAlign: "center",
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           document.querySelector(
                              ".delete-modal"
                           ).style.visibility = "hidden";
                        }}
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Movie;

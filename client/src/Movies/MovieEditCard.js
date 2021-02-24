import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, useLocation } from "react-router-dom";

const MovieEditCard = (props) => {
   const { title, director, metascore, stars } = props.movie;
   const { id } = useParams();
   const history = useHistory();
   const partialurl = useLocation().pathname;

   const [newMovieData, setNewMovieData] = useState({
      id: id,
      title: title,
      director: director,
      metascore: metascore,
      stars: stars,
   });

   const [bridge, setBridge] = useState(stars);
   useEffect(() => {
      if (newMovieData.stars.length !== bridge.length) {
         setBridge(newMovieData.stars);
      }
   }, [newMovieData.stars, bridge.length]);

   const updateMovie = () => {
      axios
         .put("http://localhost:5000/api/movies/" + id, {
            ...newMovieData,
            stars: newMovieData.stars.filter((i) => i !== ""),
         })
         .then((res) => {
            props.setCounter(props.counter + 1);
            history.goBack();
         });
   };

   const addMovie = () => {
      axios
         .post("http://localhost:5000/api/movies/", {
            ...newMovieData,
            stars: newMovieData.stars.filter((i) => i !== ""),
         })
         .then((res) => {
            props.setCounter(props.counter + 1);
            history.goBack();
         });
   };

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
         }}
      >
         <div className="movie-card" style={{ width: "80vw" }}>
            {/* {console.log(stars)} */}
            <h3>
               Movie Name:{" "}
               <input
                  defaultValue={newMovieData.title}
                  // value={newMovieData.title}
                  onChange={(e) => {
                     setNewMovieData({
                        ...newMovieData,
                        title: e.target.value,
                     });
                  }}
               />
            </h3>

            <div className="movie-director">
               Director:{" "}
               <input
                  defaultValue={newMovieData.director}
                  // value={newMovieData.director}
                  onChange={(e) => {
                     setNewMovieData({
                        ...newMovieData,
                        director: e.target.value,
                     });
                  }}
               />
            </div>
            <div className="movie-metascore">
               Metascore:{" "}
               <input
                  defaultValue={newMovieData.metascore}
                  // value={newMovieData.metascore}
                  onChange={(e) => {
                     setNewMovieData({
                        ...newMovieData,
                        metascore: e.target.value,
                     });
                  }}
               />
            </div>
            <h3>
               Actors{" "}
               <button
                  onClick={() =>
                     setNewMovieData({
                        ...newMovieData,
                        stars: newMovieData.stars.concat(""),
                     })
                  }
               >
                  Add
               </button>
            </h3>
            {/* can't allow onChange to trigger rerender, so we only rerender on stars array's length change */}
            {bridge.map((star, i) => (
               <div key={star + i} className="movie-star">
                  <div>
                     <input
                        defaultValue={star}
                        // value={newMovieData.stars[i]}
                        onChange={(e) => {
                           let newstars = [...newMovieData.stars];
                           newstars[i] = e.target.value;

                           setNewMovieData({
                              ...newMovieData,
                              stars: newstars,
                           });
                        }}
                     />
                     <button
                        onClick={() =>
                           setNewMovieData({
                              ...newMovieData,
                              stars: newMovieData.stars.filter(
                                 (_, j) => j !== i
                              ),
                           })
                        }
                     >
                        Delete
                     </button>
                  </div>
               </div>
            ))}
         </div>
         <div
            className="save-button"
            style={{ width: "20vw", cursor: "pointer" }}
            onClick={() => {
               if (partialurl.match(/add-movie/i) !== null) {
                  addMovie();
               } else {
                  updateMovie();
               }
            }}
         >
            OK
         </div>
         <div
            className="save-button red-button"
            style={{ width: "20vw", marginTop: "1vh", cursor: "pointer" }}
            onClick={() => {
               history.goBack();
            }}
         >
            Cancel
         </div>
      </div>
   );
};

export default MovieEditCard;

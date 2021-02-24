import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const MovieEditCard = (props) => {
   const { title, director, metascore, stars } = props.movie;
   const { id } = useParams();
   const history = useHistory();

   const [newMovieData, setNewMovieData] = useState({
      id: id,
      title: title,
      director: director,
      metascore: metascore,
      stars: stars,
   });

   const [bridge, setBridge] = useState(stars);
   useEffect(() => {
      setBridge(newMovieData.stars);
   }, [newMovieData.stars.length]);

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

   return (
      <div>
         <div className="movie-card">
            {/* {console.log(stars)} */}
            <h3>
               Movie Name:
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
               Director:
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
               Metascore:
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
               Actors
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
            onClick={() => {
               updateMovie();
            }}
         >
            OK
         </div>
      </div>
   );
};

export default MovieEditCard;

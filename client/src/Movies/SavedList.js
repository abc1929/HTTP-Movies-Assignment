import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

function SavedList({ list, removeFromSave }) {
   // const history = useHistory();
   return (
      <div className="saved-list">
         <h3>Saved Movies:</h3>
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            {list.map((movie) => {
               return (
                  <div
                     key={movie.id}
                     style={{ border: "1px solid black", padding: "2px" }}
                  >
                     <NavLink
                        to={`/movies/${movie.id}`}
                        // activeClassName="saved-active"
                        style={{
                           textDecoration: "none",
                           color: "inherit",
                        }}
                     >
                        <span className="saved-movie">{movie.title}</span>
                     </NavLink>
                     <button
                        onClick={() => {
                           removeFromSave(movie);
                           // history.push("#");
                        }}
                     >
                        X
                     </button>
                  </div>
               );
            })}
         </div>

         <div style={{ display: "flex" }}>
            <div className="home-button" style={{ marginRight: "15px" }}>
               <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
               >
                  Home
               </Link>
            </div>

            <div className="home-button">
               <Link
                  to={`/add-movie/`}
                  style={{ textDecoration: "none", color: "inherit" }}
               >
                  Add
               </Link>
            </div>
         </div>
      </div>
   );
}

export default SavedList;

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };


const MovieForm = props => {

  const [newMovie, setNewMovie] = useState(initialMovie);
  const {push} = useHistory();
  
  const handleChanges = e => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    console.log(newMovie);
    
  };

  const handleChangesStar = e => {
      var str = e.target.value
    var array = str.split(",");  
    setNewMovie({ ...newMovie, 
        stars: [...array] });
    console.log(newMovie);
    
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, newMovie)
      .then(res => {
        props.getMovieList();
        push(`/`);
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="movie-card">
      <h2>Title:<input
            className="edit-input"
            id="title"
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleChanges}
          /></h2>
      <div className="movie-director">
        Director: <em><input
            className="edit-input"
            id="director"
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleChanges}
          /></em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong><input
            className="edit-input"
            id="metascore"
            type="text"
            name="metascore"
            value={newMovie.metascore}
            onChange={handleChanges}
          /></strong>
      </div>
      <h3>Actors</h3>
        <div className="movie-star">
          <input
            className="edit-input"
            id="stars"
            type="text"
            name="stars"
            value={newMovie.stars}
            onChange={handleChangesStar}
          />
        </div>  
      <button onClick={handleSubmit}>Submit</button>
    </div>
    
  );
};

export default MovieForm;

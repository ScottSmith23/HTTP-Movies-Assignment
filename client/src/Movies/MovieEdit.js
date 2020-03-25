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


const MovieEdit = props => {
    const {id} = useParams();
    const {push} = useHistory();
  const [newMovie, setNewMovie] = useState(initialMovie);

  
  const handleChanges = e => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    console.log(newMovie);
    
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, newMovie)
      .then(res => {
        props.setMovieList(res.data);
        push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };


  useEffect(() => {
    const MovieToUpdate = props.movies.find(e => `${e.id}` === id);
    if (MovieToUpdate) {
      setNewMovie(MovieToUpdate);
    }
    console.log(MovieToUpdate)
  }, [props.movies,id ]);
  


  return (
    <div className="movie-card">
      <h2><input
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
      {newMovie.stars.map(star => (
        <div key={star} className="movie-star">
          <input
            className="edit-input"
            id="stars"
            type="text"
            name="stars"
            value={star}
            onChange={handleChanges}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
    
  );
};

export default MovieEdit;

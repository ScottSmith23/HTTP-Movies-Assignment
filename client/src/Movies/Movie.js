import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList,grabMovieToEdit }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const {push} = useHistory();
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const routeToEditForm = e => {
    e.preventDefault();
    // grabMovieToEdit(movie)
    push(`/update-movie/${movie.id}`);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie}  />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div className='edit-button' onClick={routeToEditForm}>
        Edit
      </div>
      <div className='delete-button' onClick={saveMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;

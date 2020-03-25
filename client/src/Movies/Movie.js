import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList,grabMovieToEdit,getMovieList }) {
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

  const deleteMovie = e => {
    e.preventDefault();
    // make an axios.delete request
    // in the .then, update state with props.setItems and navigate to the shop
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`).then(res => {
      // res.data
      getMovieList();
      push('/');
    });
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
      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;

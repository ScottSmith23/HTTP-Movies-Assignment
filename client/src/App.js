import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieEdit from './Movies/MovieEdit'
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieToEdit,setMovieToEdit] = useState({});  

  const grabMovieToEdit = e => {
    setMovieToEdit(e);
  };


  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    console.log("Done fetching data")
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList}  />
      </Route>

      <Route path="/update-movie/:id">
        <MovieEdit movies={movieList} setMovieList={setMovieList} movie={movieToEdit} addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;

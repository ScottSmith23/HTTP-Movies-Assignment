import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieEdit from './Movies/MovieEdit';
import MovieForm from './Movies/MovieForm';
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieToEdit,setMovieToEdit] = useState({});  
  const {push} = useHistory();
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
        <button onClick={()=>{push("/add-movie")}}>ADD MOVIE!</button>
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList}  />
      </Route>

      <Route path="/update-movie/:id">
        <MovieEdit getMovieList={getMovieList} movies={movieList}  movie={movieToEdit} />
      </Route>
      <Route path="/add-movie">
        <MovieForm getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;

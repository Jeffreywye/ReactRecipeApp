import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
require('dotenv').config();

const App = () => {

  // param in useState assigns recipes to an []
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  // need env tools to hide these 2
  const APP_ID =process.env.REACT_APP_EDAMAM_API_ID;
  const APP_KEY=process.env.REACT_APP_EDAMAM_API_KEY;
  const exampleReq =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //ran when someting renders initially or rerenders
  //when 2nd arg of [] is added, only ran once on first render
  //useful for fetching api data once
  //[counter] only when counter state changes will this run again
  useEffect( ()=>{
    getRecipes();
  }, [query]);

  // // asynchronous call 
  const getRecipes = async () => {
    //await waits for external data to arrive
    const response = await fetch(exampleReq);
    const data = await response.json();
    // console.log(data);
    // console.log("here");
    setRecipes(data.hits);
  }

  //   // alternative with promises and thens
  //   fetch(exampleReq)
  //     .then(response => {
  //       response.json();
  //     })

  const updateSearch = event => {
    // console.log(event);
    setSearch(event.target.value);
  };

  const getSearch = event => {
    //stops refresh after submit btn is pressed
    event.preventDefault();
    //set query value to value from search
    setQuery(search);
    //reset search back to ""
    setSearch("");
  };

  return (
    <div className="App">
      <form 
        className="search-form"
        onSubmit={getSearch}
      >
        <input 
          className="search-bar" 
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button  
          className="search-btn" 
          type="submit"
        >
          search
        </button>

      </form>
      <div className="recipes">
        {recipes.map(
          // parenthesis used in callback fnc to
          // allow for jsx use
          (recipe, index, arr) => (
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          )
        )}
      </div>
      
    </div>
  );
}

export default App;

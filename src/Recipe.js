import React from 'react';
import style from "./recipe.module.css";
//{} deconstructure the props
const Recipes = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1>
                {title}
            </h1>
            <ol>
                {ingredients.map((ingredient, index, arr)=>{
                    return (<li>{ingredient.text}</li>)
                })}
            </ol>
            <p>{calories}</p>
            <img 
                className={style.image}
                src={image} 
                alt=""
            >

            </img>
        </div>
    );
}

export default Recipes;
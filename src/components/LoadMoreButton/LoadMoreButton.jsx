import React from 'react'
import './LoadMoreButton.css'


const LoadMoreButton = ({ getAllPokemons }) => {
    return (
        <button className="load-more" onClick={getAllPokemons}>
            Load more
        </button>
    );
};

export default LoadMoreButton
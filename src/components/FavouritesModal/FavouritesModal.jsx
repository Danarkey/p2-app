import React, { useState, useEffect } from 'react';
import './FavouritesModal.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const FavouritesModal = ({ pokemon, closeModal, favourites, updateFavourites }) => {
  const [isInFavourites, setIsInFavourites] = useState(false);
  const typeColorMap = {
    bug: '#C3CE75',
    dark: '#333',
    dragon: '#F9BE00',
    electric: '#FFD86F',
    fairy: '#f469a9',
    fighting: '#d6b591',
    fire: '#FB6C6C',
    flying: '#BAB0D5',
    ghost: '#735797',
    grass: '#48D0B0',
    ground: '#B1736C',
    ice: '#7FCCEC',
    normal: '#C2C2A1',
    poison: '#7C538C',
    psychic: '#9B7FA6',
    rock: '#a6aab6',
    steel: '#CCCCDE',
    water: '#609FB5',
  };

  const modalStyle = {
    backgroundColor: typeColorMap[pokemon.type] || 'gray',
  };

  useEffect(() => {
    const checkFavourites = () => {
      const isInFavourites = favourites.some((fav) => fav.id === pokemon.id);
      setIsInFavourites(isInFavourites);
    };

    checkFavourites();
  }, [favourites, pokemon.id]);

  const handleFavourites = async () => {
    try {
      if (isInFavourites) {
        const response = await fetch(`http://localhost:3000/favourites/${pokemon.id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Pokemon removed from favourites!');
          updateFavourites(favourites.filter((fav) => fav.id !== pokemon.id));
          setIsInFavourites(false);
        } else {
          console.error('Failed to remove Pokemon from favourites');
        }
      } else {
        const payload = {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          type: pokemon.type,
          stats: pokemon.stats, // Include stats in the payload
        };
  
        const response = await fetch('http://localhost:3000/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          console.log('Pokemon added to favourites!');
          updateFavourites([...favourites, payload]);
          setIsInFavourites(true);
        } else {
          console.error('Failed to add Pokemon to favourites');
        }
      }
    } catch (error) {
      console.error('Error handling favourites:', error);
    }
  };

  return (
    <>
      <ModalOverlay />
      <div className="modal" style={modalStyle} data-state="open">
        <button className="modal-close" onClick={closeModal}></button>
        {pokemon && (
          <div className="pokemon-details">
            <div>
              <h2>{pokemon.name}</h2>
              <div className="pokemon-content">
                <img src={pokemon.image} alt={pokemon.name} />
                <table>
                  <thead>
                    <tr>
                      <th>Stat</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pokemon.stats.map((stat) => (
                      <tr key={stat.name}>
                        <td>{stat.name}:</td>
                        <td className="stat-value">
                          <span className="stat-number">{stat.value}</span>
                          <div className="PokemonStats-bar" style={{ width: `${(stat.value / 255) * 100}%` }}></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="FavouritesButton" onClick={handleFavourites}>
              {isInFavourites ? 'Remove from Favourites' : 'Add to Favourites'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FavouritesModal;

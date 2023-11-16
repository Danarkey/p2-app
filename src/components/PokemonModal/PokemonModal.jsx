import React, { useState, useEffect } from 'react'
import './PokemonModal.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

const PokemonModal = ({ pokemon, image, closeModal, type }) => {
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
    backgroundColor: typeColorMap[type] || 'gray',
  };

  const [isInFavourites, setIsInFavourites] = useState(false);

  useEffect(() => {
    // Check if the current Pokemon is in favourites
    const checkFavourites = async () => {
      try {
        const response = await fetch(`http://localhost:3000/favourites/${pokemon.id}`);
        if (response.ok) {
          setIsInFavourites(true);
        } else {
          setIsInFavourites(false);
        }
      } catch (error) {
        console.error('Error checking favourites:', error);
      }
    };

    checkFavourites();
  }, [pokemon.id]);

  const handleFavourites = async () => {
    try {
      if (isInFavourites) {
        // Remove from favourites
        const response = await fetch(`http://localhost:3000/favourites/${pokemon.id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Pokemon removed from favourites!');
          setIsInFavourites(false);
        } else {
          console.error('Failed to remove Pokemon from favourites');
        }
      } else {
        // Add to favourites
        const payload = {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          type: pokemon.types[0].type.name,
          stats: pokemon.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
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
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <table>
                  <thead>
                    <tr>
                      <th>Stat</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pokemon.stats.map((stat) => (
                      <tr key={stat.stat.name}>
                        <td>{stat.stat.name}:</td>
                        <td className="stat-value">
                          <span className="stat-number">{stat.base_stat}</span>
                          <div className="PokemonStats-bar" style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
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

export default PokemonModal

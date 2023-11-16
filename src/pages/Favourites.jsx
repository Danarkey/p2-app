import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import FavouritesModal from '../components/FavouritesModal/FavouritesModal';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const response = await fetch('http://localhost:3000/favourites');
      if (response.ok) {
        const data = await response.json();
        setFavourites(data);
      } else {
        console.error('Failed to fetch favourites');
      }
    } catch (error) {
      console.error('Error fetching favourites:', error);
    }
  };

  const openModal = (pokemonData) => {
    setSelectedPokemon(pokemonData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setModalVisible(false);
  };

  const updateFavourites = (updatedFavourites) => {
    setFavourites(updatedFavourites);
  };

  return (
    <>
      <div>
        <h2>Your favourites</h2>
        <div className="fav-app-container">
          <div className="pokemon-container">
            <div className="all-container">
              {favourites.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  image={pokemon.image}
                  name={pokemon.name}
                  type={pokemon.type}
                  openModal={() => openModal(pokemon)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <FavouritesModal
          pokemon={selectedPokemon}
          closeModal={closeModal}
          favourites={favourites}
          updateFavourites={updateFavourites}
        />
      )}
    </>
  );
};

export default Favourites;

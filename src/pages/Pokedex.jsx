import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard/PokemonCard'
import LoadMoreButton from '../components/LoadMoreButton/LoadMoreButton'
import PokemonModal from '../components/PokemonModal/PokemonModal'

const Pokedex = () => {

    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=24')
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    const getAllPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        async function createPokemonObject(results) {
            const pokemonData = await Promise.all(results.map(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const data = await res.json();
                return data;
            }));

            const sortedPokemonData = pokemonData.sort((a, b) => a.id - b.id);
            setAllPokemons((currentList) => [...currentList, ...sortedPokemonData]);
        }

        createPokemonObject(data.results)
    }


    const openModal = (pokemonData) => {
        setSelectedPokemon(pokemonData);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedPokemon(null);
        setModalVisible(false);
    };

    useEffect(() => {
        getAllPokemons()
    }, [])

    return (
        <>
            <div className="app-container">
                <div className="pokemon-container">
                    <div className="all-container">
                        {allPokemons.map((pokemonStats, index) => (
                            <PokemonCard
                                key={index}
                                id={pokemonStats.id}
                                image={pokemonStats.sprites.front_default}
                                name={pokemonStats.name}
                                type={pokemonStats.types[0].type.name}
                                openModal={() => openModal(pokemonStats)}
                            />
                        ))}
                    </div>
                    <LoadMoreButton getAllPokemons={getAllPokemons} />
                </div>
            </div>
            {modalVisible && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    closeModal={closeModal}
                    type={selectedPokemon?.types[0]?.type.name}
                />
            )}
        </>
    );
};

export default Pokedex;
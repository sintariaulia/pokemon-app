import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PokemonItem = () => {

    const pokemonData = [
        {
            id: "1",
            name: "Charmeleon",
            image: '/img/Charmeleon.png',
            price: " US $38"
        },
        {
            id: "2",
            name: "Totodile",
            image: '/img/totodile.png',
            price: " US $45"
        },
        {
            id: "3",
            name: "Bulbasaur",
            image: '/img/bulbasaur.png',
            price: " US $40"
        },
        {
            id: "4",
            name: "Chikorita",
            image: '/img/Chikorita.png',
            price: " US $33"
        },
        {
            id: "5",
            name: "Lapras",
            image: '/img/Lapras.png',
            price: " US $36"
        },
        {
            id: "6",
            name: "Eevee",
            image: '/img/Eevee.png',
            price: " US $34"
        },
        {
            id: "7",
            name: "Meowth",
            image: '/img/Meowth.png',
            price: " US $40"
        },
        {
            id: "8",
            name: "Wartortle",
            image: '/img/wartortle.png',
            price: " US $38"
        },
        {
            id: "10",
            name: "Blastoise",
            image: '/img/Blastoise.png',
            price: " US $38"
        },
        {
            id: "11",
            name: "Espurr",
            image: '/img/Espurr.png',
            price: " US $38"
        },
        {
            id: "12",
            name: "Goodra",
            image: '/img/Goodra.png',
            price: " US $38"
        },
        {
            id: "13",
            name: "Pancham",
            image: '/img/Pancham.png',
            price: " US $38"
        },
        {
            id: "14",
            name: "Piplup",
            image: '/img/piplup.png',
            price: " US $38"
        },
        {
            id: "15",
            name: "Shinx",
            image: '/img/Shinx.png',
            price: " US $38"
        },
    ]

    const addPokemons = (item) => {
        console.log(item)
        const myPokemonslocalstorage = localStorage.getItem('pokemonData')
        console.log(myPokemonslocalstorage)

        if (myPokemonslocalstorage) {
            const myPokemons = JSON.parse(myPokemonslocalstorage);
            const newMyPokemons = [...myPokemons, { id: item.id, name: item.name, image: item.image, price: item.price }];
            localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
        } else {
            const newMyPokemons = [{ id: item.id, name: item.name, image: item.image, price: item.price }];
            localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
        }

        toast.success("Add data, Success!!", {
            autoClose: 2500
        });

        // Cara Local Storage Kedua :
        // const myPokemons = JSON.parse(localStorage.getItem('pokemonData') || "[]");
        // const newMyPokemons = [...myPokemons, { id: item.id, name: item.name, image: item.image, price: item.price }];
        // localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));

    }

    return (
        <div className="flex flex-col justify-start px-[5rem] py-8 relative">
            <h1 className='text-3xl font-bold text-slate-700 py-3'>Pokemons</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-8 gap-4 sm:gap-10 lg:gap-10">

                {/* Looping array object */}
                {pokemonData.map(pokemon => {
                    return (
                        <div className='bg-white/75 p-4 rounded-3xl'>
                            <img src={pokemon.image} alt="" className='h-52 mx-auto' />
                            <h5 className='text-slate-700 text-base md:text-lg font-semibold py-3  text-center uppercase'>{pokemon.name}</h5>
                            <div className='text-sm md:text-base pb-2 text-left pl-3'>
                                <p className='text-slate-600'>
                                    Price
                                </p>
                                <p className='text-slate-600 font-bold'>
                                    {pokemon.price}
                                </p>
                            </div>
                            <div className='text-right pr-3'>
                                {/* The button to open modal */}
                                <label htmlFor={"modal" + pokemon.id} className="btn btn-sm border-0  bg-[#55a8a3] text-slate-700 font-medium text-sm uppercase rounded-md hover:bg-[#bfdfde]">Add</label>
                                <input type="checkbox" id={"modal" + pokemon.id} className="modal-toggle" />
                                <div className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box text-left">
                                        <h3 className="font-semibold text-slate-600 text-base">Add pokedex to My Pokemon ?</h3>
                                        <div className="modal-action">
                                            <label htmlFor={"modal" + pokemon.id} className="btn btn-sm">Cancel</label>
                                            <label htmlFor={"modal" + pokemon.id} className="btn btn-sm btn-accent" onClick={() => addPokemons(pokemon)}>Yes !</label>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ToastContainer />
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default PokemonItem
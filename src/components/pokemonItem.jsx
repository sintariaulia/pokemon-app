import React from 'react'
import { Link } from "react-router-dom";


const PokemonItem = () => {

    const pokemons = [
        {
            name: "Totodile",
            image: require("../img/totodile.png"),
            price: " US $45"
        },
        {
            name: "Bulbasaur",
            image: require("../img/bulbasaur.png"),
            price: " US $40"
        },
        {
            name: "Chikorita",
            image: require("../img/Chikorita.png"),
            price: " US $33"
        },
        {
            name: "Lapras",
            image: require("../img/Lapras.png"),
            price: " US $36"
        },
        {
            name: "Eevee",
            image: require("../img/Eevee.png"),
            price: " US $34"
        },
        {
            name: "Meowth",
            image: require("../img/Meowth.png"),
            price: " US $40"
        },
        {
            name: "Wartortle",
            image: require("../img/wartortle.png"),
            price: " US $38"
        },
        {
            name: "Charmeleon",
            image: require("../img/Charmeleon.png"),
            price: " US $38"
        },
        {
            name: "Blastoise",
            image: require("../img/Blastoise.png"),
            price: " US $38"
        },
        {
            name: "Cubone",
            image: require("../img/Cubone.png"),
            price: " US $38"
        },
        {
            name: "Espurr",
            image: require("../img/Espurr.png"),
            price: " US $38"
        },
        {
            name: "Goodra",
            image: require("../img/Goodra.png"),
            price: " US $38"
        },
        {
            name: "Pancham",
            image: require("../img/Pancham.png"),
            price: " US $38"
        },
        {
            name: "Piplup",
            image: require("../img/piplup.png"),
            price: " US $38"
        },
        {
            name: "Shinx",
            image: require("../img/Shinx.png"),
            price: " US $38"
        },
        {
            name: "Sobble",
            image: require("../img/Sobble.png"),
            price: " US $38"
        },
    ];

    return (
        <div className="flex flex-col justify-start px-[5rem] py-8 relative">
            <h1 className='text-4xl font-bold text-slate-700 py-3'>Pokemons</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:px-10 py-8 gap-4 sm:gap-10 md:gap-12 lg:gap-10">

                {/* Menampilkan detail satu Pokemon */}
                <div className='bg-white/75 p-5 rounded-[35px]'>
                    <Link to="/DetailPokemon">
                        <img src={require("../img/Charmeleon.png")} alt="" className='w-full md:w-[18rem] mx-auto py-7' />
                        <h5 className='text-slate-700 text-lg md:text-xl text-center font-bold mb-2 uppercase'>Charmeleon</h5>
                    </Link>
                    <div className='text-sm md:text-base pb-2  pl-3'>
                        <p className='text-slate-600'>
                            Price
                        </p>
                        <p className='text-slate-600 font-bold'>
                            US $33
                        </p>
                    </div>
                    <div className='text-right pr-3'>
                        <button
                            type="button"
                            className=' px-5 py-2.5 bg-[#55a8a3] text-slate-900 font-semibold text-sm uppercase rounded-xl hover:bg-[#bfdfde]'>
                            Add
                        </button>
                    </div>
                </div>

                {/* Looping array object */}
                {pokemons.map(pokemon => {
                    return (
                        <div className='bg-white/75 p-5 rounded-[35px]'>
                            <img src={pokemon.image} alt="" className='w-full md:w-[13rem] mx-auto py-7' />
                            <h5 className='text-slate-700 text-lg md:text-xl  font-bold mb-2  text-center uppercase'>{pokemon.name}</h5>
                            <div className='text-sm md:text-base pb-2 text-left pl-3'>
                                <p className='text-slate-600'>
                                    Price
                                </p>
                                <p className='text-slate-600 font-bold'>
                                    {pokemon.price}
                                </p>
                            </div>
                            <div className='text-right pr-3'>
                                <button
                                    type="button"
                                    className='px-5 py-2.5 bg-[#55a8a3] text-slate-700 font-semibold text-sm uppercase rounded-xl hover:bg-[#bfdfde]'>
                                    Add
                                </button>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default PokemonItem
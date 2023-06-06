import React, { useState, useEffect } from 'react'
import { getPokemon, getPokemonName } from '../../../../services/pokemons';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Index = () => {
    let navigate = useNavigate();
    const [pokemonData, setPokemons] = useState([]);
    // const [pokemonAdd, setPokemonAdd] = useState(null);

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        try {
            const response = await getPokemon();
            const data = response.data;

            if (response.status === 200) {
                const pokemons = data?.datas?.map(async (pokemon) => {
                    const responseDetail = await getPokemonName(pokemon?.name || "");
                    return {
                        ...responseDetail.data,
                        id: pokemon.id,
                        name: pokemon.name,
                        avatar: pokemon.avatar,
                        type: pokemon.type,
                        description: pokemon.description
                    };
                });

                const results = await Promise.all(pokemons);
                setPokemons(results);
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log(error, "error");
        }
    }


    const addPokemon = async (item) => {
        try {
            const getLocalStorageIdUserLogin = localStorage.getItem('idUser');
            const data = {
                pokemon_id: item.id,
                user_id: getLocalStorageIdUserLogin,
            };

            const existingDataDb = await axios.get('http://localhost:3001/pokemons/collection', {
                params: {
                    pokemon_id: item.id,
                    user_id: getLocalStorageIdUserLogin,
                },
            });

            if (existingDataDb.data?.datas?.find(data => data.pokemons_id === item.id)) {
                toast.error("Pokemon already exists", {
                    autoClose: 200
                })
                return;
            }
            const response = await axios.post('http://localhost:3001/pokemons/collection', data);
            toast.success("Pokemon Added", {
                autoClose: 1000
            })
            console.log('Data berhasil ditambahkan ke database:', response.data);
        } catch (error) {
            console.log('Gagal menambahkan data ke database:', error.message);
        }
    };

    // const addPokemons = async (item) => {
    //     const myPokemonslocalstorage = localStorage.getItem('pokemonData');
    //     const newPokemon = { id: item.id, name: item.name, avatar: item.avatar };

    //     if (myPokemonslocalstorage) {
    //         const myPokemons = JSON.parse(myPokemonslocalstorage);
    //         const newMyPokemons = [...myPokemons, newPokemon];
    //         localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
    //     } else {
    //         const newMyPokemons = [newPokemon];
    //         localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
    //     }

    //     toast.success("Add data, Success!!", {
    //         autoClose: 2500
    //     });
    //     setPokemonAdd(null);
    // };

    return (
        <div className="flex flex-col justify-start py-4">
            <h1 className='font-bold text-[22px] lg:text-[24px] px-14 sm:px-20 md:px-24 lg:px-32 pt-5 md:pt-8 lg:pt-10 text-slate-700'>Pokemons</h1>
            <div className="px-[68px] md:px-16 lg:px-20 xl:px-[73px] 2xl:px-48 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6 md:py-8 gap-6 sm:gap-8 md:gap-9 lg:gap-7">

                {/* Looping Data List */}
                {pokemonData.map((item, index) => {
                    // const myPokemonslocalstorage = localStorage.getItem('pokemonData');
                    // const myPokemons = JSON.parse(myPokemonslocalstorage) || [];
                    // const isAlreadyAdd = myPokemons.find(poke => poke.id === item.id) !== undefined;
                    return (
                        <div key={index} id={item?.id}
                            className='bg-white/70 p-3 rounded-3xl'>
                            <img src={item?.avatar} alt="" onClick={() => navigate(`/pokemons/${item.id}`)} className='h-52 mx-auto' />
                            <h4 className='text-slate-700 text-base md:text-lg font-semibold py-3  text-center uppercase'>{item?.name}</h4>
                            <div className='pr-20 lg:pr-[70px] 2xl:pr-24'>
                                <h6 className='text-slate-700 text-[14px] text-center rounded-2xl bg-[#c6e1df] font-normal'>{item?.type}</h6>
                            </div>
                            <div className='text-right pt-2'>
                                {/* {isAlreadyAdd ? (
                                    <span></span>
                                ) : ( */}
                                <button
                                    onClick={() => addPokemon(item)}
                                    className="btn btn-sm border-0  bg-[#55a8a3] text-slate-700 font-medium text-sm rounded-md hover:bg-[#bfdfde]">
                                    <FaPlus />
                                </button>
                                {/* )} */}

                            </div>
                            <ToastContainer />
                        </div>
                    );

                })}

                {/* <input type="checkbox" checked={pokemonAdd !== null} className="modal-toggle " />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box text-left bg-slate-800">
                        <h3 className="font-semibold text-white text-base ">Add {pokemonAdd?.name} to My Pokemon ?</h3>
                        <div className="modal-action">
                            <button className="btn btn-sm bg-slate-500" onClick={() => setPokemonAdd(null)}>Cancel</button>
                            <button className="btn btn-sm btn-accent" onClick={() => addPokemons(pokemonAdd)}>Yes !</button>

                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Index
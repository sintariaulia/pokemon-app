import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getPokemon } from '../../../../services/pokemons';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Index = () => {
    let navigate = useNavigate();
    const [pokemons, setPokemons] = useState([]);
    const [pokemonAdd, setPokemonAdd] = useState(null);
    const [addedPokemons, setAddedPokemons] = useState([]);

    const fetchPokemons = async () => {
        try {
            const getAuthToken = localStorage.getItem('authToken')
            const config = {
                headers: {
                    Authorization: `Bearer ${getAuthToken}`
                }
            };
            const response = await getPokemon(config);

            const listPokemons = response.data?.datas;
            setPokemons(listPokemons);
        } catch (error) {
            console.log(error, "error");
        }
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    const addPokemon = async (item) => {
        try {
            const getLocalStorageToken = localStorage.getItem('authToken');
            console.log('AuthToken', getLocalStorageToken);

            const config = {
                headers: {
                    Authorization: `Baerer ${getLocalStorageToken}`
                }
            };

            const parameterPayload = {
                pokemon_id: item.id,
            }

            const existingMyPokemonData = await axios.get('http://localhost:3001/pokemons/collection', {
                headers: {
                    Authorization: `Bearer ${getLocalStorageToken}`
                },
                params: {
                    pokemon_id: item.id,
                },
            });

            if (existingMyPokemonData?.data?.data?.find(datas => datas.pokemon_id === item.id)) {
                toast.error("Pokemon Already Exists", {
                    autoClose: 1500
                })
                return;
            }

            const response = await axios.post('http://localhost:3001/pokemons/collection', parameterPayload, config);
            toast.success("Pokemon Add Successfull", {
                autoClose: 1000
            });

            setAddedPokemons([...addedPokemons, item.id]);

            console.log('Data ditambahkan ke database :', response.data);

        } catch (error) {
            // console.log('Gagal menambahkan data ke database:', error.message);
        }

        setPokemonAdd(null);

    };

    return (
        <div className="flex flex-col justify-start py-4">
            <h1 className='font-bold text-[22px] lg:text-[24px] px-14 sm:px-20 md:px-24 lg:px-32 pt-5 md:pt-8 lg:pt-10 text-slate-700'>Pokemons</h1>
            <div className="px-[68px] md:px-16 lg:px-20 xl:px-[73px] 2xl:px-48 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6 md:py-8 gap-6 sm:gap-8 md:gap-9 lg:gap-7">
                {pokemons.length > 0 &&
                    pokemons.map((item, index) => {
                        const isAdded = addedPokemons.includes(item.id);

                        return (
                            <div key={index} id={item?.id}
                                className='bg-white/70 p-3 rounded-3xl'>
                                <img src={item?.avatar} alt="" onClick={() => navigate(`/pokemons/${item.id}`)} className='h-52 mx-auto' />
                                <h4 className='text-slate-700 text-base md:text-lg font-semibold py-3  text-center uppercase'>{item?.name}</h4>
                                <div className='pr-20 lg:pr-[70px] 2xl:pr-24'>
                                    <h6 className='text-slate-700 text-[14px] text-center rounded-2xl bg-[#c6e1df] font-normal'>{item?.type}</h6>
                                </div>

                                {!isAdded && (
                                    <div className='text-right pt-2'>
                                        <button
                                            onClick={() => setPokemonAdd(item)}
                                            className="btn btn-sm border-0  bg-[#55a8a3] text-slate-700 font-medium text-sm rounded-md hover:bg-[#bfdfde]">
                                            <FaPlus />
                                        </button>
                                    </div>
                                )}
                                
                                <ToastContainer />
                            </div>
                        );

                    })}

                {pokemonAdd && (
                    <div>
                        <input type="checkbox" checked={pokemonAdd !== null} className="modal-toggle " />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-left bg-slate-800">
                                <h3 className="font-semibold text-white text-base ">Add {pokemonAdd?.name} to My Pokemon ?</h3>
                                <div className="modal-action">
                                    <button className="btn btn-sm bg-slate-500" onClick={() => setPokemonAdd(null)}>Cancel</button>
                                    <button className="btn btn-sm btn-accent" onClick={() => addPokemon(pokemonAdd)}>Yes !</button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Index
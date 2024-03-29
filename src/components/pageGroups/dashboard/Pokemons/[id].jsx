import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const DetailPokemon = () => {
    const params = useParams();
    const [pokemons, setPokemons] = useState(null);
    const [pokemonAdd, setPokemonAdd] = useState(null);

    useEffect(() => {
        fetchDetailPokemon();
    }, []);

    const fetchDetailPokemon = async () => {
        try {
            const responseDetail = await axios.get(`http://localhost:3001/pokemons/${params.id}`);
            const pokemonDetail = responseDetail.data.datas;
            setPokemons(pokemonDetail);
        } catch (error) {
            console.log(error);
        }

    };

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
                autoClose: 1500
            })
            console.log('Data ditambahkan ke database :', response.data);

        } catch (error) {
            console.log('Gagal menambahkan data ke database:', error.message);
        }

        setPokemonAdd(null);

    };

    return (
        <div className='px-4 h-[900px]'>

            <div className="bg-white/60 items-center mt-10 p-6 rounded-3xl max-w-md mx-auto sm:max-w-lg md:max-w-2xl grid lg:grid-cols-2 lg:max-w-5xl xl:max-w-[70rem]">
                {/* lebar layar lg */}
                <div className="hidden lg:block mx-auto">
                    <img src={pokemons?.avatar}
                        alt="event"
                        className="w-[350px] xl:w-[400px] rounded-xl shadow-xl " />
                </div>

                <div className="lg:py-10 ">
                    <h2 className="text-[22.5px] font-bold text-slate-700 pb-4 md:text-3xl lg:text-4xl">{pokemons?.name}</h2>
                    <img src={pokemons?.avatar} alt="event"
                        className="pt- rounded-xl shadow-xl w-[250px] mx-auto sm:py-10 sm:w-[300px] lg:hidden" />
                    <h6 className='font-bold lg:text-lg pt-7 lg:pt-9 text-slate-700'>Types</h6>
                    <p className="pt-[6px] text-slate-700 font-medium text-justify sm:pt-5 md:pt-1 text-sm sm:text-base">
                        <span className='pl-5'>{pokemons?.type}</span>
                    </p>
                    <h6 className='font-bold lg:pt-6 lg:text-lg md:pt-6 pt-5 text-slate-700'>Description</h6>
                    <p className="pt-[6px] text-slate-700 px-5 text-justify sm:pt-5 md:pt-2 text-sm sm:text-base">
                        <span>{pokemons?.description}</span>
                    </p>
                    
                        <div className="text-center pt-8 pb-10 lg:pt-16 font-bold" >
                            <button
                                onClick={() => setPokemonAdd(pokemons)}
                                className="rounded-3xl bg-[#82b5b1] px-16 py-2 text-slate-800 uppercase hover:bg-[#afd1ce]" >
                                Add To My Pokemon
                            </button>
                        </div>
                    
                    <ToastContainer />
                </div>
            </div>

            <input type="checkbox" checked={pokemonAdd !== null} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-left bg-slate-800">
                    <h3 className="font-semibold text-white text-base">Add {pokemonAdd?.name} to My Pokemon ?</h3>
                    <div className="modal-action">
                        <button className="btn btn-sm bg-slate-600" onClick={() => setPokemonAdd(null)}>Cancel</button>
                        <button className="btn btn-sm btn-accent" onClick={() => addPokemon(pokemonAdd)}>Yes !</button>

                    </div>
                </div>
            </div>

        </div>
    )



}

export default DetailPokemon
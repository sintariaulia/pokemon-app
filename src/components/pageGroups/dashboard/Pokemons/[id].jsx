import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getPokemonName } from '../../../../services/pokemons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const DetailPokemon = () => {
    const params = useParams();
    const [pokemonData, setPokemons] = useState(null);
    const [pokemonAdd, setPokemonAdd] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const myPokemonslocalstorage = localStorage.getItem('pokemonData');
        if (myPokemonslocalstorage) {
            const myPokemons = JSON.parse(myPokemonslocalstorage);
            const isAlreadyAdded = myPokemons.some((item) => item.id === pokemonData?.id);
            setIsAdded(isAlreadyAdded);
        }
    }, [pokemonData]);

    useEffect(() => {
        if (params?.id) {
            fetchPokemon(params?.id);
        }
    }, [params]);

    const fetchPokemon = async (id) => {
        try {
            const payloadDetail = await getPokemonName(id);
            const result = {
                ...payloadDetail.data.datas,
                id: payloadDetail?.data?.datas?.id || "",
                name: payloadDetail?.data?.datas?.name || "",
                avatar: payloadDetail?.data?.datas?.avatar || "",
                type: payloadDetail?.data?.datas?.type || "",
                description: payloadDetail?.data?.datas?.description || ""
            };
            setPokemons(result);
        } catch (error) {
            console.log(error, "error");
        }
    };

    const addPokemons = (item) => {
        const myPokemonslocalstorage = localStorage.getItem('pokemonData')
        console.log(myPokemonslocalstorage)
        if (myPokemonslocalstorage) {
            const myPokemons = JSON.parse(myPokemonslocalstorage);
            const newMyPokemons = [...myPokemons, { id: item.id, name: item.name, avatar: item.avatar }];
            localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
        } else {
            const newMyPokemons = [{ id: item.id, name: item.name, avatar: item.avatar }];
            localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
        }
        toast.success("Add data, Success!!", {
            autoClose: 2500
        });

        setPokemonAdd(null);
    }

    return (
        <div className='px-10 h-[900px]'>

            <div className="bg-white/60 items-center mt-10 p-6 rounded-3xl max-w-md mx-auto sm:max-w-lg md:max-w-2xl grid lg:grid-cols-2 lg:max-w-5xl xl:max-w-[70rem]">
                {/* lebar layar lg */}
                <div className="hidden lg:block mx-auto">
                    <img src={pokemonData?.avatar}
                        alt="event"
                        className="w-[350px] xl:w-[400px] rounded-xl shadow-xl " />
                </div>
                <div className="lg:py-10 ">
                    <h2 className="text-[22px] font-bold text-slate-700 pb-4 md:text-3xl lg:text-4xl">{pokemonData?.name}</h2>
                    <img src={pokemonData?.avatar} alt="event"
                        className="pt-4 rounded-xl shadow-xl w-[250px] mx-auto sm:py-10 sm:w-[300px] lg:hidden" />
                    <h6 className='font-bold lg:pt-2 md:pt-6 pt-5 text-slate-700'>Types</h6>
                    <p className="pt-3 text-slate-600 text-justify sm:pt-5 md:pt-2 text-sm sm:text-base">
                        <span>{pokemonData?.type}</span>
                    </p>
                    <h6 className='font-bold lg:pt-2 md:pt-6 pt-5 text-slate-700'>Description</h6>
                    <p className="pt-3 text-slate-600 text-justify sm:pt-5 md:pt-2 text-sm sm:text-base">
                        <span>{pokemonData?.description}</span>
                    </p>
                    {isAdded ? null : (
                        <div className="text-center pt-8 font-bold" >
                            <button
                                onClick={() => setPokemonAdd(pokemonData)}
                                className="rounded-3xl bg-[#82b5b1] px-16 py-2 text-slate-800 uppercase hover:bg-[#afd1ce]" >
                                Add To My Pokemon
                            </button>
                        </div>
                    )}
                    <ToastContainer />
                </div>
            </div>

            <input type="checkbox" checked={pokemonAdd !== null} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-left bg-slate-800">
                    <h3 className="font-semibold text-white text-base">Add {pokemonAdd?.name} to My Pokemon ?</h3>
                    <div className="modal-action">
                        <button className="btn btn-sm bg-slate-600" onClick={() => setPokemonAdd(null)}>Cancel</button>
                        <button className="btn btn-sm btn-accent" onClick={() => addPokemons(pokemonAdd)}>Yes !</button>

                    </div>
                </div>
            </div>

        </div>
    )



}

export default DetailPokemon
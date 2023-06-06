import React, { useState, useEffect } from 'react'
import { FaMinus } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPokemon = () => {

    let navigate = useNavigate();
    // const [pokemonDatas, setPokemonData] = useState([]);
    // const [pokemonDelete, setPokemonDelete] = useState(null);

    const [myPokemon, setMyPokemons] = useState([]);

    const getMyPokemons = async () => {
        try {
            const response = await axios.get('http://localhost:3001/pokemons/collection');
            const mypokemonList = response.data.datas;
            setMyPokemons(mypokemonList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyPokemons();
    }, []);

    const deletePokemon = async (id) => {
        try {
            console.log("test id :", id);
            const response = await axios.delete(`http://localhost:3001/pokemons/collection/${id}`);
            console.log('response', response.data.datas);
            const updatedMyPokemons = myPokemon.filter(item => item.id !== id);
            setMyPokemons(updatedMyPokemons);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleGetPokemonData = () => {
    //     const dataFromStorage = localStorage.getItem("pokemonData");
    //     if (dataFromStorage) {
    //         setPokemonData(JSON.parse(dataFromStorage))
    //     }
    // }

    // useEffect(() => {
    //     handleGetPokemonData()
    //     return () => {

    //     }
    // }, [])

    // const deleteMyPokemon = (id) => {
    //     console.log(id);
    //     const newArray = pokemonDatas.filter(p => p.id !== id);
    //     setPokemonData([...newArray]);
    //     localStorage.setItem('pokemonData', JSON.stringify([...newArray]));

    //     toast.info("Delete data, Success!!", {
    //         autoClose: 2500
    //     });

    //     setPokemonDelete(null);
    // }

    return (
        <div className="flex flex-col justify-start py-8">
            <h1 className='text-lg md:text-[22px] lg:text-[24px] font-bold px-16 sm:px-20 md:px-24 lg:px-32 pt-5 text-slate-700'>My Pokemons</h1>
            <div className="px-14 sm:px-20 md:px-16  lg:px-32 xl:px-48 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-8 gap-4 sm:gap-7 lg:gap-8">

                {/* Data From Storage */}
                {myPokemon.map((item, index) => {
                    return (
                        <div key={index} id={item?.id}
                            className='bg-white/75 p-4 rounded-3xl'>
                            <img src={item?.avatar} alt="" onClick={() => navigate(`/pokemons/${item.pokemon_id}`)} className='h-52 mx-auto' />
                            <h4 className='text-slate-700 text-base md:text-lg font-semibold py-3  text-center uppercase'>{item?.name}</h4>
                            <div className='pr-20 lg:pr-[70px] 2xl:pr-24'>
                                <h6 className='text-slate-700 text-[14px] text-center rounded-2xl bg-[#c6e1df] font-normal'>{item?.type}</h6>
                            </div>
                            <div className='text-right'>
                                <button
                                    onClick={() => deletePokemon(item.id)}
                                    className="btn btn-sm border-0  bg-[#55a8a3] text-slate-700 font-medium text-sm uppercase rounded-md hover:bg-[#bfdfde]">
                                    <FaMinus />
                                </button>
                            </div>
                            <ToastContainer />
                        </div>
                    );
                })}

                {/* <input type="checkbox" checked={pokemonDelete !== null} className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box text-left bg-slate-800">
                        <h3 className="font-semibold text-white text-base">Delete {pokemonDelete?.name} from My pokemon ?</h3>
                        <div className="modal-action">
                            <button className="btn btn-sm bg-slate-600" onClick={() => setPokemonDelete(null)}>Cancel</button>
                            <button className="btn btn-sm btn-accent" onClick={() => deleteMyPokemon(pokemonDelete.id)}>Delete</button>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default MyPokemon
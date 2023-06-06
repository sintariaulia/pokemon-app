import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from '../services/auth';
import Hero from '../pages/hero';

import IndexPokemon from '../pages/dashboard/pokemons/index';
import MyPokemons from '../pages/dashboard/pokemons/my-pokemon';
import DetailPokemons from '../pages/dashboard/pokemons/[id]';

import Users from '../pages/dashboard/users';
import Todos from '../pages/dashboard/todos';

import SignIns from '../pages/auth/signins';
import SignUps from '../pages/auth/signups';


function IndexRouter() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Hero />}/>
            <Route path='/Todos' element={<Todos />} />
            <Route path='/Users' element={<Users />} />

            <Route path="/Pokemons" element={isLoggedIn() ? <IndexPokemon /> : <Navigate to="/Login" />} />
            <Route path="/MyPokemons" element={isLoggedIn() ? <MyPokemons /> : <Navigate to="/Login" />} />
            <Route path='/pokemons/:id' element={<DetailPokemons />} />

            <Route path="/SignIn" element={!!isLoggedIn() ? <Navigate to="/" /> : <SignIns />} />
            <Route path='/SignUp' element={<SignUps />} />
        </Routes>
    </Router>
  )
}

export default IndexRouter
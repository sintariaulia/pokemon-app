import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../services/auth";
import { FaBars, FaTimes } from "react-icons/fa";


function Header() {
    const buttonStyle = 'border-[1px] rounded-[9px] md:rounded-[10px] border-[#deedec] px-[11px] py-[4px] md:px-[20px] md:py-[7px]'
    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [click, setClick] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            setIsLogin(true);
        }
    }, []);

    function handleLogin() {
        window.location.href = "/SignIn"
    }

    function handleLogout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("idUserLogged");
        setIsLogin(false);
        window.location.href = "/SignIn"
    }

    function handleModal() {
        setModal(true);
    }

    function handleClick() {
        setClick(!click);
    }

    return (
        <div className="header bg-white/30 flex items-center justify-between px-10 sm:px-16 md:px-10 lg:px-20 py-[2px]">
            {/* logo */}
            <Link to="/">
                <img src="/img/icon.png" alt="" className="logo w-[75px] h-[60px] md:w-[85px] md:h-[70px] lg:w-[100px] lg:h-[78px] " />
            </Link>

            {/* hamburger icon for mobile navigation */}
            <div
                className="hamburger md:hidden "
                onClick={handleClick} >
                {click ? (<FaTimes size={19} className="text-slate-600"/>) : (<FaBars size={19} className="text-slate-600"/>)}
            </div>

            {/* side center menu */}
            <div className={`menu flex md:block ${click ? "flex" : "hidden"}`}>
                <ul className="flex flex-col md:flex-row justify-between text-slate-800 font-semibold md:items-center w-full">
                    <li className="my-5 md:my-0 md:mr-5 text-slate-700 hover:text-white">
                        <Link to="/" onClick={() => setClick(false)}>Home</Link>
                    </li>

                    {isLoggedIn() && (
                        <>
                            <li className="my-5 md:my-0 md:mr-5 text-slate-700 hover:text-white">
                                <Link to="/Pokemons" onClick={() => setClick(false)}>Pokemons</Link>
                            </li>
                            <li className="my-5 md:my-0 md:mr-5 text-slate-700 hover:text-white">
                                <Link to="/MyPokemons" onClick={() => setClick(false)}>My Pokemons</Link>
                            </li>
                        </>
                    )}

                    <li className="my-5 md:my-0 md:mr-5 text-slate-700 hover:text-white">
                        <Link to="/Todos" onClick={() => setClick(false)}>Todo</Link>
                    </li>
                    <li className="my-5 md:my-0 md:mr-10 text-slate-700 hover:text-white">
                        <Link to="/Users" onClick={() => setClick(false)}>User</Link>
                    </li>

                    {/* button Login : Logout */}
                    <li className="buttons lg:pl-[100px] xl:pl-[200px] 2xl:pl-96 text-slate-700 font-medium text-[14.5px] ">
                        <button
                            onClick={isLogin ? handleModal : handleLogin}
                            className={buttonStyle + ` mr-2 hover:bg-[#deedec]`}>
                            {isLogin ? 'Logout' : 'Sign In'}
                        </button>

                        {modal && (
                            <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
                                <input type="checkbox" id="my-modal" className="modal-toggle" checked={modal} />
                                <div className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box text-left bg-slate-800">
                                        <p className="text-sm text-red-500 py-2">Logout Confirmation</p>
                                        <h3 className="font-semibold text-white text-base ">Are you sure to Logout ?</h3>
                                        <div className="modal-action">
                                            <button className="btn btn-sm bg-slate-500" onClick={() => setModal(false)}>Cancel</button>
                                            <button className="btn btn-sm bg-red-600" onClick={handleLogout}>Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>

                </ul>

            </div>

        </div>

    )
}

export default Header
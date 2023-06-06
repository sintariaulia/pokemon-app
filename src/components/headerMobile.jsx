import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from "../services/auth";

const HeaderMobile = ({ open, toggelMenu }) => {

    const buttonStyle = 'border-[2px] rounded-full bg-[#b1ced8] font-bold hover:bg-[#deedec] border-[#deedec] px-10 py-2'
    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            setIsLogin(true);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = "/SignIn"
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("idUserLogged");
        setIsLogin(false);
        window.location.href = "/SignIn"
    }

    const handleModal = () => {
        setModal(true);
    }

    return (
        <ul className={`md:hidden flex flex-col bg-[#d5e6e7] text-lg text-slate-700 font-semibold absolute w-full h-full bottom-0 py-24 pl-14 duration-500 ${open ? 'left-0' : 'left-[-100%]'}`}>
            <li className='py-5 px-3 inline-block hover:text-white'>
                <Link to="/" className=''>
                    Home
                </Link>
            </li>

            {isLoggedIn() && (
                <>
                    <li className='py-5 px-3 inline-block hover:text-white'>
                        <Link to="/Pokemons">
                            Pokemons
                        </Link>
                    </li>
                    <li className='py-5 px-3 inline-block hover:text-white'>
                        <Link to="/MyPokemons">
                            My Pokemons
                        </Link>
                    </li>
                </>
            )}

            <li className='py-5 px-3 inline-block hover:text-white'>
                <Link to="/Todos">
                    Todo
                </Link>
            </li>
            <li className='py-5 px-3 inline-block hover:text-white'>
                <Link to="/Users">
                    User
                </Link>
            </li>

            <div className='pt-5'>
                <button
                    onClick={isLogin ? handleModal : handleLogin}
                    className={buttonStyle}>
                    {isLogin ? 'Logout' : 'Sign In'}
                </button>

                {modal && (
                    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
                        <input type="checkbox" id="my-modal" className="modal-toggle" checked={modal} />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-left bg-slate-800">
                                <p className="text-[14.5px] text-red-500 pt-2">Logout Confirmation</p>
                                <h3 className="font-semibold text-white text-[17px] ">Are you sure to Logout ?</h3>
                                <div className="modal-action">
                                    <button className="btn btn-sm bg-slate-500 text-[15.5px] " onClick={() => setModal(false)}>Cancel</button>
                                    <button className="btn btn-sm bg-red-600 text-[15.5px]" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </ul>

    )
}

export default HeaderMobile
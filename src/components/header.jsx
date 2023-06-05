import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from "../services/auth";
import HeaderMobile from './headerMobile';

const Header = () => {

    const buttonStyle = 'border-[2px] rounded-full bg-[#b1ced8] hover:bg-[#deedec] border-[#deedec] px-[30px] py-[8px]'
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    }

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

    return (
        <nav className='bg-white/40'>
            <div className='flex items-center font-medium justify-around'>
                <div className='z-50 p-2 md:w-auto w-full flex justify-between'>
                    <Link to="/">
                        <img src="/img/icon.png" alt="logoIcon" className='md:cursor-pointer mx-5 w-[75px] h-[60px] md:w-[85px] md:h-[70px] lg:w-[100px] lg:h-[78px]' />
                    </Link>
                    <div className='block md:hidden m-3 px-5 text-slate-700 text-[26px]' onClick={toggleMenu}>
                        <ion-icon name={`${open ? 'close-circle' : 'menu'}`}></ion-icon>
                    </div>
                </div>


                <ul className='md:flex hidden items-center gap-8 text-slate-700 font-semibold '>
                    <li className='py-7 px-3 inline-block hover:text-white'>
                        <Link to="/" className=''>
                            Home
                        </Link>
                    </li>

                    {isLoggedIn() && (
                        <>
                            <li className='py-7 px-3 inline-block hover:text-white'>
                                <Link to="/Pokemons">
                                    Pokemons
                                </Link>
                            </li>
                            <li className='py-7 px-3 inline-block hover:text-white'>
                                <Link to="/MyPokemons">
                                    My Pokemons
                                </Link>
                            </li>
                        </>
                    )}

                    <li className='py-7 px-3 inline-block hover:text-white'>
                        <Link to="/Todos">
                            Todo
                        </Link>
                    </li>
                    <li className='py-7 px-3 inline-block hover:text-white'>
                        <Link to="/Users">
                            User
                        </Link>
                    </li>
                </ul>


                <div className='md:block hidden text-slate-700 font-semibold'>
                    <button
                        onClick={isLogin ? handleModal : handleLogin}
                        className={buttonStyle}>
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
                </div>

                {/* Mobile Progresive Navbar */}
                <HeaderMobile open={open} toggleMenu={toggleMenu} />

            </div>
        </nav>
    )
}

export default Header
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { getSignIn } from '../../../services/auth/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getSignIn(email, password);
            const token = response.data?.token;
            if (token) {
                localStorage.setItem("authToken", token);
                localStorage.setItem("idUser", response.data?.id);
                localStorage.removeItem("authTokenRegister");
                window.location.href = "/";
            } else {
                toast.error("Your Account Is Not Valid", {
                    autoClose: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // screen
        <div className='flex w-full px-5 md:px-2 lg:w-full h-screen  items-center justify-center'>
            {/* screen dalam */}
            <div className=' flex bg-white/50 py-3 md:py-20 rounded-3xl '>
                {/* form login */}
                <div className=' pl-[70px] md:pr-10'>
                    <h1 className='text-2xl md:text-3xl font-extrabold text-center py-5 text-slate-600'>SIGN IN</h1>
                    <img src="/img/icon3.jpg" alt="" className='md:hidden rounded-xl py-5' />

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='text-[14.7px] font-medium text-slate-600'>Email</label>
                            <input value={email} onChange={handleEmailChange}
                                type='email' id='email' name='email'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='emailaddres@gmail.com' />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='password' className='text-[14.7px] font-medium text-slate-600'>Password</label>
                            <input value={password} onChange={handlePasswordChange}
                                type='password' id='password' name='password'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='********' />
                        </div>
                        <button className='pt-2 xl:pl-40 font-medium text-[12.5px] text-[#70928e] hover:text-[#5f6060]'>Forgot Password</button>

                        {/* BUTTON */}
                        <div className='flex flex-col gap-y-4 py-10'>
                            <button type='submit'
                                className="bg-[#b1ced8] rounded-2xl text-[16px]  py-[5px] mr-2 hover:bg-[#acc0be] text-slate-600 font-semibold" >
                                Sign In
                            </button>
                            <Link to="/SignUp">
                                <button className='btn-link font-semibold text-sm text-[#83a9a5] hover:text-[#5f6060]'>
                                    Don't have an account ?
                                    <span className='font-extrabold'> Sign Up</span>
                                </button>
                            </Link>

                        </div>
                    </form>
                    <ToastContainer />
                </div>

                {/* img login */}
                <div className='px-10 flex items-center'>
                    <img src="/img/icon3.jpg" alt="" className='hidden md:block rounded-2xl md:w-[43rem]' />

                </div>

            </div>
            {/* screen dalam */}
        </div>
    )
}

export default SignIn
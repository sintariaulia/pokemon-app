import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { getSignUp } from '../../../services/auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const buttonStyle = 'bg-[#b1ced8] rounded-2xl  py-1'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await getSignUp(name, email, password);
            localStorage.setItem("authTokenRegister", true);
            navigate("/SignIn");
            toast.success("Register Account Succefully!", {
                autoClose: 1500
            });
        } catch (error) {
            toast.error("Please add a valid data", {
                autoClose: 1500
            });
        }

    }

    return (
        // screen
        <div className='flex w-full px-5 md:px-2 lg:w-full h-screen  items-center justify-center'>
            {/* screen dalam */}
            <div className=' flex bg-white/50 py-3 md:py-20 rounded-3xl '>
                {/* form login */}
                <div className='pl-[70px] md:pr-10'>
                    <h1 className='text-2xl md:text-3xl font-extrabold text-center py-5 text-slate-600'>SIGN UP</h1>
                    <img src="/img/icon3.jpg" alt="" className='md:hidden rounded-xl py-5' />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name' className='text-[14.7px] font-medium text-slate-600'>Full Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)}
                                type='name' id='name'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='username' />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='email' className='text-[14.7px] font-medium text-slate-600'>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                type='email' id='email' name='email'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='emailaddres@gmail.com' />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='password' className='text-[14.7px] font-medium text-slate-600'>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                type='password' id='password' name='password'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='**********' />
                        </div>

                        {/* BUTTON */}
                        <div className='flex flex-col gap-y-4 py-10'>
                            <button className={buttonStyle + ` mr-2 hover:bg-[#deedec] text-slate-600 text-[16px] font-semibold`}>Sign Up</button>
                            <Link to="/SignIn">
                                <button className='btn-link font-semibold text-sm text-[#83a9a5] hover:text-[#5f6060]'>Alredy have an account? <span className='font-extrabold'>Sign in</span> here</button>
                            </Link>
                        </div>

                    </form>
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

export default SignUp
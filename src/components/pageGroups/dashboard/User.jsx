import React, { useState, useEffect} from 'react'
import { getUsers } from '../../../services/users'

const User = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUsers();
            setUser(userData);
        };

        fetchData();
    }, []);

    const arrUser = user.map((data) => {
        return (
            <div key={data.id} className='flex flex-col text-base text-slate-700 items-center'>
                <p className='pb-1 font-semibold'>
                    {data?.first_name} {data?.last_name}
                </p>
                <img alt='' key={data?.avatar} src={data?.avatar} className='rounded-full' />
                <p className='pt-2'>{data?.email}</p>
            </div>
        );
    });

    return (
        <div>
            <div className='px-12 py-10 sm:px-3 md:p-16'>
                <div className='bg-white/30  rounded-3xl max-w-md mx-auto  sm:max-w-lg md:max-w-3xl lg:max-w-5xl'>
                    <h1 className='text-[26px] md:text-3xl lg:text-4xl font-extrabold text-center text-slate-600 py-8 lg:py-10'>Users</h1>
                    <div>
                        <div className='text-slate-600  grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-10 pb-12 lg:pb-24 px-10 xl:px-20'>
                            {arrUser}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User
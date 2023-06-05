import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/header'

const IndexUser = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2')
            .then(response => {
                setUser(response.data.data)
            }).catch(error => console.log(error))
    }, [])

    const arrUser = user.map((data) => {
        return (
            <div key={data.id} className='flex flex-col items-center'>
                <p className='pb-1 font-semibold' >
                    {data?.first_name} {data?.last_name}
                </p>
                <img alt='' key={data?.avatar} src={data?.avatar} />
                <p className='pt-2'>{data?.email}</p>
            </div>

        );
    })

    return (
        <div>
            <Header />
            <div className='px-12 py-10 sm:px-3 md:p-16'>
                <div className='bg-white/30  rounded-3xl max-w-md mx-auto  sm:max-w-lg md:max-w-3xl lg:max-w-5xl'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-slate-600 py-8 lg:py-10'>Users</h1>
                    <div >
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-12 lg:pb-24 px-10 xl:px-20'>
                            {arrUser}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default IndexUser
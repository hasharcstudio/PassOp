import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 py-2 shadow-md shadow-purple-200 text-white flex justify-center items-center gap-2'>
            <div className='logo font-bold text-2xl'>
                <span className='text-green-700'> &lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
            <div className='text-center flex items-center gap-2'>
                Created by <img className='w-5 mx-auto' src="/icons/heart.png" alt="heart" /> Sajjad Hossain
            </div>
        </div>
    )
}

export default Footer

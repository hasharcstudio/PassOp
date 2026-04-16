import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 py-2 shadow-md shadow-purple-200 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-2 h-14">
        <div className='logo font-bold text-2xl'>
          <img className='inline-block w-10 h-10 mr-2' src="/icons/PassOP Logo.png" alt="PassOP Logo" />
          <span className='text-green-700'> &lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
          </div>
        <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul>
        <div>
          <button className='flex items-center gap-2 bg-green-700 px-3 py-1 rounded-full hover:bg-green-800 transition-colors duration-300 cursor-pointer font-bold ring-amber-100 ring-1'>
          <img className='w-12' src="/icons/GithubP.png" alt="GitHub logo" />
          <span>GitHub</span>
          </button>
        </div>
      </div>

    </nav>
  )
}

export default Navbar

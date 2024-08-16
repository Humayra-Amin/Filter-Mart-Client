import React from 'react';
import logo from '../../assets/images/logo.png'

const Navbar = () => {
    return (
        <div className='mx-auto'>
            <div className="navbar bg-blue-200 h-24">
                <div className="navbar-start">
                        <img src={logo} alt="" className='h-20 ml-20'/>
                </div>
                
                <div className="navbar-end">
                    <button className='btn bg-blue-400 font-bold mr-20 text-white border-blue-400 hover:bg-blue-500'>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import React from 'react';
import logo from '../../assets/images/logo.png'
import useAuth from '../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const { logout, user } = useAuth();

    const links = <>
    {!user && <li><NavLink to="/register" className={({ isActive }) =>
        isActive ? 'text-black border-2 border-blue-500 bg-white hover:bg-blue-200' : 'hover:bg-gray-200'}>Register</NavLink></li>}
</>

    return (
        <div className='mx-auto'>
            <div className="navbar bg-blue-200 h-24">
                <div className="navbar-start">
                        <img src={logo} alt="" className='h-20 ml-20'/>
                </div>
                <div className="navbar-end">
                    {/* <button className='btn bg-blue-400 font-bold mr-20 text-white border-blue-400 hover:bg-blue-500'>LOGIN</button> */}
                    <div className="flex-none gap-2">
                    {
                        user?.email ? <div className="dropdown dropdown-end ml-44">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-[-150px] lg:ml-[0px] md:ml-[0px]">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/BV0NHW2/pics.jpg"} />
                                </div>
                            </div>

                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-start">

                                <li>
                                    <button className="btn btn-sm btn-ghost">{user?.displayName || 'Not found'}</button>
                                </li>

                                <li>
                                    <button onClick={logout} className="btn btn-sm btn-ghost">LOGOUT</button>
                                </li>

                            </ul>

                        </div>
                            :
                            <Link to="/login" className="form-control">
                                <button className="btn bg-blue-400 border border-blue-700 text-white mr-20 hover:bg-blue-500 hover:text-white hover:border-blue-500 ml-[20px] lg:ml-[0px] md:ml-[0px]">LOGIN</button>
                            </Link>
                    }

                </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
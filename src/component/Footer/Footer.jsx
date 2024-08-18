import React from 'react';
import logo from '../../assets/images/logo.png'
import { FaFacebook, FaInstagram,FaGoogle } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center bg-blue-300 text-primary-content p-10 mt-8">
                <aside>
                <img src={logo} className='h-20'/>

                    <p className="font-bold text-black leading-9">
                        Filter Mart Ltd.
                        <br />
                        Providing reliable Products
                    </p>
                    
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a className='border bg-blue-500 p-2 rounded-lg border-blue-500 text-2xl hover:cursor-pointer'><FaFacebook></FaFacebook></a>
                        <a className='border bg-blue-500 p-2 rounded-lg border-blue-500 text-2xl hover:cursor-pointer'><FaGoogle></FaGoogle></a>
                        <a className='border bg-blue-500 p-2 rounded-lg border-blue-500 text-2xl hover:cursor-pointer'><FaInstagram></FaInstagram></a>
                    </div>
                </nav>

                <div>
                <p className='text-black'>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
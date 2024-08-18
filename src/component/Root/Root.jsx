import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AuthProvider from '../AuthProvider/AuthProvider';
import ProductList from '../ProductList/ProductList';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AuthProvider></AuthProvider>
            <ProductList></ProductList>
            <Footer></Footer>
        </div>
    );
};

export default Root;
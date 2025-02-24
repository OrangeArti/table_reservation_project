import React from 'react';
import logo from '../assets/logo.svg';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Little Lemon Logo" />
            <h1>Little Lemon</h1>
        </header>
    );
};

export default Header;
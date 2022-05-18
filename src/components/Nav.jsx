import React from 'react';

const Nav = ({ score }) => {
    return (
        <nav>
            <div className="nav__container">
                <h1 className='nav__title'>Worlde</h1>
                <h1>Score: {score}</h1>
            </div>
        </nav>
    );
}

export default Nav;

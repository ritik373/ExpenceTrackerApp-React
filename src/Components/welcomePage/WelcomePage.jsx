import React from 'react';
import { Link } from 'react-router-dom';
import './welcomepage.css';

function WelcomePage(props) {
    return (
        <div className='welcomepage'>
        <h4>Welcome to Expence Tracker APP</h4>
        <p className='completeProfile'>Your Profile is incomplete <Link to="/profile"> Complete Now </Link></p>
            
        </div>
    );
}

export default WelcomePage;
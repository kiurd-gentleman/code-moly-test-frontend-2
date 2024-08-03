// src/components/Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/jobs">Jobs</Link>
            <Link to="/companies">Companies</Link>
        </nav>
    );
}

export default Navigation;

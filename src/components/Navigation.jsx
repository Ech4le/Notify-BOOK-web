import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    padding: 1em;
    background: #f5f4f0;

    @media (max-width: 700px) {
        padding-top: 64px;
    }

    @media (min-width: 700px) {
        position: fixed;
        width: 220px;
        height: calc(100% - 64px);
        overflow-y: scroll;
    }
`;

const NavList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 2;
    a {
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1em;
        color: #333;
    }
    
    a:visited {
        color: #333;
    }

    a:hover,
    a:focus {
        color: #0077cc;
    }
`;

const Navigation = () => {
    return(
        <Nav>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <NavList>
                <li>
                    <span aria-hidden="true" role="img">   
                        <i className="fa fa-home"></i>
                    </span>
                    <Link to="/"> Strona główna</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">   
                        <i className="fa fa-book"></i>
                    </span>
                    <Link to="/mynotes"> Moje notatki</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">   
                        <i className="fa fa-star"></i>
                    </span>
                    <Link to="/favorites"> Ulubione</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">  
                        <i className="fa fa-comment"></i>
                    </span>  
                    <Link to="/new"> Nowa</Link>
                </li>
            </NavList>
        </Nav>
    );
};

export default Navigation;
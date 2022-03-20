import React, { Component } from 'react';
import faceMasks from './assets/masks.png'; 
import wall_decor from './assets/wall_decor.png'; 
import gift from './assets/gift.png'; 
import garden from './assets/garden.png'; 
import self_care from './assets/self_care.png'; 
import craft from './assets/craft.png';
import {Navbar, Nav, NavItem, NavLink} from 'react-bootstrap';

class PinkBox extends Component {
    render() {
        return (
            <div>
                <div className='blue-box'>
                Find things you'll love. Support independent sellers. Only on Etsy.
                <br/><br/>               
                <Nav.Link to="/products">
                    <a classname="img_links" href='' className="faceMasks">
                        <img className="faceMasks" src={faceMasks} alt=""/>
                    </a>
                    
                </Nav.Link>  &emsp;
                <Nav.Link to="/products">
                    <a href='' className="wall_decor">
                        <img className="wall_decor" src={wall_decor} alt=""/> 
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="gift">
                        <img className="gift" src={gift} alt=""/> 
                       
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="garden">
                        <img className="garden" src={garden} alt=""/> 
                       
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="self_care">
                        <img className="self_care" src={self_care} alt=""/>
                        
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="craft">
                        <img className="craft" src={craft} alt=""/> 
                       
                    </a>
                </Nav.Link>&emsp;
                </div>
                
            </div>
        );
    }
}

export default PinkBox;
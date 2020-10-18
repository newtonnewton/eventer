import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function NavBar({setFormOpen}) {
    const {authenticated} = useSelector(state => state.auth);

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="log" 
                    style={{marginRight: 15}} />
                    Eventer
                </Menu.Item>

                <Menu.Item as={NavLink} to='/events' name='Events' />
                <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
                {authenticated && 
                <Menu.Item as={NavLink} to='/createEvent'>
                    {/* <Button onClick={() => setFormOpen(true)} 
                    positive inverted content='Create Event' /> */}
                    <Button positive inverted content='Create Event' />
                </Menu.Item>}
                { authenticated 
                ? <SignedInMenu  /> 
                : <SignedOutMenu /> }
            </Container>
        </Menu>
    )
}
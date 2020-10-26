import React from 'react';
import { Button } from 'semantic-ui-react';

export default function SocialLogin() {
    return (
        <>
            <Button icon='facebook' fluid color='facebook' 
            style={{marginBottom: 10}} content='Login in with Facebook' />
            <Button icon='google' fluid color='google plus' 
            style={{marginBottom: 10}} content='Login in with Google' />
        </>
    )
}
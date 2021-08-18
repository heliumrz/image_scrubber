import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
//import { Grid, Header, Menu } from 'semantic-ui-react'

import '@aws-amplify/ui/dist/style.css';
import {S3Album} from "aws-amplify-react";

Amplify.configure(aws_exports);

export function ListPhoto() {
    return (
        <div className="App">
            <S3Album path="" picker />

        </div>
    );
}

export default withAuthenticator(ListPhoto);
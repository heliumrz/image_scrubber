import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import { API, Storage, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
Amplify.configure(aws_exports);

class ImageOutput extends React.Component {
    state = {
        files: []
    }
    onChange(e) {
        const file = e.target.files[0]
        Storage.put(file.name, file)
            .then (() => this.listFiles())
            .catch(err => console.log(err));
    }

    listFiles = async () => {
        const files = await Storage.list('imageOutput')
        let signedFiles = files.map(f => Storage.get(f.key))
        signedFiles = await Promise.all(signedFiles)
        console.log('signedFiles: ', signedFiles)
        this.setState({ files: signedFiles })
    }

    render() {
        return (
            <div>
                <h2>Output Image Album</h2>
                <input
                    type="file" accept='image/png'
                    onChange={(e) => this.onChange(e)}
                />
                <button onClick={this.listFiles}>
                    List Files
                </button>
                <Link to="/"><button>
                    Home Page
                </button>
                </Link>
                <div>
                    {
                        this.state.files.map((file, i) => (
                            <img
                                key={i}
                                src={file}
                                style={{height: 300}}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default ImageOutput;
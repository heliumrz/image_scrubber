import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import { API, Storage, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import {Link} from "react-router-dom";
import {SplitPane} from 'react-multi-split-pane';
import ScrollArea from "react-scrollbar";
Amplify.configure(aws_exports);

class ImageOutput extends React.Component {
    state = {
        files: [],
        inputFiles: []
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

    listInputFiles = async () => {
        const files = await Storage.list('input')
        let signedFiles = files.map(f => Storage.get(f.key))
        signedFiles = await Promise.all(signedFiles)
        console.log('signedFiles: ', signedFiles)
        this.setState({ inputFiles: signedFiles })
    }

    uploadImage = () => {
        Storage.put(`imageOutput/${this.upload.files[0].name}`,
            this.upload.files[0],
            { contentType: this.upload.files[0].type })
            .then(result => {
                this.upload = null;
                this.setState({ response: "Success uploading file!" });
            })
            .catch(err => {
                this.setState({ response: `Cannot uploading file: ${err}` });
            });
    };

    render() {
        return (
            <SplitPane split="horizontal" minSize={400}>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    vertical={true}
                >
                <div>

                    <h2>Input Image Album</h2>
                    <button onClick={this.listInputFiles}>
                        List Files
                    </button>
                    <Link to="/"><button>
                        Home Page
                    </button>
                    </Link>
                    <div>
                        {
                            this.state.inputFiles.map((file, i) => (
                                <img
                                    key={i}
                                    src={file}
                                    style={{height: 300}}
                                />
                            ))
                        }
                    </div>
                </div>
                </ScrollArea>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    vertical={true}
                >
                <div>
                    <h2>Output Image Album</h2>
                    <input
                        type="file"
                        accept="image/png"
                        ref={ref => (this.upload = ref)}
                        onChange={e =>this.uploadImage()}
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
                </ScrollArea>
            </SplitPane>
        )
    }
}

export default ImageOutput;
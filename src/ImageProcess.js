import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import { API, Storage, Auth } from 'aws-amplify';
import { v4 as uuid } from 'uuid'
import aws_exports from './aws-exports';
import {Link} from "react-router-dom";
Amplify.configure(aws_exports);

function ImageProcess() {
    const [images, setImages] = useState([])
    useEffect(() => {
        fetchImages()
    }, [])

    async function fetchImages() {
        // Fetch list of images from S3
        let s3images = await Storage.list('')
        // Get presigned URL for S3 images to display images in app
        s3images = await Promise.all(s3images.map(async image => {
            const signedImage = await Storage.get(image.key)
            return signedImage
        }))
        setImages(s3images)
    }

    function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        // upload the image then fetch and rerender images
        Storage.put(uuid(), file).then(() => fetchImages())
    }

    return (
        <>
            <div>
                <h1>Image Processing</h1>
                <span>Upload new image and process</span>
                <input
                    type="file"
                    accept='image/png'
                    onChange={onChange}
                />
                <Link to="/"><button>
                    Home Page
                </button>
                </Link>
                <>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {images.map(image => <img src={image} style={{width: 300, marginBottom: 10}}/>)}
                    </div>
                </>
            </div>
        </>
    );
}

export default withAuthenticator(ImageProcess);
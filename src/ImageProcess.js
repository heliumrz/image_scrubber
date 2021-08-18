import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify, { API, Storage} from 'aws-amplify';
import { v4 as uuid } from 'uuid'
import aws_exports from './aws-exports';
import {Link} from "react-router-dom";
Amplify.configure(aws_exports);

Amplify.configure({
    // Add in our new API, "name" can be whatever we want
    API: {
        endpoints: [
            {
                name: "ScrubAnalyzeImage",
                endpoint:
                    "https://asz8cwoba9.execute-api.us-east-2.amazonaws.com/test/",
            },
        ],
    },
});

function ImageProcess() {
    const [images, setImages] = useState([]);
    const [apiData, setApiData] = React.useState("");
    let upload = useRef(null);

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

    const handleClick = async () => {
        const response = await API.get("ScrubAnalyzeImage", "/image", {
            headers: {},
            response: true
        });
        alert("Your image is being processed!");
    };

    function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        // upload the image then fetch and rerender images
        Storage.put(uuid(), file).then(() => { alert("Your image is being processed!");} );
    }

    async function listFiles() {
        const files = await Storage.list('')
        let signedFiles = files.map(f => Storage.get(f.key))
        signedFiles = await Promise.all(signedFiles)
        console.log('signedFiles: ', signedFiles)
    }

    async function removeImages() {
        // Fetch list of images from S3
        let s3images = await Storage.list('')
        // Get presigned URL for S3 images to display images in app
        await Promise.all(s3images.map(async image => {
            const signedImage = await Storage.get(image.key)
            console.log(signedImage);
            if (image.type !== "Folder") {
                await Storage.remove(image.key);
            }
        }))
    }

    return (
        <>
            <div>
                <h1>Image Processing</h1>
                <span>Upload new image and process</span>
                <input
                    type="file"
                    accept='image/png'
                    ref={upload}
                    onChange={onChange}
                />
                <button onClick={fetchImages}>
                    List Files
                </button>
                <Link to="/"><button>
                    Home Page
                </button>
                </Link>
                <button onClick={removeImages}> Remove Images </button>
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
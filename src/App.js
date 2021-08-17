import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

function App() {
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
    Storage.put(uuid(), file).then (() => fetchImages())
  }

  return (
      <div>
        <h1>Photo Album</h1>
        <span>Add new image</span>
        <input
            type="file"
            accept='image/png'
            onChange={onChange}
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} />) }
        </div>
      </div>
  );
}

export default withAuthenticator(App);
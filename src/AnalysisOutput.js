import React from 'react';
import { Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {Link} from "react-router-dom";

class AnalysisOutput extends React.Component {
    state = {
        files: [],
        file: ""
    }
    componentDidMount() {
        this.listFiles()
    }
    onChange(e) {
        const file = e.target.files[0]
        Storage.put(file.name, file)
            .then (() => this.listFiles())
            .catch(err => console.log(err));
    }

    listFiles = async () => {
        const files = await Storage.list('analyzeOutput')
        this.setState({ files })
    }

    selectFile = async file => {
        const signed = await Storage.get(file.key)
        this.setState({ file: signed })
    }

    render() {
        return (
            <div>
                <input
                    type="file" accept='JSON'
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
                            <p onClick={() => this.selectFile(file)}>{file.key}</p>
                        ))
                    }
                </div>
                {
                    this.state.file && (
                        <img
                            src={this.state.file}
                            style={{width: 300}}
                        />
                    )
                }
            </div>
        )
    }
}

//     const [images, setImages] = useState([])
//     useEffect(() => {
//         fetchImages()
//     }, [])
//     async function fetchImages() {
//         // Fetch list of images from S3
//         let s3images = await Storage.list('imageOutput')
//         // Get presigned URL for S3 images to display images in app
//         s3images = await Promise.all(s3images.map(async image => {
//             const signedImage = await Storage.get(image.key)
//             return signedImage
//         }))
//         setImages(s3images)
//     }
//
//     return (
//         <div>
//             <h1>Output Photo Album</h1>
//             <div style={{display: 'flex', flexDirection: 'row'}}>
//                 { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} />) }
//             </div>
//         </div>
//     );
// }

export default withAuthenticator(AnalysisOutput);
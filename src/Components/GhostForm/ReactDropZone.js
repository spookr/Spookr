// import React, { Component } from 'react';
// import axios from 'axios';
// import { v4 as randomString } from 'uuid';
// import Dropzone from 'react-dropzone';

// class ReactDropzone extends Component {
//     constructor() {
//         super();
//         this.state = {
//             isUploading: false,
//             picture_name: '',
//             picture_description: ''
//         };
//     }

//     // console.log stuffs
//     onDrop = ([file]) => {
//         this.setState({ isUploading: true });
//         const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
//         axios.get('/api/upload', {
//             params: { 'file-name': fileName, 'file-type': file.type, },
//         }).then(response => {
//             const { signedRequest, url } = response.data;
//             this.uploadFile(file, signedRequest, url);
//         }).catch(err => {
//             console.log(err);
//         });
//     };

//     uploadFile = (file, signedRequest, url) => {
//         const options = {
//             headers: {
//                 'Content-Type': file.type,
//             },
//         };
//         axios.put(signedRequest, file, options).then(response => {
//             this.setState({ isUploading: false, url });
//             const { picture_name } = this.state
//             const { picture_description } = this.state
//             axios.post(`/api/upload`, { url, picture_name, picture_description })
//         })
//     };


//     render() {
//         const { url, isUploading } = this.state;
//         return (
//             <div className='dropzone-div'>

//                 <Dropzone
//                     className='upload-dropzone'
//                     style={{height: 100, width: 120, border: 3}}
//                     onDropAccepted={this.onDrop}
//                     accept="image/*"
//                     multiple={false}
//                 >
//                     {() => {
//                         return (
//                             <div>
//                                 <p>Drop File or Click Here</p>
//                             </div>
//                         )
//                     }}
//                 </Dropzone>
//                 <div className='uploaded-img'>
//                     <img src={url} alt="" />
//                 </div>
//             </div>

//         );
//     }
// }

// export default ReactDropzone;
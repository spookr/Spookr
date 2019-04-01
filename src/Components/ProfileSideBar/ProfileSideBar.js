import React, { Component } from 'react';
import axios from 'axios';

const dummyData = {
    name: 'Savannah',
    profile_pic: 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/10/ghost-796x498.jpg',
    entity: 'demon',
    bio: "I am savannah"
}
class ProfileSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            name: '',
            profile_pic: '',
            entity: '',
            bio: ''
        }
    }
    
    componentDidMount(){
        this.getUser()
    }

    getUser = () => {
        axios.get('/getConversationGhost')
        .then(res => {
            this.setState({user: res.data})
        })
    }

    render() {
        return (
            <div className="ConversationProfile">
                <div>
                <image src='https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/10/ghost-796x498.jpg'/>                    
                </div>
                <div>
                    <h1>{dummyData.name}</h1>
                    <h2>{dummyData.entity}</h2>
                </div>
                <p>{dummyData.bio}</p>

            </div>
        )
    }
}
export default ProfileSideBar
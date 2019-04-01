import React, { Component } from 'react';

class ProfileSideBar extends Component {
    render() {
        return (
            <div className="ConversationProfile">
                <div style={{ height: 400}}>
                    <div>
                        <img src={this.props.user.profile_pic} style={{ width:350, height: 300 }} />
                    </div>
                    <div >
                        <h1 style={{ paddingLeft: '20px', fontWeight: 'bold', fontSize: 22 }}>{this.props.user.name}</h1>
                        <h2 style={{ paddingLeft: '20px', color: 'grey' }}>{this.props.user.entity}</h2>
                    </div>
                </div>
                <hr/>
                <p style={{color: 'grey', paddingLeft: '20px'}}>{this.props.user.bio}</p>
            </div>
        )
    }
}
export default ProfileSideBar
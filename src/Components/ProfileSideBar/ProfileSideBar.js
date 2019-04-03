import React from 'react';

const ProfileSideBar = (props) => {
    return (
        <div className="ProfileSideBar" >
            <div style={{ height: 400 }}>
                <div>
                    <img src={props.user.profile_pic} style={{ width: 350, height: 300 }} />
                </div>
                <div >
                    <h1 style={{ paddingLeft: '20px', fontWeight: 'bold', fontSize: 22 }}>{props.user.name}</h1>
                    <h2 style={{ paddingLeft: '20px', color: 'grey' }}>{props.user.entity}</h2>
                </div>
            </div>
            <hr />
            <p style={{ color: 'grey', paddingLeft: '20px' }}>{props.user.bio}</p>
        </div>
    )
}

export default ProfileSideBar

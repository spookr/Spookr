import React from 'react';
import './ProfileSideBar.scss'

const ProfileSideBar = (props) => {

  // console.log(props)

  const userCard = !props.selectedUser.ghost ?
    <div>
      <img src={props.selectedUser.profile_pic}alt="User"/>
      <div className="SideDetails">
        <h1>{props.selectedUser.first_name} {props.selectedUser.last_name}</h1>
        <h2>{props.selectedUser.bio}</h2>
      </div>
    </div>
    :
    <div>
      <img src={props.selectedUser.profile_pic} alt="User"/>
        <div className="SideDetails">
          <h1>{props.selectedUser.name}</h1>
          <h2>{props.selectedUser.town}, {props.selectedUser.state}</h2>
          <p>{props.selectedUser.bio}</p>
        </div>
    </div>

  return (
    <div className="ProfileSideBar">
      {userCard}
    </div>
  )
}
export default ProfileSideBar

import React from 'react'
import fblogo2 from './assets/facebook-logo.webp'
import Page from './Page'
function Profile({user,logout}) {
    console.log(`Hi`,user)
  return (
    <div class="flex">
        <div class="login-container flex-col">
            <h1>Facebook Profile</h1>

           {user && <><img src={user.picture.data.url|| ''} height='60' width='60' ></img>
           <div class='pf_text'>
                Name: <span>{user.name|| ''}</span>
            </div>
            <div class='pf_text'>
                Email: <span>{user.email|| ''}</span>
            </div>
            <button class="login-signin-btn fb-btn" onClick={logout}>
                <img src={fblogo2} class="img-fb" height='40' width='40' alt="google sign in"/><span>Logout</span>

                </button> </>} 
        </div>
        <div><Page user={user}/></div>
    </div>
    
  )
}

export default Profile
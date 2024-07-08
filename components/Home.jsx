import React, { useEffect, useState } from 'react'
import fblogo from './assets/Facebook_Logo_2023.png'
import fblogo2 from './assets/facebook-logo.webp'
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import Profile from './Profile';
function Home() {
  const [logged,setLogged]=useState(false)
  const [userData,setUser]=useState(null)
   

    useEffect(()=>{
      checkLoginState();
    },[userData])
    
    async function checkLoginState() {               // Called when a person is finished with the Login Button.
        await FB.getLoginStatus(async function(response) {   // See the onlogin handler
          await statusChangeCallback(response);
        });
      }


      async function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
        console.log('statusChangeCallback');
        console.log(response);                   // The current login status of the person.
        if (response.status === 'connected') {  
           try {
             await fetchUserData(); // Fetch user data after setting logged state
          await setLogged(true);
          window.reload();
          console.log('User:', userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        } else {                                 // Not logged into your webpage or we are unable to tell.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
        }
      }

      const fetchUserData = async () => {
        try {
          const userData = await new Promise((resolve, reject) => {
            FB.api('/me', { fields: 'name,email,picture' }, function(response) {
              if (!response || response.error) {
                reject(response.error || 'Error fetching user data');
              } else {
                resolve(response);
              }
            });
          });
    
          console.log('Good to see you, ' + userData.name + '.', userData);
          await setUser(userData);
         
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
  const handleFacebookLogout=()=>{
    FB.logout(function(response) {
      setLogged(false)
     
      console.log(`Logged Out`)
   });
  }    

  const handleFacebookLogin = () => {
    FB.login(
      function(response) {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information.... ',response);
          FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.',response);
            setLogged(true)
            // Handle the response here
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        scope: 'business_management,public_profile,email',
        auth_type: 'rerequest',
        return_scopes: true,
        enable_profile_selector: true,
        config_id: '423220967377027', // Add your config_id here
      }
    );
  };

  
  return (
    
    <div class="login flex-col">
    
        {!logged ?<div class="login-container flex-col">
            <h2>Login or Signup</h2>
            <button class="login-signin-btn fb-btn" onClick={handleFacebookLogin}>
                <img src={fblogo2} class="img-fb" height='40' width='40' alt="google sign in"/><span>Continue with Facebook</span>

                </button> 

                 
           <button onClick={checkLoginState}> Status</button>
               
            <div id="status"></div>
                
            <span class='login-footer'>By continuing, you agree to our <b>Terms of Use</b>.<br></br>Read our <b>Privacy Policy</b> .</span>
        </div>:<Profile user={userData} logout={handleFacebookLogout}/>}
    </div>
  )
}

export default Home
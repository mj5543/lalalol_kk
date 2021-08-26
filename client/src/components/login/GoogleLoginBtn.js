import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
require('dotenv').config();

const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

const GoogleLoginBtn = ({ location, history, onGoogleLogin }) =>{

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSuccess = async(response) => {
      const { googleId, profileObj : { email, name, imageUrl } } = response;
      console.log('onSuccess ::', response);
      setIsLoggedIn(true)
      console.log('email---', email)
      await onGoogleLogin (
        // 구글 로그인 성공시 서버에 전달할 데이터
        {appId: googleId, email, name, imageUrl, provider: 'GOOGLE'}
      );
  }

  const onFailure = (error) => {
      console.log(error);
  }

  return(
      <div className="d-inline-block wp-100">
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              // <button type="button" className="btn btn-md" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              //   <div className="google-icon" style={{width: '30px', height: '30px'}}></div>
              // </button>
              <button class="custom-btn btn-17" style={{width: '100%'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <span className="wp-100">Click!</span>
                <span className="wp-100">
                  <div className="google-icon ml-10 btn-fl" style={{width: '30px', height: '30px', marginTop: '5px'}} />
                  <div className="d-inline-block">Google</div>
                </span>
              </button>

            )}
            responseType={"id_token"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            // isSignedIn={isLoggedIn}
            cookiePolicy={'single_host_origin'}
          />
      </div>
  )
}

export default GoogleLoginBtn;
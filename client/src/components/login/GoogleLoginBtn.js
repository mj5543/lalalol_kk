import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';

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
      <div className="d-inline-block">
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <button type="button" className="btn btn-md" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <div className="google-icon" style={{width: '30px', height: '30px'}}></div>
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
import React from 'react';
import UserCheck from '../components/login/UserCheck';
import ActivityContents from '../components/contents/ActivityContents';
const Profile = (props) => {
  return (
    <main className="content">
    <UserCheck />
    <div className="container-fluid p-0">

      <div className="mb-3">
        <h1 className="h3 d-inline align-middle">Profile</h1>
        {/* <a className="badge bg-dark text-white ms-2" href="upgrade-to-pro.html">
  Get more page examples
</a> */}
      </div>
      <div className="row">
        <div className="col-md-4 col-xl-3">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Profile Details</h5>
            </div>
            <div className="card-body text-center">
              <div className="position-relative" style={{height: '50px'}}>
                <div className="smile-icon position-absolute top-0 start-50 translate-middle mb-2" style={{width: '50px', height: '50px'}}></div>
              </div>
              {/* <img src="img/avatars/avatar-4.jpg" alt="Christina Mason" className="img-fluid rounded-circle mb-2" width="128" height="128" /> */}
              <div>
              <h5 className="card-title mb-0">Minju Kang</h5>
              {/* <div className="text-muted mb-2">React 공부하다가 React로 간단히 만들어진 블로그 입니다.  </div> */}

              </div>

              {/* <div>
                <a className="btn btn-primary btn-sm" href="#">Follow</a>
                <a className="btn btn-primary btn-sm" href="#"><span data-feather="message-square"></span> Message</a>
              </div> */}
            </div>
            <hr className="my-0" />
            <div className="card-body">
              <h5 className="h6 card-title">Skills</h5>
              <a href="#" className="badge bg-primary me-1 my-1">HTML</a>
              <a href="#" className="badge bg-primary me-1 my-1">JavaScript</a>
              <a href="#" className="badge bg-primary me-1 my-1">Sass</a>
              <a href="#" className="badge bg-primary me-1 my-1">Angular</a>
              <a href="#" className="badge bg-primary me-1 my-1">Vue</a>
              <a href="#" className="badge bg-primary me-1 my-1">React</a>
              <a href="#" className="badge bg-primary me-1 my-1">Redux</a>
              <a href="#" className="badge bg-primary me-1 my-1">UI</a>
              <a href="#" className="badge bg-primary me-1 my-1">UX</a>
            </div>
            <hr className="my-0" />
            <div className="card-body">
              <h5 className="h6 card-title">About</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1"><span data-feather="home" className="feather-sm me-1"></span> Lives in <a href="#">Seoul</a></li>

                {/* <li className="mb-1"><span data-feather="briefcase" className="feather-sm me-1"></span> Works at <a href="#">GitHub</a></li> */}
                <li className="mb-1"><span data-feather="map-pin" className="feather-sm me-1"></span> From <a href="#">Seoul</a></li>
              </ul>
            </div>
            {/* <hr className="my-0" />
            <div className="card-body">
              <h5 className="h6 card-title">Elsewhere</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1"><a href="#">staciehall.co</a></li>
                <li className="mb-1"><a href="#">Twitter</a></li>
                <li className="mb-1"><a href="#">Facebook</a></li>
                <li className="mb-1"><a href="#">Instagram</a></li>
                <li className="mb-1"><a href="#">LinkedIn</a></li>
              </ul>
            </div> */}
          </div>
        </div>
              <ActivityContents history={props.history} />
        
      </div>

    </div>
  </main>

  )
}

export default Profile;
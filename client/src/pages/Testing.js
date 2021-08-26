import React from 'react';
import UserManagement from '../components/admin/UserManagement';
import ButtonSamples from '../components/animation/ButtonSamples';
import InputContents from '../components/login/InputContents';
const Testing = (props) => {
  const goLogin = () => {
    props.history.push('/auth/login');
  }
  return (
    <div className="container">
      <UserManagement />
      <ButtonSamples />
      <main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Welcome back</h1>
							<p className="lead">
								Sign in to your account to continue
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<div className="text-center">
										{/* <img src="img/avatars/avatar.jpg" alt="Charles Hall" className="img-fluid rounded-circle" width="132" height="132" /> */}
									</div>
                  <div className="wp-100 mb-10">
                    <button class="custom-btn btn-17" style={{width: '49%'}}>
                      <span className="wp-100">Click!</span>
                      <span className="wp-100"><div className="google-icon ml-10" style={{width: '30px', height: '30px', marginTop: '5px'}}></div>Read More</span>
                    </button>
                    <button class="custom-btn btn-12" style={{width: '49%'}}>
                      <span className="wp-100">Click!</span><span>Read More</span>
                    </button>

                  </div>
									<form>
										<div className="mb-3">
										{/* <InputWithLabel label="이메일" name="email" value={email} onChange={handleChange} placeholder="이메일"/> */}
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" name="email"
											placeholder="Enter your email"
											/>
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input className="form-control form-control-lg" type="password" name="password"
											placeholder="Enter your password"
											/>
											{/* <small>
												<a href="index.html">Forgot password?</a>
											</small> */}
										</div>
										{/* <div>
											<label className="form-check">
												<input className="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked />
												<span className="form-check-label">
													Remember me next time
												</span>
											</label>
										</div> */}
										<div className="text-center mt-3">
											<button type="button" className="btn btn-md">
												<div className="login-password-icon" style={{width: '60px', height: '60px'}}></div>
											</button>
											{/* <GoogleLoginBtn onGoogleLogin={provideUserCheck} history={props.history} location={props.location} />
											<FaceBookLoginBtn onFacebookLogin={provideUserCheck} history={props.history} location={props.location} /> */}
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>
    </div>
  )
}

export default Testing;
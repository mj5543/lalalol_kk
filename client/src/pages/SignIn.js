import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import GoogleLoginBtn from '../components/login/GoogleLoginBtn';
import {isEmpty} from 'lodash';
import InputWithLabel from '../components/auth/InputWithLabel';
import * as authActions from '../redux/modules/auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from '../components/lib/storage';

const SignIn = ({location, history}) => {
  console.log('history', history);
  console.log('location', location);
	console.log('SignIn storage.get', storage.get('loggedInfo'))
	const SET_PROVIDE_USER_CHECK = "SET_PROVIDE_USER_CHECK";
	const initialState = {};
	const goMainPage = () => {
		history.push("/");
	}//
	// useEffect(() => {
	// 	authActions.initializeForm('login')
	// }, [])
	function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_PROVIDE_USER_CHECK:
        return applySetProvideUserCheck(state, action);
      default:
        return applySetProvideUserCheck(state, action);
        // return state;
    }
  }
  
  // Reducer Functions
  
  function applySetProvideUserCheck(state, action) {
		console.log(action);
		console.log(state);
    const { user } = action;
    return {
      ...state,
      user
    };
  }
	const [state, dispatch] = useReducer(reducer, {});
  console.log('Sign in state', state);
	const provideUserCheck = async(params) => {
		const res = await axios.post('/api/userCheck', params);
		console.log('res--', res);
		if(isEmpty(res.data.result)) {
			history.push("/sign-up", params);
		} else {
			dispatch({type: SET_PROVIDE_USER_CHECK, user: res.data.result[0]})
			storage.set('loggedInfo', state.user);
			console.log('dispatch--', state);
			console.log('storage.get', storage.get('loggedInfo'))
		}
	}

	const handleChange = (e) => {
		// const { AuthActions } = this.props;
		const { name, value } = e.target;

		authActions.changeInput({
				name,
				value,
				form: 'login'
		});
	}
	const { email, password } = this.props.form.toJS();
	// const { handleChange } = this;
  return (
    <main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Welcome back, Charles</h1>
							<p className="lead">
								Sign in to your account to continue
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<div className="text-center">
										<img src="img/avatars/avatar.jpg" alt="Charles Hall" className="img-fluid rounded-circle" width="132" height="132" />
									</div>
									<form>
										<div className="mb-3">
										<InputWithLabel label="이메일" name="email" value={email} onChange={handleChange} placeholder="이메일"/>
											{/* <label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" /> */}
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" />
											<small>
            <a href="index.html">Forgot password?</a>
          </small>
										</div>
										<div>
											<label className="form-check">
            <input className="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked />
            <span className="form-check-label">
              Remember me next time
            </span>
          </label>
										</div>
										<div className="text-center mt-3">
											<button type="button" className="btn btn-lg btn-primary">Sign in</button>
											<GoogleLoginBtn onGoogleLogin={provideUserCheck} history={history} location={location} />
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
  )
}
export default connect(
	// (state) => ({
	// 		form: state.auth.getIn(['login', 'form'])
	// }),
	(dispatch) => ({
			AuthActions: bindActionCreators(authActions, dispatch)
	})
)(SignIn);
// export default SignIn;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GoogleLoginBtn from './GoogleLoginBtn';
import {isEmpty} from 'lodash';
// import InputWithLabel from '../components/auth/InputWithLabel';
// import * as authActions from '../redux/modules/auth';
import storage from '../lib/storage';
// import {mapStateToProps, mapDispatchToProps} from '../../redux/connectMapProps';
// import { withRouter } from "react-router-dom";
// import { connect } from 'react-redux';

const InputContents = (props) => {
  console.log('props', props);
	const [inputs, setInputs] = useState({
		email: '',
		password: ''
	});
	const { email, password } = inputs;

	const currentState = props.store.getState();
	
	console.log(props.store.getState())
	if (!currentState.users.logged && !isEmpty(storage.get('loggedInfo'))) {
		props.setUserInfo(storage.get('loggedInfo'));
		props.history.push("/");
	}
	if (currentState.users.logged && !isEmpty(storage.get('loggedInfo'))) {
		props.history.push("/");
	}
  // console.log('history', history);
  // console.log('location', location);
	console.log('SignIn storage.get', storage.get('loggedInfo'))
	const goMainPage = () => {
		props.history.push("/");
	}//
	// useEffect(() => {
	// 	authActions.initializeForm('login')
	// }, [])
	
	const provideUserCheck = async (params) => {
		console.log('params--', params);
		const res = await axios.post('/api/userCheck', params);
		console.log('res--', res);
		if(isEmpty(res.data.result)) {
			props.history.push("/sign-up", params);
		} else {
      // setUserInfo(res.data.result[0])
			// props.userCheck(params)
			const queryParams = {...params, ip: props.ipInfo.IPv4}
			await axios.post('/api/updateLoggedinUser', queryParams);
			const updateRes = await axios.post('/api/userEmailCheck', {email: params.email});
			storage.set('loggedInfo', updateRes.data.result[0])
			props.setUserInfo(updateRes.data.result[0])
			props.setProvideInfo(params);
			// dispatch({type: SET_PROVIDE_USER_CHECK, user: res.data.result[0]})
			console.log('storage.get', storage.get('loggedInfo'))
			console.log(props.store.getState())
      props.history.push("/");
		}
	}
	const userEmailPassCheck = async() => {
		try {
			const res = await axios.post('/api/userEmailPassCheck', {password: inputs.password, email: inputs.email});
			console.log('res--', res);
			if(!isEmpty(res.data.result)) {
				storage.set('loggedInfo', res.data.result[0]);
				props.setUserInfo(res.data.result[0]);
				props.history.push("/");
			}
		} catch(e) {
			console.log('error--', e);

		}

	}
	const onInputChange = (e) => {
		const { value, name } = e.target;
		setInputs({
				...inputs, //기존 input 객체를 복사 - 나머지 패턴
				[name]: value
		});
		// let emailMessage = '';
		// let passwordMessage = '';
		// let nameMessage = '';
		// let nameInvalid = false;
		// let emailInvalid = false;
		// let passwordInvalid = false;
		// if(name === 'name') {
		// 	if(isEmpty(value)) {
		// 		nameMessage = '이름을 입력하세요.'
		// 		nameInvalid = true
		// 	}
		// 	setValidations({
		// 		...validations,
		// 		nameMessage: nameMessage,
		// 		nameInvalid: nameInvalid,
		// 	});
		// }
		// if(name === 'password') {
		// 	if(!isLength(value, { min: 6 })) {
		// 		passwordMessage = '비밀번호를 6자 이상 입력하세요.';
		// 		passwordInvalid = true
		// 	}
		// 	setValidations({
		// 		...validations,
		// 		passwordMessage: passwordMessage,
		// 		passwordInvalid: passwordInvalid,
		// 	});

		// }
		// if(name === 'email') {
		// 	if(!isEmail(value)) {
		// 		emailMessage = '잘못된 이메일 형식 입니다.';
		// 		emailInvalid = true
		// 	}
		// 	setValidations({
		// 		...validations,
		// 		emailMessage: emailMessage,
		// 		emailInvalid: emailInvalid,
		// 	});
		// }
}
	const handleChange = (e) => {
		// const { AuthActions } = this.props;
		const { name, value } = e.target;

		// authActions.changeInput({
		// 		name,
		// 		value,
		// 		form: 'login'
		// });
	}
	// const { email, password } = this.props.form.toJS();
	// const { handleChange } = this;
  return (
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
									<form>
										<div className="mb-3">
										{/* <InputWithLabel label="이메일" name="email" value={email} onChange={handleChange} placeholder="이메일"/> */}
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" name="email"
											value={email}
											placeholder="Enter your email"
											onChange={onInputChange}
											/>
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input className="form-control form-control-lg" type="password" name="password"
											value={password}
											placeholder="Enter your password"
											onChange={onInputChange}
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
											<button type="button" className="btn btn-lg btn-primary" onClick={userEmailPassCheck}>Sign in</button>
											<GoogleLoginBtn onGoogleLogin={provideUserCheck} history={props.history} location={props.location} />
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
// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(InputContents)
// );

export default InputContents;
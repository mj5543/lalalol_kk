import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GoogleLoginBtn from '../components/login/GoogleLoginBtn';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import {isEmpty} from 'lodash';
import IpAddress from '../components/lib/ip/IpAddress';
import {mapStateToProps, mapDispatchToProps} from '../redux/connectMapProps';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const SignUp = (props) => {
  console.log('props.', props);
  // const [name, setName] = useState('');
	// const [password, setPassword] = useState('')
  // const [email, setEmail] = useState('');
  const [appId, setAppId] = useState('');
	const [provider, setProvider] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
	//state관리
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		password: ''
	});
	const [validations, setValidations] = useState({
		nameMessage: '',
		emailMessage: '',
		passwordMessage: '',
		nameInvalid: false,
		emailInvalid: false,
		passwordInvalid: false
	});
	const {nameInvalid, nameMessage, emailMessage, passwordMessage, emailInvalid, passwordInvalid} = validations;

	//비구조화할당을 통해 값을 추출
	const { name, email, password } = inputs;
	const inputValidation = () => {
		let emailMessage = '';
		let passwordMessage = '';
		let nameMessage = '';
		let nameInvalid = false;
		let emailInvalid = false;
		let passwordInvalid = false;
		let flag = true;
		if(isEmpty(name)) {
			nameMessage = '이름을 입력하세요.'
			nameInvalid = true
			flag = false;
		}
		if(!isEmail(email)) {
			emailMessage = '잘못된 이메일 형식 입니다.';
			emailInvalid = true
			flag = false;
		}
		if(!isLength(password, { min: 6 })) {
			passwordMessage = '비밀번호를 6자 이상 입력하세요.';
			passwordInvalid = true
			flag = false;
		}
		setValidations({
			nameMessage: nameMessage,
			emailMessage: emailMessage,
			passwordMessage: passwordMessage,
			nameInvalid: nameInvalid,
			emailInvalid: emailInvalid,
			passwordInvalid: passwordInvalid
		});
		return flag;
	}

	//값이 변경되는 함수 - 타겟대상이 2개임을 처리
	const onDateChange = (e) => {
			const { value, name } = e.target;
			setInputs({
					...inputs, //기존 input 객체를 복사 - 나머지 패턴
					[name]: value
			});
			let emailMessage = '';
			let passwordMessage = '';
			let nameMessage = '';
			let nameInvalid = false;
			let emailInvalid = false;
			let passwordInvalid = false;
			if(name === 'name') {
				if(isEmpty(value)) {
					nameMessage = '이름을 입력하세요.'
					nameInvalid = true
				}
				setValidations({
					...validations,
					nameMessage: nameMessage,
					nameInvalid: nameInvalid,
				});
			}
			if(name === 'password') {
				if(!isLength(value, { min: 6 })) {
					passwordMessage = '비밀번호를 6자 이상 입력하세요.';
					passwordInvalid = true
				}
				setValidations({
					...validations,
					passwordMessage: passwordMessage,
					passwordInvalid: passwordInvalid,
				});
	
			}
			if(name === 'email') {
				if(!isEmail(value)) {
					emailMessage = '잘못된 이메일 형식 입니다.';
					emailInvalid = true
				}
				setValidations({
					...validations,
					emailMessage: emailMessage,
					emailInvalid: emailInvalid,
				});
			}
	}


	//값을 초기화시키는 함수
	const onDataReset = () => {
			setInputs({
					name: '',
					email: '',
					password: ''
			});
	}
	useEffect(() => {
		if (props.location.state) {
			setContents(props.location.state);
		}
	},[props.location.state]);
	const setContents = (params) => {
		if(params) {
			setInputs({
				name: params.name,
				email: params.email,
				password: ''
			});
			// setName(params.name);
			// setEmail(params.email);
			setAppId(params.appId);
			setProvider(params.provider)
			setIsDisabled('disabled');
	
		}
	}
	const onSignUp = async () => {
		try {
			if(!inputValidation()) {
				return;
			}
			const res = await axios.post('/api/userEmailCheck', {email: email});
			console.log('res--', res);
			if(isEmpty(res.data.result)) {
				doSignUp();
			} else {
				setValidations({
					...validations,
					emailMessage: '이미 가입되어 있는 이메일입니다.',
					emailInvalid: true,
				});     
			}
		} catch(error) {
			console.log('error ::', error);

		}
	}	
	const doSignUp = async()=> {
		const reqParams = {name, password, email, appId, provider, ip:props.ipInfo.IPv4}
		const res = await axios.post('/api/signup', reqParams);
		props.history.push("/");
		console.log('onSignUp success!', res);
	}
	const ButtonElements = () => {
		let elements = null;
		if(!isDisabled) {
			elements = <GoogleLoginBtn onGoogleLogin={setContents} />;
		}
		return elements;
	}
	const handleChangedPassword = (e) => {
		if(!isLength(e.target.value, { min: 6 })) {
			this.setError('비밀번호를 6자 이상 입력하세요.');
			return false;
		}
		this.setError(null);
		return true;
		// setPassword(e.target.value);
		// console.log('handleChangedPassword!', e.target.value);
		// console.log('handleChangedPassword', password);
	}
  return (
    <main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">
						<IpAddress />
						<div className="text-center mt-4">
							<h1 className="h2">가입</h1>
							<p className="lead">
								{/* Start creating the best possible user experience for you customers. */}
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<form>
										<div className="mb-3">
											<label className="form-label">Name</label>
											<input className={'form-control form-control-lg' + (nameInvalid ? ' is-invalid' : '')}
												type="text"
												value={name}
												name="name"
												placeholder="Enter your name"
												disabled={isDisabled}
												onChange={onDateChange}
											/>
										</div>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input className={'form-control form-control-lg' + (emailInvalid ? ' is-invalid' : '')}
												type="email" 
												value={email} 
												name="email" 
												placeholder="Enter your email"
												onChange={onDateChange}
											/>
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input className={'form-control form-control-lg' + (passwordInvalid ? ' is-invalid' : '')}
												type="password"
												name="password"
												placeholder="Enter password" 
												value={password}
            						onChange={onDateChange}
											/>
										</div>
										<div className="text-center mt-3">
											{/* <a href="index.html" className="btn btn-lg btn-primary">Sign up</a> */}
											<button type="button" className="btn btn-lg btn-primary" onClick={onSignUp}>Sign up</button>
											<ButtonElements />
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);

// export default SignUp;
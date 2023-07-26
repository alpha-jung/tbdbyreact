import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { encrypt } from '../../Crypto';
import { FormEvent, useState } from 'react';
import { emailRegex } from '../../util';

function LoginForm() {
  let navigate = useNavigate();
  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');

  const emailHandler = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const passwordHandler = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  function loginCheck() {
    if(email == '') {
      alert('이메일을 입력해주세요.');
      return;
    } else {
      if(!emailRegex(email)) {
        alert('이메일 형식이 올바르지 않습니다.');
        return;
      }
    }

    if(password == '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    let encryptedPassword = encrypt(password);

    axios.post('http://localhost:9080/mongo/users/loginChk', {
      email: email,
      password: encryptedPassword
    },
    {
      withCredentials: true
    })
    .then(res => {
      if(res.data == 'success') {
        alert('로그인 성공.');
        console.log(res);
        sessionStorage.setItem('at', res.headers.authorization);
        sessionStorage.setItem('expireAt', res.headers.expireat);

        window.location.reload();
      }
    })
    .catch(err => {
      alert(err.response.data.message);
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          defaultValue={email}
                          onChange={emailHandler}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          placeholder="Password"
                          defaultValue={password}
                          onChange={passwordHandler}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="btn btn-primary btn-user btn-block"
                        onClick={() => { loginCheck() }}
                      >
                        Login
                      </a>
                      <hr />
                      <a
                        href="http://localhost:9080/oauth2/authorization/google"
                        className="btn btn-google btn-user btn-block"
                      >
                        <i className="fab fa-google fa-fw"></i> Login with
                        Google
                      </a>
                      <a
                        href="http://localhost:9080/oauth2/authorization/naver"
                        className="btn btn-user btn-block" style={{ color: '#fff', borderColor: '#fff', backgroundColor: '#2DB400' }}
                      >
                        <i className="fab fa-fw" style={{ paddingRight: '10px' }}>N</i> Login with Naver
                      </a>
                      <a
                        href="http://localhost:9080/oauth2/authorization/kakao"
                        className="btn btn-user btn-block" style={{ color: '#fff', borderColor: '#fff', backgroundColor: '#F7E600' }}
                      >
                        <i className="fab fa-fw" style={{ paddingRight: '10px' }}>K</i> Login with Kakao
                      </a>
                      {/* <a
                        href="index.html"
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw"></i> Login with
                        Facebook
                      </a> */}
                    </form>
                    <hr />
                    {/* <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div> */}
                    <div className="text-center">
                      <a className="small" href="#" onClick={() => { navigate('/register') }}>
                        Create an Account!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

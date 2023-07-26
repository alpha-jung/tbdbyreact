import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { encrypt } from "../../Crypto";
import { emailRegex } from "../../util";

function Register() {
  let navigate = useNavigate();
  let [name, setName] = useState<string>('');
  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  let [repeatPassword, setRepeatPassword] = useState<string>('');

  const nameHandler = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }

  const emailHandler = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const passwordHandler = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const repeatPasswordHandler = (event: FormEvent<HTMLInputElement>) => {
    setRepeatPassword(event.currentTarget.value);
  }

  function regist() {
    if(name == '') {
      alert('이름을 입력해주세요.');
      return;
    }

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
    } else {
      if(repeatPassword == '' || password != repeatPassword) {
        alert('비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    let encryptedPassword = encrypt(password);

    axios.post('http://localhost:9080/mongo/users/regist', {
      name: name,
      email: email,
      password: encryptedPassword
    })
    .then(res => {
      if(res.data == 'success') {
        alert('가입이 완료되었습니다.');
        navigate('/');
      }
    })
    .catch(err => {
      alert(err.response.data.message);
    })
  }

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form className="user">
                  {/* <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="Last Name"
                      />
                    </div>
                  </div> */}
                  <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-user"
                        id="name"
                        placeholder="Name"
                        defaultValue={name}
                        onChange={nameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="email"
                      placeholder="Email Address"
                      defaultValue={email}
                      onChange={emailHandler}
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="password"
                        placeholder="Password"
                        defaultValue={password}
                        onChange={passwordHandler}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="repeatPassword"
                        placeholder="Repeat Password"
                        defaultValue={repeatPassword}
                        onChange={repeatPasswordHandler}
                      />
                    </div>
                  </div>
                  <a
                    href="#"
                    className="btn btn-primary btn-user btn-block"
                    onClick={() => { regist() }}
                  >
                    Register Account
                  </a>
                  {/* <hr />
                  <a
                    href="index.html"
                    className="btn btn-google btn-user btn-block"
                  >
                    <i className="fab fa-google fa-fw"></i> Register with Google
                  </a>
                  <a
                    href="index.html"
                    className="btn btn-facebook btn-user btn-block"
                  >
                    <i className="fab fa-facebook-f fa-fw"></i> Register with
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
                  <a className="small" href="login.html">
                    Already have an account? Login!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

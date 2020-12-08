import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipesAppContext from '../context/RecipesAppContext';
import { saveState } from '../services/localStorage';
import '../styles/Login.css';
import 'font-awesome/css/font-awesome.min.css';

function Login() {
  const {
    setEmail,
    setPassword,
    email,
    password,
  } = useContext(RecipesAppContext);

  const isEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      setEmail(value);
    } else {
      setEmail('');
    }
  };

  const isPassword = (e) => {
    const { value } = e.target;
    const minimumLength = 6;
    if (value.length > minimumLength) {
      setPassword(value);
    } else {
      setPassword('');
    }
  };

  const saveToken = () => {
    saveState('mealsToken', 1);
    saveState('cocktailsToken', 1);
    saveState('user', { email });
  };

  return (
    <div className="total-login">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="icons-login-container">
        <img width="65" height="50" data-testid="food-bottom-btn" src="https://s3-alpha-sig.figma.com/img/1416/5c71/8782f2b9d1087be0520256ff25f38490?Expires=1608508800&Signature=fNkBcWUsZcqvDAREaA~x6MBr8D4gmMRhQDYxLn~ZNPAfTwTWtXWwDlCm6q7FCX8yKzMRfqTbFeGZhiaglOI0dH4qe87d5Bpy6JA-LeoePvbYCShWa9OsAm-JXsJjrAiCDiTIY8zDC2ukcRoB-nK~5EREVyWj4pIZyAv3mf7cRBuijzSiPKD5L8bpjFc0Iji~qOE0~1GlOBck~AXV5k8Qo6K9OPy8bKrd7e5gwkABTZyyON-jrvWA8viTzivnqIJSkrS76nePzTEN9invNEMuKkqrI5CMZZIZp~JO94LOVz7CZ29lA9MKg3Hhzsxw1~WlfocLhOjO7bQGFlReZD6icw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="mealIcon" />
        <img width="65" height="50" data-testid="food-bottom-btn" src="https://s3-alpha-sig.figma.com/img/dcc0/b12e/8e688eadab868d18fa4841265e1518d6?Expires=1608508800&Signature=TmGpfvb9xZP~lhJfvdAGMGaihZcYPOUJz4IlUbnBj6uHaqGLPjmpf~MB1gHlUb3TO0TJKh1TRmYxldrY5gU5rlqw5-zIzwaSKz9d55CLI9mK4j1VWkA9Mo2cTYD58qjuHK9pwZgpYXeeLcZ1Cmck09CBXeuWIRtbbXLMOyszoXR74iA2Vumt7UMXJDZD~~tSkty1khVYy2AF5n59T1XoB68zGtwilYZPx8SXNunXuIFJkYKMTDNBNZHW0rfRs0BJ7xC14HyWitlOjN92gp3kEbaDS2aAhQDX8kwcYMZUMBGKeXxcw5f7ZPDpdPJ3-YDLu~Ee0LuEJwSf1u7onRKBHQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="mealIcon" />
        <img width="65" height="50" data-testid="food-bottom-btn" src="https://s3-alpha-sig.figma.com/img/ab83/a52c/5cb057c3f93003b8c5110922d8ee3d1a?Expires=1608508800&Signature=Q~hsuLOK0GJbUSByOpZkV0OHsCoVLUDUuZgl1FLvnA5beLfk7Mywfgu6nUH7X~-GffD~goHet2XfMQFMu4SQ2kTb24ZojEsD5n6HhqGhUJDVywFeoQj~4e35ewRKi4vUjLAQiWoHeoFxqn-MRqFkIcWo7dou4H4PhzpRv48k67Yay-2ojKhcH1q1hf82PmImlTomSbJ~yfMdazWNhnJrhxwGuVsJz9PyapjHk7K9a3ZQh-kjcVW1MkhekLRQicq1U8CD92E4HsYCdpzBsGAyFdd9CS8b48OUdW51BVRMo4i3HVtmMmpVWKMXFM9RCTzaYAV4-RsM88Z~UlaVXxp~~A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="mealIcon" />
      </div>
      <h1>Trybe Food</h1>
      <div className="div-form">
        <form>
          <h2>Login</h2>
          <div className="textbox">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="email"
              placeholder="Login"
              data-testid="email-input"
              onChange={ isEmail }
            />
          </div>
          <div className="textbox">
            <FontAwesomeIcon icon={faLock} />
            <input
              placeholder="Password"
              type="password"
              data-testid="password-input"
              onChange={ isPassword }
            />
          </div>
        </form>
        <div className="div-span-senha">
          <span className="span-senha">Esqueci a senha</span>
        </div>
        <Link to="/comidas">
          <button
            className="login-button"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !email || !password }
            onClick={ saveToken }
          >
            Entrar
          </button>
        </Link>
      </div>
      <span className="span-botton">Gostou do nosso app? Saiba mais!</span>
    </div>
  );
}

export default Login;

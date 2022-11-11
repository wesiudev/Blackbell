import { useState } from 'react';
import { useDispatch } from "react-redux";
import { signInAdmin } from '../../common/redux/actions/auth';
import Footer from '../Footer/Footer';
const Admin = () => {
    const [{userName, password}, setUserInput] = useState<{userName: string, password:string}>({userName:'', password:''});

    const dispatch = useDispatch<any>();

    const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserInput({
            userName,
            password,
            [e.target.name]: e.target.value,
        });
      };

      const handleFormSubmit: React.MouseEventHandler<HTMLDivElement> = () => {
        dispatch(
            signInAdmin(
              {
                password,
                userName,
              }
            )
          );
        }

    return(
    <>
        <div className="admin">
            <div className="admin__wrapper">
                <div className="admin__wrapper__headline">
                    <h1>Zarządzanie sklepem</h1>
                    <h2>Zaloguj się,</h2>
                    <h2>Dodawaj, edytuj i usuwaj przedmioty w swoim sklepie</h2>
                    <div className="borders">
                        <div className="border"></div>
                    </div>
                </div>
                <div className="admin__wrapper__content">
                    <div className="admin__wrapper__content__login">
                        <div className='admin__wrapper__content__login__input'>
                            <label htmlFor="userName">Login</label>
                            <input onChange={(e) => handleTextInput(e)} type="text" name='userName' value={userName}/>
                        </div>
                        <div className='admin__wrapper__content__login__input'>
                            <label htmlFor="password">Hasło</label>
                            <input onChange={(e) => handleTextInput(e)} type="password" name='password' value={password}/>
                        </div>
                        <div onClick={handleFormSubmit} className='btn'>
                            <button>ZALOGUJ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Admin
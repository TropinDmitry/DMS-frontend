import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from '~/components/InputField';
import * as authServices from '~/services/authServices';
import { successNotify, errorNotify } from '~/components/ToastMessage';
import { emailValidator, passwordValidator } from '~/utils/formValidation';
import { confirmPasswordValidator, fullNameValidator } from '../../utils/formValidation';

const SignUp = ({ setIsSuccess }) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameErrMsg, setFullNameErrMsg] = useState({});
    const [emailErrMsg, setEmailErrMsg] = useState({});
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [isFullNameErr, setIsFullNameErr] = useState(false);
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFullNameValid = fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg)
        const isEmailValid = emailValidator(email, setIsEmailErr, setEmailErrMsg);
        const isPasswordValid = passwordValidator(password, setIsPasswordErr, setPasswordErrMsg);
        const isConfirmPasswordValid = confirmPasswordValidator(
            password,
            confirmPassword,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );

        if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) 
            return;

        const data = {
            name: fullName,
            email: email,
            password: password,
        };

        const res = await authServices.signin(data);
        if (res.code === 200) {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            successNotify(res.message);
            setIsSuccess(true);
            navigate('/dashboard');
        } else {
            errorNotify(res);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-[#ebedef]">
            <div className="w-[330px] md:w-[450px] h-fit bg-white p-[36px] rounded-md shadow-4Way">
                <h1 className="text-[#9fa9ae] text-center  text-[4.6rem] font-semibold">
                    DMS <span className="text-[2.4rem]">front-end</span>
                </h1>
                <h1 className="text-[#9fa9ae] text-center text-[2.0rem] font-medium mb-16">Регистрация</h1>
                <form id="signup" autoComplete="off">
                    <div className='mb-4'>
                        <InputField
                            id="name"
                            className={isFullNameErr ? 'invalid' : 'default'}
                            name="name"
                            placeholder="Фамилия Имя Отчетсво"
                            value={fullName}
                            setValue={setFullName}
                            onBlur={() => fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg)}
                        />
                        <p className="text-red-600 text-[1.3rem]">{nameErrMsg.fullName}</p>
                    </div>
                    <InputField
                        id="email"
                        className={isEmailErr ? 'invalid' : 'default'}
                        name="email"
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                        onBlur={() => emailValidator(email, setIsEmailErr, setEmailErrMsg)}
                    />
                    <p className="text-red-600 text-[1.3rem]">{emailErrMsg.email}</p>
                    <div className="mt-4">
                        <InputField
                            className={isPasswordErr ? 'invalid' : 'default'}
                            name="password"
                            placeholder="Пароль"
                            value={password}
                            setValue={setPassword}
                            onBlur={() => passwordValidator(password, setIsPasswordErr, setPasswordErrMsg)}
                        />
                        <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.password}</p>
                    </div>
                    <div className="mt-4">
                        <InputField
                            className={isConfirmPasswordErr ? 'invalid' : 'default'}
                            name="password"
                            placeholder="Подтверждение пароля"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            onBlur={() =>
                                confirmPasswordValidator(
                                    password,
                                    confirmPassword,
                                    setIsConfirmPasswordErr,
                                    setConfirmPasswordErrMsg,
                                )
                            }
                        />
                        <p className="text-red-600 text-[1.3rem]">{confirmPasswordErrMsg.confirmPassword}</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full text-[white] bg-[#321fdb] mt-10 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        Зарегистрироваться
                    </button>
                    <div className='mt-4 text-[blue] text-[1.5rem] underline'>
                        <NavLink to="/signin">
                            Есть аккаунт? Авторизируйтесь
                        </NavLink>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default SignUp;

import { useState } from 'react';
import InputField from '~/components/InputField';
import * as authServices from '~/services/authServices';
import { successNotify, errorNotify } from '~/components/ToastMessage';
import { passwordValidator, confirmPasswordValidator } from '~/utils/formValidation';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isPasswordValid = passwordValidator(password, setIsPasswordErr, setPasswordErrMsg);
        const isConfirmPasswordValid = confirmPasswordValidator(
            password,
            confirmPassword,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );

        if (!isPasswordValid || !isConfirmPasswordValid) return;
        const data = {
            token: localStorage.getItem('resetToken'),
            password: password,
        };
        const res = await authServices.resetPassword(data);
        if (res.code === 200) {
            localStorage.removeItem('resetToken');
            successNotify(res.message);
        } else {
            errorNotify(res);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-[#ebedef]">
            <div className="w-[330px] md:w-[450px] h-fit bg-white p-[36px] rounded-md shadow-4Way">
                <h1 className="text-[#9fa9ae] text-center text-[4.6rem] font-semibold">
                    DMS <span className="text-[2.4rem]">front-end</span>
                </h1>
                <h1 className="text-[#9fa9ae] text-center text-[2.0rem] font-medium mb-16">Сброс пароля</h1>
                <form>
                    <InputField
                        className={isPasswordErr ? 'invalid' : 'default'}
                        name="password"
                        placeholder="Новый пароль"
                        value={password}
                        setValue={setPassword}
                        onBlur={() => passwordValidator(password, setIsPasswordErr, setPasswordErrMsg)}
                    />
                    <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.password}</p>
                    <div className="mt-7">
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
                        className="w-full text-[white] bg-[#321fdb] mt-12 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        Сброс
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

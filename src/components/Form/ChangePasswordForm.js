import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import InputField from '~/components/InputField';
import { oldPasswordValidator, passwordValidator, confirmPasswordValidator } from '~/utils/formValidation';
import * as userServices from '~/services/userServices';
import { successNotify, errorNotify } from '../ToastMessage';

const ChangePasswordForm = ({ setShowChangePassword }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [oldPasswordErrMsg, setOldPasswordErrMsg] = useState({});
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});

    const [isOldPasswordErr, setIsOldPasswordErr] = useState(false);
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isOldPasswordValid = oldPasswordValidator(oldPassword, setIsOldPasswordErr, setOldPasswordErrMsg);
        const isPasswordValid = passwordValidator(password, setIsPasswordErr, setPasswordErrMsg);
        const isConfirmPasswordValid = confirmPasswordValidator(
            password,
            confirmPassword,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );

        if (!isOldPasswordValid || !isPasswordValid || !isConfirmPasswordValid) return;
        const data = {
            oldPassword: oldPassword,
            newPassword: password,
        };
        const res = await userServices.changePassword(data);
        if (res.code === 200) {
            successNotify(res.message);
            setShowChangePassword(false);
        } else {
            errorNotify(res);
        }
    };

    return (
        <div
            onClick={() => setShowChangePassword(false)}
            className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[#000000]/[0.3]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[330px] md:w-[450px] h-fit bg-white p-[36px] rounded-md shadow-4Way animate-fadeIn"
            >
                <h1 className="text-[#9fa9ae] text-center text-[4.6rem] font-semibold">
                    DMS <span className="text-[2.4rem]">front-end</span>
                </h1>
                <h1 className="text-[#9fa9ae] text-center text-[2.0rem] font-medium mb-16">Сменить пароль</h1>
                <form>
                    <InputField
                        className={isOldPasswordErr ? 'invalid' : 'default'}
                        name="password"
                        placeholder="Старый пароль"
                        value={oldPassword}
                        setValue={setOldPassword}
                        onBlur={() => oldPasswordValidator(oldPassword, setIsOldPasswordErr, setOldPasswordErrMsg)}
                    />
                    <p className="text-red-600 text-[1.3rem]">{oldPasswordErrMsg.oldPassword}</p>
                    <div className="mt-7">
                        <InputField
                            className={isPasswordErr ? 'invalid' : 'default'}
                            name="password"
                            placeholder="Новый пароль"
                            value={password}
                            setValue={setPassword}
                            onBlur={() => passwordValidator(password, setIsPasswordErr, setPasswordErrMsg)}
                        />
                        <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.password}</p>
                    </div>
                    <div className="mt-7">
                        <InputField
                            className={isConfirmPasswordErr ? 'invalid' : 'default'}
                            name="password"
                            placeholder="Подтверждение пароля"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            onBlur={() => confirmPasswordValidator(
                                    password,
                                    confirmPassword,
                                    setIsConfirmPasswordErr,
                                    setConfirmPasswordErrMsg,
                                )
                            }
                        />
                        <p className="text-red-600 text-[1.3rem]">{confirmPasswordErrMsg.confirmPassword}</p>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <button
                            onClick={handleSubmit}
                            className="w-full text-[white] bg-[#321fdb] mt-12 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} /> Сохранить
                        </button>
                        <button
                            onClick={() => setShowChangePassword(false)}
                            className="w-full text-[white] bg-red-600 mt-12 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                        >
                            <FontAwesomeIcon icon={faXmark} /> Отменить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;

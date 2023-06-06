import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

export const fullNameValidator = (fullName, setIsFullNameErr, setFullNameErrMsg) => {
    const msg = {};
    if (isEmpty(fullName)) {
        msg.fullName = 'Поле ФИО не должно быть пустым';
        setIsFullNameErr(true);
    } else {
        setIsFullNameErr(false);
    }
    setFullNameErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

export const codeValidator = (code, setIsCodeErr, setCodeErrMsg) => {
    const msg = {};
    if (isEmpty(code)) {
        msg.code = 'Количество символов не должно быть пустым';
        setIsCodeErr(true);
    } else {
        setIsCodeErr(false);
    }
    setCodeErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

export const emailValidator = (email, setIsEmailErr, setEmailErrMsg) => {
    const msg = {};
    if (isEmpty(email)) {
        msg.email = 'Email не должен быть пустым';
        setIsEmailErr(true);
    } else if (!isEmail(email)) {
        msg.email = 'Неверный Email';
        setIsEmailErr(true);
    } else {
        setIsEmailErr(false);
    }
    setEmailErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

export const oldPasswordValidator = (oldPassword, setIsOldPasswordErr, setOldPasswordErrMsg) => {
    const msg = {};
    if (isEmpty(oldPassword)) {
        msg.oldPassword = 'Поле нельзя оставлять пустым';
        setIsOldPasswordErr(true);
    } else if (oldPassword.length < 6) {
        msg.oldPassword = 'Пароль должен содержать не менее 6 символов';
        setIsOldPasswordErr(true);
    } else {
        setIsOldPasswordErr(false);
    }
    setOldPasswordErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

export const passwordValidator = (password, setIsPasswordErr, setPasswordErrMsg) => {
    const msg = {};
    if (isEmpty(password)) {
        msg.password = 'Поле нельзя оставлять пустым';
        setIsPasswordErr(true);
    } else if (password.length < 6) {
        msg.password = 'Пароль должен содержать не менее 6 символов';
        setIsPasswordErr(true);
    } else {
        setIsPasswordErr(false);
    }
    setPasswordErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

export const confirmPasswordValidator = (
    password,
    confirmPassword,
    setIsConfirmPasswordErr,
    setConfirmPasswordErrMsg,
) => {
    const msg = {};
    if (isEmpty(confirmPassword)) {
        msg.confirmPassword = 'Поле нельзя оставлять пустым';
        setIsConfirmPasswordErr(true);
    } else if (confirmPassword.length < 6) {
        msg.confirmPassword = 'Пароль должен содержать не менее 6 символов';
        setIsConfirmPasswordErr(true);
    } else if (confirmPassword !== password) {
        msg.confirmPassword = 'Пароли не совпадают';
        setIsConfirmPasswordErr(true);
    } else {
        setIsConfirmPasswordErr(false);
    }
    setConfirmPasswordErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

import { useState, useEffect, useContext } from 'react';
import { faBell, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faBars, faKey, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChangePasswordForm from '~/components/Form/ChangePasswordForm';
import { NavLink, useNavigate } from 'react-router-dom';
import * as authServices from '~/services/authServices';
import { successNotify, errorNotify } from '~/components/ToastMessage';
import { AvatarContext } from '~/App';

const Header = ({ setToggle }) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [userAvatar, setUserAvatar] = useState('');
    const { isChangeAvatar } = useContext(AvatarContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;
        const data = {
            token: refreshToken,
        };
        const res = await authServices.signOut(data);
        if (res.code === 200) {
            localStorage.clear();
            successNotify(res.message);
            navigate('/signin');
        } else {
            errorNotify(res);
        }
    };

    useEffect(() => {
        setToggle(toggleSidebar);
    }, [setToggle, toggleSidebar]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await authServices.getCurrUser();
            setUserAvatar(res?.avatar);
        };
        fetchApi();
    }, [isChangeAvatar]);

    return (
        <>
            <div className="flex items-center justify-between w-full h-[64px] bg-white text-[#9fa9ae] pl-[16px] pr-[24px] border-b-[1px] border-solid border-[#cccccc]">
                <div
                    onClick={() => setToggleSidebar(!toggleSidebar)}
                    className="p-[8px] hover:text-black cursor-pointer"
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="flex items-center">
                    <ul className="flex items-center text-[2.2rem]">
                        <li className="p-[8px] hover:text-black cursor-pointer">
                            <FontAwesomeIcon icon={faBell} />
                        </li>
                        <li className="p-[8px] hover:text-black cursor-pointer">
                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                        </li>
                    </ul>
                    <div className="relative group">
                        <div className="w-[50px] h-[50px] rounded-full ml-8 cursor-pointer">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src={
                                    userAvatar
                                        ? userAvatar
                                        : 'https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg'
                                }
                                alt="avatar"
                            />
                        </div>
                        <div className="hidden absolute top-[50px] right-0 text-black bg-white shadow-4Way group-hover:block">
                            <ul className="w-[180px]">
                                <li className="p-[12px] cursor-pointer hover:text-[#321fdb] hover:bg-[#eeeeee]">
                                    <NavLink className="py-[12px]" to="/profile">
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="ml-3">Личная информация</span>
                                    </NavLink>
                                </li>
                                <li
                                    onClick={() => setShowChangePassword(true)}
                                    className="p-[12px] cursor-pointer hover:text-[#321fdb] hover:bg-[#eeeeee]"
                                >
                                    <FontAwesomeIcon icon={faKey} />
                                    <span className="ml-3">Сменить пароль</span>
                                </li>
                                <li
                                    onClick={handleSignOut}
                                    className="p-[12px] cursor-pointer hover:text-[#321fdb] hover:bg-[#eeeeee]"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    <span className="ml-3">Выйти из системы</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showChangePassword && <ChangePasswordForm setShowChangePassword={setShowChangePassword} />}
        </>
    );
};

export default Header;

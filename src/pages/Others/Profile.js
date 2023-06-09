import { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import ProfileForm from '~/components/Form/ProfileForm';
import * as authServices from '~/services/authServices';
import * as userServices from '~/services/userServices';
import { successNotify, errorNotify } from '~/components/ToastMessage';
import { AvatarContext } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [currUser, setCurrUser] = useState({});
    const [fileName, setFileName] = useState(JSON.parse(localStorage.getItem('imageName')));
    const [isSave, setIsSave] = useState(false);
    const [isRemove, setIsRemove] = useState(JSON.parse(localStorage.getItem('isRemoveAvatar')));
    const { isChangeAvatar, setIsChangeAvatar } = useContext(AvatarContext);

    const changeAvatar = async (e) => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('myFile', file);
        if (!file) return;
        const res = await userServices.changeAvatar(data);
        if (res.code === 200) {
            setFileName(res.fileName);
            successNotify(res.message);
            setIsChangeAvatar(!isChangeAvatar);
            setIsRemove(false);
        } else {
            errorNotify(res);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await authServices.getCurrUser();
            setCurrUser(res);
        };
        fetchApi();
    }, [isSave, isChangeAvatar]);

    const handleRemoveAvatar = async () => {
        const confirmMsg = 'Вы уверены, что хотите удалить аватар?';
        if (!window.confirm(confirmMsg)) return;
        if (!fileName) return;
        const res = await userServices.removeAvatar(fileName);
        if (res.code === 200) {
            successNotify(res.message);
            setIsChangeAvatar(!isChangeAvatar);
            setIsRemove(true);
        } else {
            errorNotify(res);
        }
    };

    useEffect(() => {
        localStorage.setItem('imageName', JSON.stringify(fileName));
    }, [isRemove, fileName]);

    useEffect(() => {
        localStorage.setItem('isRemoveAvatar', JSON.stringify(isRemove));
    }, [isRemove]);

    console.log(isRemove);

    return (
        <>
            <div className="flex flex-col xl:flex-row h-full gap-8">
                <div className="flex flex-col gap-8 w-full xl:w-[320px]">
                    <div className="flex w-full xl:w-[320px] h-[320px] bg-white shadow-4Way">
                        <div className="m-auto">
                            <label className="label">
                                <input
                                    className="hidden"
                                    disabled={isRemove === false ? true : false}
                                    type="file"
                                    name="myFile"
                                    onChange={(e) => changeAvatar(e)}
                                />
                                <figure className="relative w-[200px] h-[200px]">
                                    <img
                                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
                                        className="w-[200px] h-[200px] box-border rounded-full border-2 border-solid border-[#ccc] shadow-md transition-all hover:shadow-xl cursor-pointer"
                                        alt="avatar"
                                    />
                                    <figcaption className="flex cursor-pointer absolute top-0 w-full h-full rounded-full transition-all bg-[#000] opacity-0 hover:bg-[#000] hover:opacity-40">
                                        <img
                                            className="w-[50px] h-[50px] m-auto"
                                            src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                                            alt=""
                                        />
                                    </figcaption>
                                    <div
                                        className={
                                            isRemove === false ? 'group absolute top-0 w-[200px] h-[200px]' : 'hidden'
                                        }
                                    >
                                        {/*<img
                                            src={currUser.avatar}
                                            className="absolute top-0 w-full h-full box-border rounded-full border-2 border-solid border-[#ccc] shadow-md transition-all hover:shadow-xl"
                                            alt="avatar"
                                    />*/}
                                        <div
                                            onClick={handleRemoveAvatar}
                                            className="absolute top-0 right-0 hidden text-[2rem] group-hover:block cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                </figure>
                            </label>
                        </div>
                    </div>
                    <div className="w-full xl:w-[320px] h-fit bg-white p-[12px] shadow-4Way">
                        <div>
                            <h1 className="text-[2.2rem] font-bold mb-7">Все задачи</h1>
                            <h3 className="text-[1.4rem] font-semibold">Процесс завершения</h3>
                            <div className="w-full bg-gray-200 rounded-full mt-3">
                                <div className="w-[45%] bg-blue-600 text-[1.4rem] font-medium text-blue-100 text-center p-1.5 leading-none rounded-full">
                                    45%
                                </div>
                            </div>
                            <div className="flex justify-between mt-9">
                                <div>
                                    <h3 className="text-[1.4rem] text-white px-2 rounded-xl bg-[#cccccc]">Назначено</h3>
                                    <p className="font-semibold text-[#cccccc] text-center">6</p>
                                </div>
                                <div>
                                    <h3 className="text-[1.4rem] text-white px-2 rounded-xl bg-green-600">
                                        Завершено
                                    </h3>
                                    <p className="font-semibold text-green-600 text-center">1</p>
                                </div>
                                <div>
                                    <h3 className="text-[1.4rem] text-white px-2 rounded-xl bg-red-600">
                                        Незакончено
                                    </h3>
                                    <p className="font-semibold text-red-600 text-center">5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="px-10 bg-white h-fit shadow-4Way">
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Фамилия Имя Отчество:</span>{' '}
                            <span className="flex-1">{currUser?.fullName}</span>
                        </p>
                        <hr />
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Пол:</span>{' '}
                            <span className="flex-1">{currUser?.gender}</span>
                        </p>
                        <hr />
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Дата рождения:</span>{' '}
                            <span className="flex-1">{currUser?.birthDate}</span>
                        </p>
                        <hr />
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Email:</span>{' '}
                            <span className="flex-1">{currUser?.email}</span>
                        </p>
                        <hr />
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Номер телефона:</span>{' '}
                            <span className="flex-1">{currUser?.phoneNumber}</span>
                        </p>
                        <hr />
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Отдел:</span>{' '}
                            <span className="flex-1">{currUser?.department}</span>
                        </p>
                        <hr />
                        <p className="flex text-[1.8rem] py-[12px]">
                            <span className="mr-5 lg:mr-0 lg:w-[240px] font-bold">Роли:</span>{' '}
                            <span className="flex-1">{currUser?.role}</span>
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => setShowProfileForm(true)}
                            className="w-full lg:w-fit text-[1.5rem] text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s] mt-7"
                        >
                            Редактировать
                        </button>
                    </div>
                </div>
            </div>
            {showProfileForm && (
                <ProfileForm
                    formTitle="Редактировать личную информацию"
                    setShowForm={setShowProfileForm}
                    setIsSave={() => setIsSave(!isSave)}
                />
            )}
        </>
    );
};

export default Profile;

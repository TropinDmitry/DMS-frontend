import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const AdminTaskDetail = () => {
    const [tab, setTab] = useState('detail');

    const onUpdateTab = (value) => {
        setTab(value);
    };

    const setLevelColor = (level) => {
        if (level === 'Срочный') {
            return 'w-fit px-6 py-4 level priority';
        } else if (level === 'Сверх срочный') {
            return 'w-fit px-6 py-4 level emergency';
        } else {
            return 'w-fit px-6 py-4 level normal';
        }
    };
    return (
        <>
            <ul class="flex flex-wrap text-[1.5rem] font-medium text-center text-gray-500">
                <li onClick={() => onUpdateTab('detail')} class="mr-2 cursor-pointer">
                    <h3
                        class={
                            tab === 'detail'
                                ? 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white activeTab'
                                : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white'
                        }
                    >
                        Подробности
                    </h3>
                </li>
                <li onClick={() => onUpdateTab('resources')} class="mr-2 cursor-pointer">
                    <h3
                        class={
                            tab === 'resources'
                                ? 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white activeTab'
                                : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white'
                        }
                    >
                        Ресурсы
                    </h3>
                </li>
            </ul>
            <div className="bg-white p-[16px] mb-5 shadow-4Way">
                <div className={tab === 'detail' ? '' : 'hidden'}>
                    <div>
                        <h3 className="text-[2rem] font-bold">
                            Заголовок{' '}
                            <span className={setLevelColor('Сверх срочный')}>Сверх срочный</span>
                        </h3>
                        <p className="text-[1.4rem] mt-6">
                            Система документооборота
                            Система документооборота
                            Система документооборота
                            Система документооборота
                            Система документооборота
                        </p>
                        <div className="flex items-center mt-12">
                            <div className="flex-1">
                                <h3 className="text-[1.8rem] font-bold">Дата начала:</h3>
                                <p className="text-[1.4rem]">20/05/2023 12:00</p>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[1.8rem] font-bold">Дата окончания:</h3>
                                <p className="text-[1.4rem]">20/05/2023 12:00 PM</p>
                            </div>
                        </div>
                        <div className="mt-12">
                            <h3 className="text-[1.8rem] font-bold">Прогресс:</h3>
                            <div className="bg-gray-200 rounded-full mt-3">
                                <div className="progress-bar full">
                                    <span>100%</span> <span>Завершено</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <h3 className="text-[1.8rem] font-bold">Исполнители:</h3>
                            <div className="flex -space-x-2">
                                <img
                                    className="inline-block h-[35px] w-[35px] rounded-full ring-2 ring-white"
                                    src="https://e7.pngegg.com/pngimages/409/285/png-clipart-computer-icons-icon-design-user-others-face-head.png"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-[35px] w-[35px] rounded-full ring-2 ring-white"
                                    src="https://w7.pngwing.com/pngs/496/687/png-transparent-icon-user-avatar-profile-person-symbol.png"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-[35px] w-[35px] rounded-full ring-2 ring-white"
                                    src="https://e7.pngegg.com/pngimages/409/285/png-clipart-computer-icons-icon-design-user-others-face-head.png"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-[35px] w-[35px] rounded-full ring-2 ring-white"
                                    src="https://w7.pngwing.com/pngs/496/687/png-transparent-icon-user-avatar-profile-person-symbol.png"
                                    alt=""
                                />
                                <div className="hs-dropdown relative inline-flex [--placement:top-left]">
                                    <button
                                        id="hs-dropdown-avatar-more"
                                        className="hs-dropdown-toggle inline-flex items-center justify-center h-[35px] w-[35px] rounded-full bg-gray-200 border-2 border-white font-medium text-gray-700 shadow-sm align-middle hover:bg-gray-300 focus:outline-none focus:bg-blue-100 focus:text-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                                    >
                                        <span className="font-medium leading-none">9+</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <h3 className="text-[1.8rem] font-bold">Вложения:</h3>
                            <ul>
                                <li>Test.docx</li>
                                <li>Test.docx</li>
                                <li>Test.docx</li>
                                {/* <li className={userRole === 'Member' ? 'pointer-events-none opacity-40' : ''}>
                                    <label
                                        className="text-center text-[1.4rem] leading-[1] font-bold text-blue-700 bg-transparent py-[6px] rounded-3xl cursor-pointer"
                                        htmlFor="upload"
                                    >
                                        <FontAwesomeIcon icon={faPlusCircle} /> Добавить
                                    </label>
                                    <input
                                        id="upload"
                                        className="absolute opacity-0 z-[-1] rounded-3xl"
                                        type="file"
                                        name="myFile"
                                        onChange={(e) => setAttachFiles(e.target.files)}
                                        multiple
                                    />
                                </li> */}
                            </ul>
                        </div>
                        <div className="mt-12">
                            <h3 className="text-[1.8rem] font-bold">Ссылки по теме:</h3>
                            <a className="text-[1.4rem]" href="!#">
                                DEN 2
                            </a>
                        </div>
                    </div>
                    <div className="block md:flex items-center gap-5 mt-12">
                        <NavLink
                            to="/tasks/edit/123"
                            className="block w-full md:w-fit text-center text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} /> Редактировать
                        </NavLink>
                        <button className="w-full md:w-fit text-center text-[white] bg-red-600 mt-4 md:mt-0 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]">
                            <FontAwesomeIcon icon={faTrashCan} /> Удалить
                        </button>
                    </div>
                </div>
                <div className={tab === 'resources' ? '' : 'hidden'}>Вкладка ресурсы</div>
            </div>
        </>
    );
};

export default AdminTaskDetail;

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import DropList from '~/components/DropList';
import InputField from '~/components/InputField';

const Tasks = () => {
    const levelOptions = ['Несрочный', 'Срочный', 'Сверх срочный'];
    const statusOptions = ["Инициализация", "В работе", "Завершение"];
    return (
        <>
            <div className="bg-white p-[16px] mb-5 shadow-4Way">
                <h1 className="text-[2rem] md:text-[2.4rem] font-bold">Поиск</h1>

                <div className="flex flex-col md:flex-row gap-5 mt-5">
                    <div className="flex-1">
                        <label className="text-[1.4rem]">Должность:</label>
                        <InputField className="default" placeholder="Название должности" />
                    </div>
                    <div className="flex-1">
                        <label className="text-[1.4rem]">Дата начала:</label>
                        <InputField name="date" className="default leading-[1.3]" />
                    </div>
                    <div className="flex-1">
                        <label className="text-[1.4rem]">Дата окончания:</label>
                        <InputField name="date" className="default leading-[1.3]" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 mt-[12.5px]">
                    <div className="flex-1">
                        <label className="text-[1.4rem]">Статус:</label>
                        <DropList options={statusOptions} />
                    </div>
                    <div className="flex-1">
                        <label className="text-[1.4rem]">Уровень важности:</label>
                        <DropList options={levelOptions} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-full md:w-[50%] text-[1.3rem] md:text-[1.6rem] text-[white] bg-red-600 mt-[20px] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]">
                        <FontAwesomeIcon icon={faFilterCircleXmark} /> Удалить фильтры
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-between bg-[#f7f7f7] p-[16px] border border-solid border-[#cccccc] mb-[12px] shadow-4Way">
                <h1 className="text-[1.8rem] md:text-[2.4rem] font-bold">Список задач</h1>
                <div className="flex md:flex-col lg:flex-row items-center gap-5 mt-3 md:mt-0">
                    <NavLink
                        to="/tasks/create"
                        className="text-[1.3rem] w-full lg:w-fit md:text-[1.6rem] text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        <FontAwesomeIcon icon={faPlusCircle} /> Добавить
                    </NavLink>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <NavLink to="/tasks/detail/123">
                    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                        <h5 className="mb-2 text-[1.5rem] font-bold text-gray-900 block-ellipsis">
                            Заголовок
                        </h5>
                        <p className="text-[1.3rem] font-normal text-gray-700">20/01/2023</p>
                        <hr className="my-8" />
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
                </NavLink>
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                    <h5 className="mb-2 text-[1.5rem] font-bold text-gray-900 block-ellipsis">
                        Заголовок
                    </h5>
                    <p className="text-[1.3rem] font-normal text-gray-700">20/01/2023</p>
                    <hr className="my-8" />
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
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                    <h5 className="mb-2 text-[1.5rem] font-bold text-gray-900 block-ellipsis">
                        Заголовок
                    </h5>
                    <p className="text-[1.3rem] font-normal text-gray-700">20/01/2023</p>
                    <hr className="my-8" />
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
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                    <h5 className="mb-2 text-[1.5rem] font-bold text-gray-900 block-ellipsis">
                        Заголовок
                    </h5>
                    <p className="text-[1.3rem] font-normal text-gray-700">20/01/2023</p>
                    <hr className="my-8" />
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
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                    <h5 className="mb-2 text-[1.5rem] font-bold text-gray-900 block-ellipsis">
                        Заголовок
                    </h5>
                    <p className="text-[1.3rem] font-normal text-gray-700">20/01/2023</p>
                    <hr className="my-8" />
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
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                    <h5 className="mb-2 text-[1.5rem] font-bold text-gray-900 block-ellipsis">
                        Заголовок
                    </h5>
                    <p className="text-[1.3rem] font-normal text-gray-700">20/01/2023</p>
                    <hr className="my-8" />
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
            </div>
        </>
    );
};

export default Tasks;

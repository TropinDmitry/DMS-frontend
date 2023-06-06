import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentItem from '~/components/CommentItem';
import InputField from '~/components/InputField';

const MemberTaskDetail = () => {
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
        <div className="block lg:flex lg:items-start lg:gap-4">
            <div>
                <div className="bg-white p-[16px] mb-5 shadow-4Way flex-[5]">
                    <div>
                        <h3 className="text-[2rem] font-bold">
                            Заголовок{' '}
                            <span className={setLevelColor('Сверх срочный')}>Сверх срочный</span>
                        </h3>
                        <p className="text-[1.3rem]">
                            Прибытие <span>20/01/2023 12:00</span>
                        </p>
                        <hr className="my-7 border-[1.5px] border-black" />
                        <p className="text-[1.4rem]">
                            Система документооборота
                            Система документооборота
                            Система документооборота
                            Система документооборота
                            Система документооборота
                        </p>
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
                </div>
                <div className="bg-white p-[16px] mb-5 shadow-4Way flex-[2]">
                    <h3>Комментарии</h3>
                    <form>
                        <InputField textarea className="default" rows="3" cols="50" placeholder="Напиши что-нибудь..." />
                        <button className="w-full md:w-fit text-[1.4rem] text-center text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]">
                            Отправить
                        </button>
                    </form>
                    <ul className="mt-5">
                        <CommentItem
                            img="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
                            username="Member 1"
                            content="Аватар"
                            cmtDate="20/01/2023"
                        />
                        <CommentItem
                            img="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
                            username="Member 1"
                            content="Аватар"
                            cmtDate="20/01/2023"
                        />
                        <CommentItem
                            img="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
                            username="Member 1"
                            content="Аватар"
                            cmtDate="20/01/2023"
                        />
                    </ul>
                </div>
            </div>
            <div className="bg-white p-[16px] mb-5 shadow-4Way flex-[2]">
                <div className="flex items-center justify-between font-semibold">
                    <h3 className="text-[2rem]">Ваша работа</h3>
                    <p className="text-[1.4rem]">Представлена</p>
                </div>
                <div className="mt-7">
                    <a href="!#" className="flex flex-col text-[1.4rem] px-[16px] py-[6px] mb-3 rounded-md border">
                        <span className="w-full lg:w-[200px] xl:w-[250px] truncate font-semibold">
                            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest.docx
                        </span>
                        <span>Docx</span>
                    </a>
                    <a href="!#" className="flex flex-col text-[1.4rem] px-[16px] py-[6px] mb-3 rounded-md border">
                        <span className="w-[200px] xl:w-[250px] truncate font-semibold">Test.docx</span>
                        <span>Docx</span>
                    </a>
                    <a href="!#" className="flex flex-col text-[1.4rem] px-[16px] py-[6px] mb-3 rounded-md border">
                        <span className="w-[200px] xl:w-[250px] truncate font-semibold">Test.docx</span>
                        <span>Docx</span>
                    </a>
                    <div className="w-full">
                        <label
                            className="block w-full text-center text-[1.4rem] leading-[1] font-bold text-blue-700 bg-transparent py-[6px] rounded-3xl border border-dashed border-blue-700 cursor-pointer"
                            htmlFor="upload"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </label>
                        <input
                            id="upload"
                            className="absolute opacity-0 z-[-1] rounded-3xl"
                            type="file"
                            name="myFile"
                            // onChange={(e) => setAttachFiles(e.target.files)}
                            // multiple
                        />
                    </div>
                </div>
                <button className="w-full text-[1.4rem] text-[white] bg-blue-600 mt-7 px-[16px] py-[6px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]">
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default MemberTaskDetail;

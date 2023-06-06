import { useState, useEffect } from 'react';
import {
    faAngleDown,
    faAngleRight,
    faArchive,
    faArrowTurnDown,
    faArrowTurnUp,
    faFileAlt,
    faFileWord,
    faGauge,
    faLayerGroup,
    faListCheck,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';
import SidebarItem from '~/components/SidebarItem';

const Sidebar = () => {
    const [toggleSubMenu, setToggleSubMenu] = useState(false);
    const [userRole, setUserRole] = useState(/*JSON.parse(localStorage.getItem('userRole'))*/ 'Администратор');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const decodedToken = jwt_decode(token);
        setUserRole(decodedToken.role);
    }, []);
    {/*EFEFEF */}
    return (
        <div className="w-full h-full bg-[#004C5C] overflow-auto">
            <div className="flex h-[64px] bg-[#004C5C]">
                <h1 className="text-white text-[3.6rem] m-auto">
                    DMS <span className="text-[1.6rem]">front-end</span>
                </h1>
            </div>
            <ul>
                {/*<SidebarItem path="/dashboard" icon={faGauge} title="Панель управления" />*/}
                <SidebarItem path="/archives" icon={faArchive} title="Архивы документов" />
                <div className={userRole === 'Модератор' || userRole === 'Администратор' ? '' : 'hidden'}>
                    <SidebarItem path="/document-types" icon={faFileWord} title="Тип документа" />
                </div>
                <SidebarItem
                    onClick={() => setToggleSubMenu(!toggleSubMenu)}
                    className="hello"
                    path="/documents"
                    icon={faFileAlt}
                    title="Документы"
                    firstElement={
                        <FontAwesomeIcon
                            className="absolute top-[50%] translate-y-[-50%] right-[16px] text-[#ffffff]/[0.3]"
                            icon={toggleSubMenu ? faAngleDown : faAngleRight}
                        />
                    }
                    secondElement={
                        <ul
                            className={
                                !toggleSubMenu
                                    ? 'max-h-0 transition-height duration-[1s] overflow-hidden'
                                    : 'max-h-[300px] transition-height duration-[1.5s] overflow-hidden'
                            }
                        >
                            <SidebarItem path="/documents/documents-in" icon={faArrowTurnDown} title="Входящие документы" />
                            <SidebarItem path="/documents/documents-out" icon={faArrowTurnUp} title="Исходящие документы" />
                        </ul>
                    }
                />

                <SidebarItem path="/tasks" icon={faListCheck} title="Задачи" />
                <div className={userRole === 'Модератор' || userRole === 'Администратор' ? '' : 'hidden'}>
                    <SidebarItem path="/departments" icon={faLayerGroup} title="Отделы" />
                </div>
                <div className={userRole === 'Администратор' ? '' : 'hidden'}>
                    <SidebarItem path="/users" icon={faUsers} title="Пользователи" />
                </div>
                <div className='flex items-center justify-center h-12 w-20 bg-[#000C78] border border-[#cccccc] text-[1.8rem] rounded-[8px] ml-40 mt-[350px]'>
                    <button className='text-white'>РУС</button>
                </div>
            </ul>
        </div>
    );
};

export default Sidebar;

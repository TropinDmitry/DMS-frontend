import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faPlusCircle,
    faTrashCan,
    faSearch,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import SwitchButton from '~/components/SwitchButton';
import DepartmentCard from '~/components/Card/DepartmentCard';
import InputField from '~/components/InputField';
import * as departmentServices from '~/services/departmentServices';
import { successNotify, errorNotify } from '~/components/ToastMessage';

const Department = () => {
    const [searchValue, setSearchValue] = useState('');
    const [allDepartments, setAllDepartments] = useState(['1', '1', '1', '1', '1', '1', '1']);
    const [departmentLists, setDepartmentLists] = useState(['1', '1', '1', '1', '1', '1', '1']);
    
    const departmentNames = ["Отдел продаж", "Отдел маркетинга", "Отдел разработки", "Отдел продаж", "Отдел продаж", "Отдел продаж", "Отдел продаж"];

    const [activeId, setActiveId] = useState('');
    const [isActived, setIsActived] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [rowStart, setRowStart] = useState(1);
    const [rowEnd, setRowEnd] = useState(0);
    const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('departmentChecked')) || []);
    const [checkedAll, setCheckedAll] = useState(JSON.parse(localStorage.getItem('isCheckAllDepartment')) || false);

    const totalPage = Math.ceil(allDepartments?.length / limit);

    const handleNextPage = () => {
        setPage(page + 1);
        setRowStart(rowStart + 5);
        setRowEnd(rowEnd + 5);
    };

    const handlePrevPage = () => {
        setPage(page - 1);
        setRowStart(rowStart - 5);
        setRowEnd(rowEnd - 5);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await departmentServices.getAllDepartment(page, Number(limit));
            setAllDepartments(res.allDepartments);
            //setDepartmentLists(res.data);
        };
        fetchApi();
    }, [isSave, page, limit]);

    useEffect(() => {
        if (!limit) return;
        setPage(1);
        setRowStart(1);
        setRowEnd(0);
    }, [limit]);

    useEffect(() => {
        if (!activeId) return;
        const handleActivateDepartment = async () => {
            const data = {
                status: isActived,
            };
            const res = await departmentServices.activateDepartment(activeId, data);
            if (res.code === 200) {
                successNotify(res.message);
                setIsSave((isSave) => !isSave);
            } else {
                errorNotify(res);
            }
        };
        handleActivateDepartment();
    }, [activeId, isActived]);

    const handleCheck = (id) => {
        setChecked((prev) => {
            const isChecked = checked?.includes(id);
            if (isChecked) {
                setCheckedAll(false);
                return checked?.filter((item) => item !== id);
            } else {
                if ([...prev, id].length === allDepartments?.length) {
                    setCheckedAll(true);
                }
                return [...prev, id];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('departmentChecked', JSON.stringify(checked));
    }, [checked]);

    useEffect(() => {
        localStorage.setItem('isCheckAllDepartment', JSON.stringify(checkedAll));
    }, [checkedAll]);

    const isCheckedAll = () => {
        return checked?.length === allDepartments?.length;
    };

    useEffect(() => {
        const handleCheckAll = () => {
            const idsArray = [];
            if (checkedAll === false) {
                if (checked?.length === allDepartments?.length) {
                    return setChecked([]);
                }
                return setChecked((checked) => checked);
            }
            allDepartments?.map((item) => {
                return idsArray.push(item._id);
            });
            setChecked(idsArray);
        };
        handleCheckAll();
    }, [checkedAll, allDepartments, checked?.length]);

    const handleDelete = async (id) => {
        const confirmMsg = 'Вы уверены, что хотите безвозвратно удалить отдел?';
        if (!window.confirm(confirmMsg)) return;
        const res = await departmentServices.deleteDepartmentById(id);
        if (res.code === 200) {
            successNotify(res.message);
            setIsSave((isSave) => !isSave);
        } else {
            errorNotify(res);
        }
    };

    const handleDeleteMany = async () => {
        const confirmMsg = 'Вы уверены, что хотите безвозвратно удалить выбранные отделы?';
        if (!window.confirm(confirmMsg)) return;
        const data = {
            arrayId: checked,
        };
        const res = await departmentServices.deleteManyDepartment(data);
        if (res.code === 200) {
            successNotify(res.message);
            setChecked([]);
            setPage(1);
            setRowStart(1);
            setRowEnd(0);
            setIsSave((isSave) => !isSave);
        } else {
            errorNotify(res);
        }
    };

    return (
        <>
            <div className="bg-white p-[16px] mb-5 shadow-4Way">
                <h1 className="text-[1.8rem] md:text-[2.4rem] font-bold">Поиск</h1>
                <form>
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <div className="relative w-full">
                            <InputField
                                className="default icon"
                                placeholder="Название отдела"
                                value={searchValue}
                                setValue={setSearchValue}
                            />
                            <div className="flex absolute top-[50%] translate-y-[-50%] left-0 w-[45px] h-[45px]">
                                <FontAwesomeIcon className="text-[#a9a9a9] m-auto" icon={faSearch} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-between bg-[#f7f7f7] p-[16px] border border-solid border-[#cccccc] mb-[12px] md:mb-0 shadow-4Way">
                <h1 className="text-[1.8rem] md:text-[2.4rem] font-bold">Список отделов</h1>
                <div className="flex md:flex-col lg:flex-row items-center gap-5 mt-3 md:mt-0">
                    <button
                        onClick={handleDeleteMany}
                        className={
                            checked?.length > 1
                                ? 'text-[1.3rem] w-full lg:w-fit md:text-[1.6rem] text-[white] bg-red-600 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s] whitespace-nowrap'
                                : 'hidden'
                        }
                    >
                        <FontAwesomeIcon icon={faTrashCan} /> Удалить <span>({checked?.length})</span> элементов
                    </button>
                    <NavLink
                        to="/departments/create"
                        className="text-[1.3rem] w-full lg:w-fit md:text-[1.6rem] text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        <FontAwesomeIcon icon={faPlusCircle} /> Добавить
                    </NavLink>
                </div>
            </div>
            <div className="hidden md:flex flex-col bg-white shadow-4Way">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-[1.4rem] font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedAll()}
                                                    onChange={(e) => setCheckedAll(e.target.checked)}
                                                />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Название отдела
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Статус
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Записи
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Функции
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&>*:nth-child(odd)]:bg-[#f9fafb]">
                                    {departmentLists?.length !== 0 ? (
                                        departmentLists?.map((dl, index) => {
                                            return (
                                                <tr key={index} className="border-b dark:border-neutral-500">
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={checked?.includes(dl?._id)}
                                                                onChange={() => handleCheck(dl?._id)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        {index + 1}
                                                    </td>
                                                    <td className="relative group whitespace-nowrap px-6 py-4 max-w-[200px]">
                                                        <p title={dl?.departmentName} className="w-[200px] truncate">
                                                            {departmentNames[index]}
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center">
                                                            <SwitchButton
                                                                checked={dl?.status}
                                                                setValue={() => setIsActived(!dl?.status)}
                                                                setId={() => setActiveId(dl?._id)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="relative group whitespace-nowrap px-6 py-4 max-w-[200px]">
                                                        <p title={dl?.note} className="w-[200px] truncate">
                                                            {dl?.note}
                                                        </p>
                                                    </td>
                                                    <td className="px-2 py-1 md:px-6 md:py-4">
                                                        <div className="flex items-center text-white">
                                                            <NavLink to={`/departments/edit/${dl?._id}`}>
                                                                <div className="flex w-[30px] h-[30px] bg-green-600 p-2 rounded-lg cursor-pointer hover:text-primary">
                                                                    <FontAwesomeIcon
                                                                        className="m-auto"
                                                                        icon={faPenToSquare}
                                                                    />
                                                                </div>
                                                            </NavLink>
                                                            <div
                                                                onClick={() => handleDelete(dl?._id)}
                                                                className="flex w-[30px] h-[30px] bg-red-600 p-2 ml-2 rounded-lg cursor-pointer hover:text-primary"
                                                            >
                                                                <FontAwesomeIcon className="m-auto" icon={faTrashCan} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center p-5">
                                                Данные не найдены
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 mx-5">
                    <div className="flex items-center text-[1.5rem]">
                        <select
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            className="bg-inherit border border-[#cccccc] text-[1.5rem] rounded-[8px] block w-fit px-[14px] py-[8px] outline-none"
                        >
                            <option value={5}>5 элементов</option>
                            <option value={10}>10 элементов</option>
                            <option value={100}>100 элементов</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <p className="text-[1.5rem] mr-9">
                            Показать <span>{departmentLists?.length === 0 ? 0 : rowStart}</span> по{' '}
                            <span>{rowEnd + departmentLists?.length}</span> из <span>{allDepartments?.length}</span>{' '}
                            элементов
                        </p>
                        <div
                            onClick={handlePrevPage}
                            className={
                                page <= 1
                                    ? 'flex items-center justify-center w-[35px] h-[35px] hover:bg-[#dddddd] rounded-full cursor-pointer pointer-events-none opacity-30'
                                    : 'flex items-center justify-center w-[35px] h-[35px] hover:bg-[#dddddd] rounded-full cursor-pointer'
                            }
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div
                            onClick={handleNextPage}
                            className={
                                page >= totalPage
                                    ? 'flex items-center justify-center w-[35px] h-[35px] hover:bg-[#dddddd] rounded-full cursor-pointer pointer-events-none opacity-30'
                                    : 'flex items-center justify-center w-[35px] h-[35px] hover:bg-[#dddddd] rounded-full cursor-pointer'
                            }
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="flex items-center justify-between mb-5">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isCheckedAll()}
                            onChange={(e) => setCheckedAll(e.target.checked)}
                        />{' '}
                        <p className="ml-3 mt-1">Выбрать все</p>
                    </label>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className="bg-inherit border border-[#cccccc] text-[1.5rem] rounded-[8px] block w-fit px-[14px] py-[8px] outline-none"
                    >
                        <option value={5}>5 элементов</option>
                        <option value={10}>10 элементов</option>
                        <option value={100}>100 элементов</option>
                    </select>
                </div>
                {departmentLists?.length !== 0 ? (
                    departmentLists?.map((dl, index) => {
                        return (
                            <DepartmentCard
                                key={index}
                                id={index + 1}
                                departmentId={dl?._id}
                                departmentName={dl?.departmentName}
                                note={dl?.note}
                                activeValue={dl?.status}
                                activeChecked={dl?.status}
                                setIsActived={() => setIsActived(!dl?.status)}
                                setActiveId={() => setActiveId(dl?._id)}
                                handleDelete={() => handleDelete(dl?._id)}
                                checkBox={checked?.includes(dl?._id)}
                                handleCheckBox={() => handleCheck(dl?._id)}
                            />
                        );
                    })
                ) : (
                    <p className="text-center p-5">Данные не найдены</p>
                )}

                <div className="flex items-center justify-center">
                    <div
                        onClick={handlePrevPage}
                        className={
                            page <= 1
                                ? 'bg-[#cccccc] px-[8px] py-[4px] rounded-md mx-1 cursor-pointer hover:bg-[#bbbbbb] pointer-events-none opacity-30'
                                : 'bg-[#cccccc] px-[8px] py-[4px] rounded-md mx-1 cursor-pointer hover:bg-[#bbbbbb]'
                        }
                    >
                        Назад
                    </div>
                    <div
                        onClick={handleNextPage}
                        className={
                            page >= totalPage
                                ? 'bg-[#cccccc] px-[8px] py-[4px] rounded-md mx-1 cursor-pointer hover:bg-[#bbbbbb] pointer-events-none opacity-30'
                                : 'bg-[#cccccc] px-[8px] py-[4px] rounded-md mx-1 cursor-pointer hover:bg-[#bbbbbb]'
                        }
                    >
                        Вперед
                    </div>
                </div>
            </div>
        </>
    );
};

export default Department;

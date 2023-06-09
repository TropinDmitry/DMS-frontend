import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import InputField from '~/components/InputField';
import * as documentTypeServices from '~/services/documentTypeServices';
import { fullNameValidator } from '~/utils/formValidation';
import { successNotify, errorNotify } from '~/components/ToastMessage';

const CreateDocumentType = ({ title }) => {
    const [fullName, setFullName] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState(false);

    const [fullNameErrMsg, setFullNameErrMsg] = useState({});
    const [isFullNameErr, setIsFullNameErr] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const statusList = [
        ['В работе', true],
        ['Неактивный', false],
    ];

    useEffect(() => {
        if (!id) return;
        const fetchApi = async () => {
            const res = await documentTypeServices.getDocumentTypeById(id);
            setFullName(res.data.documentTypeName);
            setStatus(res.data.status);
            setNote(res.data.note);
        };
        fetchApi();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isfullNameValid = fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg);
        if (!isfullNameValid) return;
        const data = {
            documentTypeName: fullName,
            status: status,
            note: note,
        };
        let res;
        if (id) {
            res = await documentTypeServices.updateDocumentType(id, data);
        } else {
            res = await documentTypeServices.createDocumentType(data);
        }
        if (res.code === 200) {
            successNotify(res.message);
            navigate('/document-types');
        } else {
            errorNotify(res);
        }
    };

    return (
        <div className="bg-white p-[16px] shadow-4Way border-t-[3px] border-blue-600">
            <h1 className="text-[2rem] font-bold">{title}</h1>
            <form>
                <div className="mt-8">
                    <label className="font-bold">Название:</label>
                    <InputField
                        className={isFullNameErr ? 'invalid' : 'default'}
                        placeholder="Введите текст"
                        value={fullName}
                        setValue={setFullName}
                        onBlur={() => fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg)}
                    />
                    <p className="text-red-600 text-[1.3rem]">{fullNameErrMsg.fullName}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center mt-7">
                    <label className="font-bold mr-7">Статус:</label>
                    <div className="flex items-center">
                        {statusList.map((st, index) => {
                            return (
                                <div key={index} className="flex items-center mr-5">
                                    <InputField
                                        name="radio"
                                        className="flex w-[15px] h-[15px]"
                                        checked={status === st[1]}
                                        setValue={() => setStatus(st[1])}
                                    />
                                    <label className="text-[1.5rem] ml-3">{st[0]}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-7">
                    <label className="font-bold">Записи:</label>
                    <InputField
                        textarea
                        className="default"
                        rows="6"
                        cols="50"
                        placeholder="Записи"
                        value={note}
                        setValue={setNote}
                    />
                </div>
                <div className="block md:flex items-center gap-5 mt-12">
                    <button
                        onClick={handleSubmit}
                        className="w-full md:w-fit text-center text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        <FontAwesomeIcon icon={faFloppyDisk} /> Сохранить
                    </button>
                    <NavLink
                        to="/document-types"
                        className="block w-full md:w-fit text-center text-[white] bg-red-600 mt-4 md:mt-0 px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        <FontAwesomeIcon icon={faXmark} /> Отменить
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default CreateDocumentType;

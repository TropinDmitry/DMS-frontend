import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FcFolder } from "react-icons/fc";
import { FaPen } from "react-icons/fa";
import InputField from '~/components/InputField';
import { NavLink, useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux"
const CHANGE_FOLDER = 'CHANGE_FODLER'

const Archives = () => {

  const [archives, setArchives] = useState(['forder1', 'folder 2', 'fodler 3', 'folder 4', 'folder 5', 'folder 6']);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchIndex, setSearchIndex] = useState(false);
  const [searchText, setSearchText] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    try {
      const response = await axios.get();
      setArchives(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchIndexChange = (event) => {
    setSearchIndex(!searchIndex);
  }

  const handleSearchTextChange = (event) => {
    setSearchText(!searchText);
  }

  const handleDoubleClick = (itemId) => {
      dispatch(changeFolder(itemId))
      navigate(`/dashboard/folder/${itemId}`)
  }

  const filteredArchives = archives.filter((archive) =>
    (searchIndex && searchIndex === true ? archive.index.includes(searchTerm) : true) &&
    (searchText && searchText === true ? archive.text.includes(searchTerm) : true)
  );

  const setChangeFolder = (payload) => ({
    type: CHANGE_FOLDER,
    payload
})

  const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId))
}

  return (
    <div>
        <div className="bg-white p-[16px] mb-5 shadow-4Way">
            <h1 className="text-[2rem] md:text-[2.4rem] font-bold">Поиск</h1>
            <form>
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <div className="relative w-full">
                            <InputField
                                className="default icon"
                                placeholder="Введите текст"
                                value={searchValue}
                                setValue={setSearchValue}
                            />
                            <div className="flex absolute top-[50%] translate-y-[-50%] left-0 w-[45px] h-[45px]">
                                <FontAwesomeIcon className="text-[#a9a9a9] m-auto" icon={faSearch} />
                            </div>
                        </div>
                    </div>
                </form>
            <div className='mt-6'>
                <label className='px-5'>
                <input type="checkbox" checked={searchIndex} onChange={handleSearchIndexChange} 
                    className='h-7 w-7 mr-3 rounded-full shadow' />
                    По индексу
                </label>
                <label className='px-5'>
                <input type="checkbox" checked={searchText} onChange={handleSearchTextChange}
                    className='h-7 w-7 mr-3 rounded-full shadow' />
                    По тексту
                </label>
            </div>
        </div>
      
        <div className="flex flex-col md:flex-row md:justify-between bg-[#f7f7f7] p-[16px] 
                border border-solid border-[#cccccc] mb-[12px] md:mb-0 shadow-4Way">
        <h1 className="text-[2rem] md:text-[2.4rem] font-bold">Архивы документов</h1>
        <div className="flex md:flex-col lg:flex-row gap-5 mt-3 md:mt-0">
            <NavLink
                        to="/archives/add"
                        className="h-50 text-[1.3rem] w-full lg:w-fit md:text-[1.6rem] text-[white] bg-[#321fdb] px-[16px] py-[8px] rounded-md hover:bg-[#1b2e4b] transition-all duration-[1s]"
                    >
                        <FontAwesomeIcon icon={faPlusCircle} /> Добавить новую папку
            </NavLink>
        </div>
      </div>
        <div className="flex flex-wrap md:flex bg-white shadow-4Way">
        {
          filteredArchives.map((archive) => {
                return (
                    <p 
                      key={archive * 55} 
                      className="my-bgc border col-span-1 px-6 py-4 flex flex-col items-center justify-center"
                      onDoubleClick={() => handleDoubleClick(archive)}
                    >
                    <div className="mb-3 flex flex-col md:flex-row md:justify-between">
                        <FcFolder className='h-40 w-60 -mr-8'/>
                        <div>
                            <FaPen className='w-7 h-7 mt-3'/>
                            <ImCross className='w-7 h-7 mt-3'/>
                        </div>
                    </div>
                    
                    
                    
                    {archive}
                      {/*
                        item.data.name.length > 13
                          ? item.data.name.slice(0, 10) + "..."
                          : item.data.name
                        */}
                    </p>
                )
            })
        }
      </div>
    </div>
  );
};

export default Archives;
/*import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";

function EditArchive() {
  const [title, setTitle] = useState("");
  const [isNotificationChecked, setIsNotificationChecked] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      name: "Name 1",
      type: "Type 1",
      required: "Yes",
      editable: "No",
      functions: "",
    },
    {
      key: "2",
      name: "Name 2",
      type: "Type 2",
      required: "No",
      editable: "Yes",
      functions: "",
    },
    {
      key: "3",
      name: "Name 3",
      type: "Type 3",
      required: "Yes",
      editable: "No",
      functions: "",
    },
    {
      key: "4",
      name: "Name 4",
      type: "Type 4",
      required: "No",
      editable: "Yes",
      functions: "",
    },
  ]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNotificationChange = (e) => {
    setIsNotificationChecked(e.target.checked);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
    },
    {
      title: "Editable",
      dataIndex: "editable",
      key: "editable",
    },
    {
      title: "Functions",
      dataIndex: "functions",
      key: "functions",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold mb-5">Properties of Document Archive</div>
      <div className="flex justify-between mb-5 w-full">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Property
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Open Archive
        </button>
      </div>
      <div className="hidden md:flex flex-col bg-white shadow-4Way">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-[1.4rem] font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
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
                                                            {dl?.departmentName}
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
            </div>


      <div className="flex justify-between mt-10 w-full">
        <div className="flex items-center">
          <div className="mr-5">Change Title:</div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter new title"
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
      <div className="flex justify-between mt-10 w-full">
        <div className="flex items-center">
          <div className="mr-5">Notify Users:</div>
          <input
            type="checkbox"
            checked={isNotificationChecked}
            onChange={handleNotificationChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
}

export default EditArchive;*/
const DropList = ({ selectedValue, options, setValue, setId, listItem }) => {
    return (
        <select
            value={selectedValue}
            onChange={(e) => {
                setValue(e.target.value);
                setId();
            }}
            className="bg-inherit border border-[#cccccc] text-[1.5rem] rounded-[8px] block w-full px-[14px] py-[8px] outline-none"
        >
            <option value="">--Выбрать--</option>
            {options?.map((option, index) => {
                return (
                    <option key={index} title={option} value={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
};

export default DropList;

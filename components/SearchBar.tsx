import { useState } from "react";
import { searchIcon } from "./AppConstants";
import Image from "next/image";

export default function SearchBar({searchForEmployee}:any) {

  
  const [searchFor, setSearchFor] = useState("");

  const handleChange = (event: any) => {
    setSearchFor(event.target.value);
  };

  const handleSearch = () => {
    searchForEmployee(searchFor)
  };

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      searchForEmployee(event.target.value)
    }
  }

  return (
    <>
      <div>
        <div className="w-fit relative flex flex-row">
          <div>
            <input
              autoFocus
              type="text"
              value={searchFor}
              onChange={(event: any) => handleChange(event)}
                onKeyDown={(event: any) => handleKeyPress(event)}
              id="default-search"
              className="block h-[37px] w-[275px] text-base p-3 text-subHeading text-[#000000] border-gray-300 rounded-[5px] bg-[#F4F4F4] focus:ring-blue-500 focus:border-blue-500 placeholder:text-[14px]"
              placeholder="Search Employees"
              required
            />
          </div>
          <div
            onClick={() => handleSearch()}
            className=" absolute inset-y-0 right-2 top-2 items-center pr-2 cursor-pointer"
          >
            <Image src={searchIcon} width={20} height={20} alt="Search Icon" />
          </div>
        </div>
      </div>
    </>
  );
}

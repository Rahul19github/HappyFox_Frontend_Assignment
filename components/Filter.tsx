import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Filter({filterByTeam}:any) {
  const [selected, setSelected] = useState("");

  const handleFilter = (value: any) => {
    setSelected(value.target.value as string);
    filterByTeam(value.target.value)
  };

  const filterOptions = [
    { value: "Business", title: "Business Team" },
    { value: "Tech", title: "Technical" },
    { value: "core", title: "Core Team" },
    { value: "Accounts", title: "Accounts Team" },
  ];

  return (
    <Select
      displayEmpty
      size="medium"
      id="team-select"
      labelId="team-select"
      defaultValue="Select a Team"
      className="text-[#000] cursor-pointer rounded-[5px] bg-[#f4f4f4]  h-[37px] w-[275px] font-normal text-base "
      value={selected}
      onChange={(value) => handleFilter(value)}
      variant="standard"
      disableUnderline
      label="Select a Team"
      MenuProps={{
        sx: {
          "& .MuiList-root.MuiMenu-list": {
            padding: "0px !important",
          },
          "& .Mui-selected": {
            backgroundColor: "#1B810B !important",
            color: "#FFFFFF !important",
          },
          "& +.MuiInputBase-root": {
            marginTop: "0px !important",
          },
        },
        PaperProps: {
          sx: {
            width: 230,
            height: "fitContent",
            "& .MuiMenuItem-root": {
              color: "#6E6B6B",
              justifyContent: "center",
              fontWeight: 400,
              fontSize: "16px",
            },
            "& MuiPaper-root-MuiPopover-paper-MuiMenu-paper .MuiMenuItem-root .Mui-selected":
              {
                color: "#FFF !important",
              },
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "#1B810B",
              color: "#FFFFFF",
            },
          },
        },
      }}
      sx={{
        paddingTop: "3px",
        paddingLeft: "3px",
        boxShadow: "none",
        minWidth: "auto",
        "& .MuiInputBase-input": {
          // color: '#3C5A94',
          width: "275px",
          padding: "8px",
        },
        // width: 'auto',
      }}
    >
      {filterOptions.map((child: any, index: number) => (
        <MenuItem
          value={child["value"]}
          key={index}
          sx={{
            color: "red",
            "& .MuiMenuItem-root .Mui-selected": {
              backgroundColor: "#1B810B",
              color: "#fff",
            },
          }}
          className=" font-normal text-[#6E6B6B] md:text-[14px] xl:text-[20px] xl:h-[48px] hover:bg-[#1B810B] hover:text-white selection:!bg-[#1B810B] selection:!text-white"
        >
          {child["title"]}
        </MenuItem>
      ))}
    </Select>
  );
}

"use client"

import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";

const FilteredChart = ({ data, team }: any) => {
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
    font-size: 18px;
  `;

  return (
    <>
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={
          <StyledNode>{team !== "core" ? team : data[0]["name"]}</StyledNode>
        }
      >
        {team !== "core" &&
          data?.map((item: any) => (
            <TreeNode label={<StyledNode>{item.name}</StyledNode>} />
          ))}
        {team === "core" &&
          data
            ?.slice(1)
            ?.map((item: any) => (
              <TreeNode label={<StyledNode>{item.name}</StyledNode>} />
            ))}
      </Tree>
    </>
  );
}
export default FilteredChart;
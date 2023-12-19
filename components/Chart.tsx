import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";
import Draggable from "react-draggable";
import { useState, useRef, createRef } from "react";

const Chart = ({ data, changeManager }: any) => {
  const tree = arrToTree(data);
  console.log("tree", tree)

  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 2px solid red;
    font-size: 18px;
    line-height:15px;
  `;

  const StyledChildren = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 2px solid blue;
    font-size: 18px;
    margin: 0px 5px;
  `;

  const customRef = useRef(null);
  const dragOverItem = useRef(null);

  const [childValue, setChildValue] = useState({});

  const dragStop = (value: any) => {
    console.log('dragStop', value)
    setChildValue(value);
  };

  const drop = (parent: any, child: any) => {
    if (Object.keys(childValue).length > 0) {
      changeManager(parent, child)
    }
  };

  return (
    <div className=" flex flex-col gap-5" >
    <Tree
      lineWidth={"3px"}
      lineColor={"green"}
      lineBorderRadius={"10px"}
      label={<StyledNode>{data[0]["name"]}</StyledNode>}
    >
      {tree?.map((item: any, index: number) => (
        <div ref={dragOverItem} onMouseOut={() => drop(item, childValue)} key={"child_" + item["id"]} >
          <TreeNode
            label={<StyledNode>{item.name}</StyledNode>}
            key={"child_" + item["id"]}
          >
            {item?.children.length > 0 &&
              item?.children.map((child: any, index: number) => (
                <Draggable
                  onStop={() => dragStop(child)}
                  nodeRef={customRef}
                  key={child["id"]}
                >
                  <div ref={customRef}>
                    <TreeNode
                      label={<StyledChildren>{child["name"]}</StyledChildren>}
                    />
                  </div>
                </Draggable>
              ))}
          </TreeNode>
        </div>
      ))}
    </Tree>
    </div>
  );
};

export default Chart;

function arrToTree(data: any) {
  let idKey = "id";
  let parentKey = "manager";
  let childrenKey = "children";

  let tree = [],
    childrenOf: any = {};
  let item, id, parentId;

  for (let i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[idKey];
    parentId = item[parentKey];

    // children might be present for every item
    childrenOf[id] = childrenOf[id] || [];

    // init its children
    item[childrenKey] = childrenOf[id];

    if (parentId != 0) {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

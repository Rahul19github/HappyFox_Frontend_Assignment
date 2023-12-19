import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";

export const TreeGraph = ({data}:any) => {

    const tree = arrToTree(data);

    const StyledNode = styled.div`
      padding: 5px;
      border-radius: 8px;
      display: inline-block;
      border: 1px solid red;
      font-size: 18px;
    `;
  
    const StyledChildren = styled.div`
      padding: 5px;
      border-radius: 8px;
      display: inline-block;
      border: 1px solid red;
      font-size: 18px;
      margin: 0px 5px;
    `;
  
    const handleDragStop = (event: any) => {
      console.log("eventDrag", event.target);
    };
  
    return (
  
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={<StyledNode>{data[0]["name"]}</StyledNode>}
      >
        {tree?.map((item: any) => (
          <TreeNode
            label={<StyledNode>{item.name}</StyledNode>}
            key={"child_" + item["id"]}
          >
            {item?.children.length > 0 &&
              item?.children.map((child: any) => (
                <TreeNode
                  label={<StyledChildren>{child["name"]}</StyledChildren>}
                />
              ))}
          </TreeNode>
        ))}
      </Tree>
  
    );
}

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
  
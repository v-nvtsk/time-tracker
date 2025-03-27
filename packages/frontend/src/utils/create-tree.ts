type Node = {
  id: number,
  parentId: number | null
};
type TreeNodeWithChildren<T extends Node> = T & {children: TreeNodeWithChildren<T>[]};

export const createTree = <TreeNode extends Node=Node>(list: TreeNode[]) => {

  const map = new Map<number, TreeNodeWithChildren<TreeNode>>();
  const roots:TreeNodeWithChildren<TreeNode>[] = [];

  list.forEach((item) => {
    const node:TreeNodeWithChildren<TreeNode> = {
      ...item,
      children: []
    };

    map.set(node.id, node);
  });
  list.forEach((item) => {
    const node = map.get(item.id);

    if (node && node.parentId !== null){
      map.get(node.parentId)?.children.push(node);
    }else if (node){
      roots.push(node);
    }
  });

  return roots;
};

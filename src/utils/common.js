export const listToTree=(list, parentId="parentId", Id="Id", rootId="0")=> {
    let arr = [...list];
  
    let rootList = arr.filter((item) => {
      if (item[parentId] === rootId) {
        return item;
      }
    });
  
    function listToTreeData (bootItem, arr, parentId, Id) {
      bootItem.children = []
      arr.forEach((item) => {
        if (item[parentId] === bootItem[Id]) {
          bootItem.children.push(item)
        }
      });
    
      if (bootItem.children.length > 0) {
        bootItem.children.forEach((item) => {
          listToTreeData(item, arr, parentId, Id);
        })
      } else {
        return false;
      }
    }
  
    rootList.map((rootItem) => {
      listToTreeData(rootItem, arr, parentId, Id);
      return rootItem;
    });
  
    return rootList;
  }
 
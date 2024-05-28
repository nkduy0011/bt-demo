export const flatClassTree = (nodes, depth = 0) => {
  let flattened = [];
  for (let node of nodes) {
    flattened.push({
      name: "---".repeat(depth) + node.name,
      group: node.group,
      id: node.id,
    });
    if (node.children) {
      flattened = flattened.concat(flatClassTree(node.children, depth + 1));
    }
  }
  return flattened;
};
export const getClassroomsRoot = (classrooms) => {
  let classroomsRoot = classrooms.filter((item) => item.group == null);
  classroomsRoot.forEach((element) => {
    getClassroomChildren(element, classrooms);
  });
  return classroomsRoot;
};
export const getClassroomChildren = (classroom, classrooms) => {
  let children = classrooms.filter((item) => item.group == classroom.id);
  if (children && children.length > 0) {
    classroom.children = [...children];
    children.forEach((e) => {
      getClassroomChildren(e, classrooms);
    });
  }
};

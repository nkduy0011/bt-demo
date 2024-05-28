import { flatClassTree, getClassroomsRoot } from "../helpers/classHelper";
import { generateId } from "../helpers/generateIdHelper";
import { getDataKey, setData } from "./localStorageService";
const classroomsKey = "classrooms";
export const getClassroomById = (id) => {
  let classrooms = JSON.parse(localStorage.getItem(classroomsKey));
  return classrooms.find((item) => item.id == id);
};
export const createClassroom = (payload) => {
  let classrooms = getDataKey(classroomsKey) || [];
  payload.id = generateId(classrooms);
  classrooms = [...classrooms, payload];
  setData(classroomsKey, classrooms);
};
export const updateClassroom = (payload) => {
  let classrooms = getDataKey(classroomsKey) || [];
  let classroomIndex = classrooms.findIndex((item) => item.id == payload.id);
  if (classroomIndex >= 0) {
    classrooms[classroomIndex].name = payload.name;
    classrooms[classroomIndex].group = payload.group;
    setData(classroomsKey, classrooms);
  }
};
export const deleteClassroom = (id) => {
  let classrooms = getDataKey(classroomsKey) || [];
  let classroomIndex = classrooms.findIndex((item) => item.id == id);
  classrooms.splice(classroomIndex, 1);
  setData(classroomsKey, classrooms);
};
export const getListClassrooms = (payload) => {
  let start = (payload.page - 1) * payload.limit;
  let end = start + payload.limit;
  let classrooms = getDataKey(classroomsKey) || [];
  let classroomsRoot = getClassroomsRoot(classrooms);
  var classroomTree = flatClassTree(classroomsRoot);
  var newDataPagination = classroomTree.slice(start, end);
  return {
    data: newDataPagination,
    total: classroomTree.length,
  };
};
export const getAllClasrooms = () => {
  let classrooms = getDataKey(classroomsKey) || [];
  let classroomsRoot = getClassroomsRoot(classrooms);
  var classroomTree = flatClassTree(classroomsRoot);
  return classroomTree;
};

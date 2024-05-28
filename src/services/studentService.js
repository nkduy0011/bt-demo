import { generateId } from "../helpers/generateIdHelper";
import { getClassroomById } from "./classroomService";
import { getDataKey, setData } from "./localStorageService";
const studentsKey = "students";
export const getStudentById = (id) => {
  let students = JSON.parse(localStorage.getItem(studentsKey));
  return students.find((item) => item.id == id);
};
export const createStudent = (payload) => {
  let students = getDataKey(studentsKey) || [];
  payload.id = generateId(students);
  students = [...students, payload];
  setData(studentsKey, students);
};
export const updateStudent = (payload) => {
  let students = getDataKey(studentsKey) || [];
  let studentIndex = students.findIndex((item) => item.id == payload.id);
  if (studentIndex >= 0) {
    students[studentIndex].name = payload.name;
    students[studentIndex].age = payload.age;
    students[studentIndex].dateOfBirth = payload.dateOfBirth;
    students[studentIndex].classroom = payload.classroom;
    setData(studentsKey, students);
  }
};
export const deleteStudent = (id) => {
  let students = getDataKey(studentsKey) || [];
  let studentIndex = students.findIndex((item) => item.id == id);
  students.splice(studentIndex, 1);
  setData(studentsKey, students);
};
export const getListStudents = (payload) => {
  let start = (payload.page - 1) * payload.limit;
  let end = start + payload.limit;
  let students = JSON.parse(localStorage.getItem(studentsKey)) || [];
  var studentsFilter = students.filter((item) => {
    return (
      (!payload.name || item.name.indexOf(payload.name) > -1) &&
      (!payload.age || item.age == payload.age) &&
      (!payload.classroom || item.classroom == payload.classroom)
    );
  });
  var listStudent = studentsFilter.slice(start, end);
  listStudent.forEach((element) => {
    if (element.classroom) {
      var classroom = getClassroomById(element.classroom);
      element.classroomName = classroom?.name;
    }
  });
  return {
    data: listStudent,
    total: studentsFilter.length,
  };
};

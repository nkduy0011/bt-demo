import { createRouter, createWebHistory } from "vue-router";
import StudentView from "../views/Student/StudentView.vue";
import CreateStudentView from "../views/Student/CreateStudentView.vue";
import Classroomview from "../views/Classroom/ClassroomView.vue";
import CreateClassroomview from "../views/Classroom/CreateClassroomView.vue";
export const staticPath = {
  student: "/student",
  createStudent: "/student/create",
  updateStudent: "/student/update",
  classroom: "/classroom",
  createClassroom: "/classroom/create",
  updateClassroom: "/classroom/update",
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: staticPath.student,
      component: StudentView,
    },
    {
      path: staticPath.createStudent,
      component: CreateStudentView,
    },
    {
      path: staticPath.updateStudent + "/:id",
      component: CreateStudentView,
    },
    {
      path: staticPath.classroom,
      component: Classroomview,
    },
    {
      path: staticPath.createClassroom,
      component: CreateClassroomview,
    },
    {
      path: staticPath.updateClassroom + "/:id",
      component: CreateClassroomview,
    },
  ],
});

export default router;

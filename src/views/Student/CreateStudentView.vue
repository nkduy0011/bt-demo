<script>
import router, { staticPath } from "../../router";
import { useRoute } from "vue-router";
import {
  createStudent,
  updateStudent,
  getStudentById,
} from "../../services/studentService";
import { calculateAge } from "../../helpers/studentHelper";
import { getAllClasrooms } from "../../services/classroomService";
import {
  validCheck,
  validRequired,
  validMaxlength,
  validMinlength,
} from "../../helpers/validateHelper";
export default {
  data() {
    return {
      form: {
        name: {
          value: null,
          rules: [validRequired, [validMaxlength, 150], [validMinlength, 4]],
        },
        dateOfBirth: {
          value: null,
        },
        classroom: {
          value: null,
        },
        showError: false,
      },
      isUpdate: false,
      id: null,
    };
  },
  methods: {
    fetchStudent() {
      var student = getStudentById(this.id);
      if (student) {
        this.form.name.value = student.name;
        this.form.dateOfBirth.value = student.dateOfBirth;
        this.form.classroom.value = student.classroom;
      }
    },
    getClassroom() {
      this.classrooms = getAllClasrooms();
    },
    checkRoute() {
      let route = useRoute();
      this.id = route.params.id;
      if (route.path.indexOf(staticPath.updateStudent) > -1) {
        this.isUpdate = true;
        this.fetchStudent();
      }
    },
    onFinish() {
      let isValid = validCheck(this.form);
      if (isValid) {
        this.form.showError = true;
        return;
      }
      let payload = {
        name: this.form.name.value,
        dateOfBirth: this.form.dateOfBirth.value,
        classroom: this.form.classroom.value,
        age: calculateAge(this.form.dateOfBirth.value),
      };
      if (!this.isUpdate) {
        createStudent(payload);
      } else {
        payload.id = this.id;
        updateStudent(payload);
      }
      router.back();
    },
  },
  created() {
    this.checkRoute();
    this.getClassroom();
  },
};
</script>
<template>
  <main>
    <div>
      <div>
        <input type="text" placeholder="họ tên" v-model="form.name.value" />
        <p v-if="form.showError" class="error">{{ form.name.error }}</p>
      </div>
      <div>
        <input
          type="date"
          placeholder="ngày sinh"
          v-model="form.dateOfBirth.value"
        />
        <p v-if="form.showError" class="error">{{ form.dateOfBirth.error }}</p>
      </div>
      <div>
        <select v-model="this.form.classroom.value">
          <option
            v-for="(item, index) in classrooms"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        <p v-if="form.showError" class="error">{{ form.classroom.error }}</p>
      </div>
      <button @click="onFinish" type="submit">
        {{ isUpdate ? "Cập nhật" : "Thêm mới" }}
      </button>
    </div>
  </main>
</template>

<style scoped>
@import "./Student.scss";
</style>

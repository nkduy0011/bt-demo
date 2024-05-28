<script>
import router, { staticPath } from "../../router";
import { useRoute } from "vue-router";
import {
  createClassroom,
  updateClassroom,
  getClassroomById,
  getAllClasrooms,
} from "../../services/classroomService";
import {
  validMaxlength,
  validMinlength,
  validRequired,
} from "../../helpers/validateHelper";
import { validCheck } from "../../helpers/validateHelper";
export default {
  data() {
    return {
      classrooms: [],
      form: {
        name: {
          value: null,
          rules: [validRequired, [validMaxlength, 150], [validMinlength, 5]],
        },
        group: {
          value: null,
          rules: [],
        },
        showError: false,
      },
      isUpdate: false,
      id: null,
    };
  },
  methods: {
    fetchClassrooms() {
      var res = getAllClasrooms();
      if (res) this.classrooms = res;
    },
    fetchClassroom() {
      var classroom = getClassroomById(this.id);
      if (classroom) {
        this.form.name.value = classroom.name;
        this.form.group.value = classroom.group;
      }
    },
    // kiểm tra nếu là route update thì fetch dữ liệu
    checkRoute() {
      let route = useRoute();
      this.id = route.params.id;
      if (route.path.indexOf(staticPath.updateClassroom) > -1) {
        this.isUpdate = true;
        this.fetchClassroom();
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
        group: this.form.group.value,
      };
      if (!this.isUpdate) {
        createClassroom(payload);
      } else {
        payload.id = this.id;
        updateClassroom(payload);
      }
      router.back();
    },
  },
  created() {
    this.checkRoute();
    this.fetchClassrooms();
  },
};
</script>
<template>
  <main>
    <div>
      <div>
        <input type="text" placeholder="Tên lớp" v-model="form.name.value" />
        <p v-if="form.showError" class="error">{{ form.name.error }}</p>
      </div>
      <div>
        <select v-model="this.form.group.value">
          <option
            v-for="(item, index) in classrooms"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        <p v-if="form.showError" class="error">{{ form.group.error }}</p>
      </div>
      <button @click="onFinish">
        {{ isUpdate ? "Cập nhật" : "Thêm mới" }}
      </button>
    </div>
  </main>
</template>
<style scoped>
@import "./Classroom.scss";
</style>

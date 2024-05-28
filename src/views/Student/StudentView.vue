<script>
import TableCus from "../../components/Table/TableCus.vue";
import PaginationCus from "../../components/Table/PaginationCus.vue";
import router, { staticPath } from "../../router";
import { deleteStudent, getListStudents } from "../../services/studentService";
import { getAllClasrooms } from "../../services/classroomService";
export default {
  components: { TableCus, PaginationCus },
  data() {
    return {
      columns: [
        { text: "Tên", value: "name" },
        { text: "Tuổi", value: "age" },
        { text: "Lớp", value: "classroomName" },
      ],
      students: [],
      classrooms: [],
      searchForm: {
        name: null,
        age: null,
        classroom: null,
      },
      pagination: {
        page: 1,
        limit: 5,
        total: 0,
      },
    };
  },
  methods: {
    getStudents() {
      let payload = {
        ...this.searchForm,
        ...this.pagination,
      };
      let res = getListStudents(payload);
      this.students = res.data || [];
      this.pagination.total = res.total;
    },
    getClassroom() {
      this.classrooms = getAllClasrooms();
    },
    onSearch() {
      this.getStudents();
    },
    onCreate() {
      router.push(staticPath.createStudent);
    },
    onUpdate(e) {
      router.push(staticPath.updateStudent + `/${e}`);
    },
    onDelete(e) {
      deleteStudent(e);
      this.getStudents();
    },
    onPageChange(e) {
      this.pagination.page = e;
      this.getStudents();
    },
  },
  created() {
    this.getStudents();
    this.getClassroom();
  },
};
</script>

<template>
  <main>
    <div class="student-container">
      <div class="search-container">
        <input type="text" placeholder="Họ tên" v-model="searchForm.name" />
        <input type="number" placeholder="Tuổi" v-model="searchForm.age" />
        <select v-model="this.searchForm.classroom">
          <option v-if="allClassOpt" value="">Tất cả các lớp</option>
          <option
            v-for="(item, index) in classrooms"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        <button @click="onSearch()">Tìm kiếm</button>
      </div>
      <div class="btn-create-container">
        <button @click="onCreate()">Thêm mới</button>
      </div>
      <div>
        <TableCus
          :columns="columns"
          :data="students"
          @item-update="onUpdate"
          @item-delete="onDelete"
        ></TableCus>
        <PaginationCus
          :page="pagination.page"
          :total="pagination.total"
          :limit="pagination.limit"
          @onPageChange="onPageChange"
        ></PaginationCus>
      </div>
    </div>
  </main>
</template>
<style scoped>
@import "./Student.scss";
</style>

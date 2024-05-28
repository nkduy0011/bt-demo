<script>
import TableCus from "../../components/Table/TableCus.vue";
import PaginationCus from "../../components/Table/PaginationCus.vue";
import router, { staticPath } from "../../router";
import {
  deleteClassroom,
  getListClassrooms,
} from "../../services/classroomService";
export default {
  components: { TableCus, PaginationCus },
  data() {
    return {
      columns: [{ text: "Tên lớp", value: "name", align: "left" }],
      classrooms: [],
      pagination: {
        page: 1,
        limit: 5,
        total: 0,
      },
    };
  },
  methods: {
    getClassrooms() {
      let payload = {
        ...this.pagination,
      };
      let res = getListClassrooms(payload);
      this.classrooms = res.data || [];
      this.pagination.total = res.total;
    },
    onSearch() {
      this.getClassrooms();
    },
    onCreate() {
      router.push(staticPath.createClassroom);
    },
    onUpdate(e) {
      router.push(staticPath.updateClassroom + `/${e}`);
    },
    onDelete(e) {
      deleteClassroom(e);
      this.getClassrooms();
    },
    onPageChange(e) {
      this.pagination.page = e;
      this.getClassrooms();
    },
  },
  created() {
    this.getClassrooms();
  },
};
</script>

<template>
  <main>
    <div class="classroom-container">
      <div class="btn-create-container">
        <button @click="onCreate()">Thêm mới</button>
      </div>
      <div>
        <TableCus
          :columns="columns"
          :data="classrooms"
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
@import "./Classroom.scss";
</style>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      total: this.total,
    };
  },
  emits: ["onPageChange"],
  methods: {
    onNext() {
      if (this.page < Math.ceil(this.total / this.limit)) {
        let changePage = this.page + 1;
        this.$emit("onPageChange", changePage);
      }
    },
    onPrev() {
      if (this.page > 1) {
        let changePage = this.page - 1;
        this.$emit("onPageChange", changePage);
      }
    },
    onClickPage(page) {
      this.$emit("onPageChange", page);
    },
  },
};
</script>
<template>
  <div class="pagination" v-if="Math.ceil(this.total / this.limit)">
    <a @click="onPrev()">&laquo;</a>
    <a
      v-for="item in Math.ceil(this.total / this.limit)"
      :key="item"
      :class="{ active: page == item }"
      @click="onClickPage(item)"
    >
      {{ item }}
    </a>
    <a @click="onNext()">&raquo;</a>
  </div>
</template>
<style scoped>
@import "./Pagination.scss";
</style>

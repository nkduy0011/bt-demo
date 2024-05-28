<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["item-update", "item-delete"]);
const onUpdate = (id) => {
  emit("item-update", id);
};
const onDelete = (id) => {
  emit("item-delete", id);
};
</script>

<template>
  <table class="table-cus">
    <tr>
      <th class="col-index">#</th>
      <th
        v-for="(col, index) in columns"
        :key="index"
        :style="{ 'text-align': col.align }"
      >
        {{ col.text }}
      </th>
      <th class="col-action">Thao tác</th>
    </tr>
    <tr v-for="(item, index) in data" :key="index">
      <td>{{ index + 1 }}</td>
      <td
        v-for="(col, index) in columns"
        :style="{ 'text-align': col.align }"
        :key="index"
      >
        {{ item.render ? item.render : item[col.value] }}
      </td>
      <td>
        <button @click="onUpdate(item.id)">Sửa</button>
        <button @click="onDelete(item.id)">Xoá</button>
      </td>
    </tr>
  </table>
</template>
<style scoped>
@import "./Table.scss";
</style>

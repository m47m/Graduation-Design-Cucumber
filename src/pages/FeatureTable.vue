<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    @row-click="emitOpenLeftDrawer"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template> 

<script setup>
const tableData = [
  {
    id:0,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id:1,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id:2,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id:3,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const emit = defineEmits(["select-feature"]);
const emitOpenLeftDrawer = (row) => {
  emit("select-feature",row.id)
};
</script>

<style scoped>
</style>
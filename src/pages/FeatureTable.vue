<template>
  <el-table
    :data="features"

    style="width: 100%"
    @row-click="emitOpenLeftDrawer"
  >
    <el-table-column prop="featureName" label="Name"  />
    <el-table-column prop="lastModified" label="Date" width="180" />
    <el-table-column prop="size" label="Size" width="150" />

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="{row}">
        <el-button link type="primary"  @click.stop="Test1(row.featureName,event)"
          >Test</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template> 

<script setup>

import {FeatureTest1} from "../api/feature";
import {onMounted, reactive } from "vue";
import { ElNotification } from "element-plus";

const emit = defineEmits(["select-feature"]);
const emitOpenLeftDrawer = (row) => {
  emit("select-feature",row.id)
};
const emitOpenMidDrawer = (row) =>{
  emit("select-feature-report",row.id)
}

const props = defineProps({
  features: Array,
});

const Test1 = function(value){
  Test1Param.featureName = value
  FeatureTest1(Test1Param).then((res)=>{
    ElNotification({
      title: "Success",
      message: "Test "+ value+ " successfully",
      type: "success",
    });
  }).catch((res)=>{

  })
}
const Test1Param = reactive({
  featureName:"Login.feature"
})

onMounted(()=>
{
  console.log(props.features)
}
)

</script>

<style scoped>
</style>
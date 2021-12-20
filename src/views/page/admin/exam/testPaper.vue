<template>
  <div class="testPaper p15">
    <el-button size="small" type="primary" @click="add">新建</el-button>
    <el-table :data="dataList" border>
      <el-table-column
        label="序号"
        width="100"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="试卷类型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="time"
        label="开考时间"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="add('edit', scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form label-width="80px" :model="form" :rules="rules">
        <el-form-item label="考卷类型">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开考时间">
          <el-date-picker
            style="margin-bottom: 10px"
            value-format="yyyy-MM-dd"
            v-model="form.data"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-time-picker
            is-range
            v-model="form.time"
            value-format="HH:mm"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "新建考卷",
      dialogVisible: false,
      form: [],
      rules: {},
      dataList: [{ type: "A卷", time: "2021-12-18 14:00" }],
    };
  },
  methods: {
    add(type, scope) {
      if (type == "edit") {
        this.title = "编辑考卷";
      }
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
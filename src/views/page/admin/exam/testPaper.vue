<template>
  <div class="testPaper p15">
    <el-button
      style="margin-bottom: 10px"
      type="primary"
      @click="openDialog('add')"
      >新建</el-button
    >
    <el-table v-loading="loading" :data="dataList" border>
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
      <el-table-column align="center" label="开考时间">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="openDialog('edit', scope.row)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form ref="rulesForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="考卷类型" prop="type">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="开考日期" prop="date">
          <el-date-picker
            style="margin-bottom: 10px"
            value-format="yyyy-MM-dd"
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="time" label="开考时间">
          <el-time-picker
            is-range
            v-model="form.time"
            value-format="HH:mm:ss"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAndUpd">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/exam";
export default {
  data() {
    return {
      loading: false,
      title: "新建考卷",
      dialogVisible: false,
      form: {},
      rules: {
        type: [{ required: true, message: "请输入类别", trigger: "change" }],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
        time: [{ required: true, message: "请输入时间", trigger: "change" }],
      },
      dataList: [{ type: "A卷", time: "2021-12-18 14:00" }],
    };
  },
  created() {
    this.getTest();
  },
  methods: {
    openDialog(type, data) {
      this.dialogVisible = true;
      if (type == "edit") {
        this.title = "编辑考卷";
        this.form = { ...data };
      } else {
        this.title = "新增考卷";
      }
    },
    del(id) {
      this.$confirm("是否确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delTest(id).then((res) => {
          if (res.code == 200) {
            this.getTest();
            this.$message.success("删除成功");
          }
        });
      });
    },
    // 添加与编辑
    addAndUpd() {
      this.$refs.rulesForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增考卷") {
            api.saveTest({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("保存成功");
                this.dialogVisible = false;
                this.getTest();
              }
            });
          } else {
            api.updateTest({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("更新成功");
                this.dialogVisible = false;
                this.getTest();
              }
            });
          }
        }
      });
    },
    getTest() {
      this.loading = true;
      api.getTest().then((res) => {
        res.rows.forEach((item, i) => {
          let arr = [];
          res.rows[i].date = item.startTime.split(" ")[0];
          arr.push(item.startTime.split(" ")[1]);
          arr.push(item.endTime.split(" ")[2]);

          res.rows[i].time = arr;
        });
        this.dataList = res.rows;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
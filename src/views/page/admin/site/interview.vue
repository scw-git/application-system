<template>
  <div class="interview p15">
    <div class="operation mb10">
      <!-- <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select> -->
      <el-button style="margin-left: 10px" type="primary" @click="openDialog">
        新建</el-button
      >
    </div>
    <div class="table" v-loading="loading">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>

        <el-table-column align="center" prop="time" label="面试时间">
          <template slot-scope="scope">
            {{ scope.row.startExamDate }} <br />{{ scope.row.endExamDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="placeAddress"
          label="面试地点"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="open"
          label="考点是否开放"
        ></el-table-column> -->

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              @click="openDialog(2, scope.row)"
            >
              编辑</el-button
            >

            <el-button size="small" @click="delSite(scope.row.id)" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <span style="color: red">如该考场已发面试，改动后会重新发送短信！</span>
      <el-form ref="ruleForm" label-width="120px" :model="form" :rules="rules">
        <el-form-item prop="startExamDate" label="开始面试时间">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.startExamDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endExamDate" label="面试结束时间">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.endExamDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="placeAddress" label="面试地点">
          <el-input
            placeholder="请输入地址"
            v-model="form.placeAddress"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/site";
export default {
  data() {
    return {
      loading: false,
      dataList: [],
      dialogVisible: false,
      value: "",
      form: {},
      rules: {
        startExamDate: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        endExamDate: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        placeAddress: [
          { required: true, message: "请输入面试地点", trigger: "blur" },
        ],
      },
      title: "新建地点",
    };
  },
  created() {
    this.getInterviewSiteList();
  },
  methods: {
    add() {},
    submitData() {
      if (this.title == "新建地点") {
        api.addInterviewSite(this.form).then((res) => {
          if (res.code == 200) {
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.getInterviewSiteList();
          }
        });
      } else {
        api.editSite(this.form).then((res) => {
          if (res.code == 200) {
            this.$message.success("修改成功");
            this.dialogVisible = false;
            this.getInterviewSiteList();
          }
        });
      }
    },
    delSite(id) {
      this.$confirm("确定删除该面试地点?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delSite(id).then((res) => {
          if (res.code == 200) {
            this.$message.success("删除成功！");
          }
        });
      });
    },
    openDialog(n, data) {
      if (n == 1) {
        this.title = "新建地点";
      } else {
        this.title = "编辑地点";
        this.form = { ...data };
      }
      this.dialogVisible = true;
    },
    getInterviewSiteList() {
      this.loading = true;
      api.getInterviewSiteList().then((res) => {
        this.dataList = res.rows;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
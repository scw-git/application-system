<template>
  <div class="hone frame" v-loading="loading">
    <div
      class="frame_title"
      style="display: flex; justify-content: space-between"
    >
      <span> <span style="color: red">*</span> 家庭情况：</span>
      <el-button size="mini" @click="openDialog" type="warning">添加</el-button>
    </div>
    <el-table border :data="dataList">
      <el-table-column
        width="150"
        align="center"
        prop="relation"
        label="与本人关系"
      ></el-table-column>
      <el-table-column
        width="150"
        align="center"
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        prop="jobsAndDuties"
        align="center"
        label="工作单位及职位"
      ></el-table-column>
      <el-table-column
        prop="registeredResidence"
        align="center"
        label="户口所在地"
      ></el-table-column>

      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form
          inline
          label-width="120px"
          ref="home"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="与本人关系" prop="relation">
            <el-input v-model="form.relation" placeholder="请填写"> </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请填写"> </el-input>
          </el-form-item>
          <el-form-item label="工作单位与职位">
            <el-input v-model="form.jobsAndDuties" placeholder="请填写">
            </el-input>
          </el-form-item>
          <el-form-item label="户口所在地">
            <el-input v-model="form.registeredResidence" placeholder="请填写">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center" slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="submitData">{{
            title == "添加家庭成员" ? "添 加" : "更 新"
          }}</el-button>
          <el-button size="medium" @click="dialogFormVisible = false"
            >取 消</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="next">
      <el-button size="small" type="primary" @click="next">上一步</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/info";
export default {
  data() {
    return {
      loading: false,
      title: "添加家庭成员",
      dialogFormVisible: false,
      dataList: [],
      form: {},
      rules: {
        relation: [{ required: true, message: "请填写关系", trigger: "blur" }],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getHome();
  },
  methods: {
    openDialog() {
      this.form = {};
      this.title = "添加家庭成员";
      this.dialogFormVisible = true;
    },
    handleEdit(data) {
      this.title = "更新家庭成员";
      this.dialogFormVisible = true;
      this.form = { ...data };
    },
    submitData() {
      this.dialogFormVisible = true;
      this.$refs.home.validate((valid) => {
        if (valid) {
          if (this.title == "添加家庭成员") {
            api.saveHome({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$message.success("保存成功");
                this.getHome();
              }
            });
          } else {
            api.updateHome({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$message.success("保存成功");
                this.getHome();
              }
            });
          }
        }
      });
    },
    handleDelete(id) {
      this.$confirm("是否确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delHome(id).then((res) => {
          if (res.code == 200) {
            this.getHome();
            this.$message.success("删除成功");
          }
        });
      });
    },
    getHome() {
      this.loading = true;
      api.getHome().then((res) => {
        this.dataList = res.data;
        this.loading = false;
      });
    },
    next() {
      this.$router.push("student_info_other");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
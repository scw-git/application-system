<template>
  <div class="group p15">
    <el-button style="margin-bottom: 10px" @click="openDialog(1)" type="primary"
      >新增
    </el-button>
    <el-table v-loading="loading" :data="dataList">
      <el-table-column
        align="center"
        prop="deptName"
        label="组名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="openDialog(2, scope.row)"
            type="warning"
          >
            修改</el-button
          >

          <el-button
            size="small"
            @click="delGroup(scope.row.deptId)"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form ref="ruleForm" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="组名" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/user";
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      title: "新增组名",
      dataList: [],
      form: {},
      rules: {
        deptName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getGroup();
  },
  methods: {
    submitData() {
      this.$refs.ruleForm.validate((valide) => {
        let params = { ...this.form, orderNum: 1, parentId: 100 };
        if (valide) {
          if (this.title == "新增组名") {
            api.saveGroup(params).then((res) => {
              this.dialogVisible = false;
              this.getGroup();
              this.$message.success("添加成功！");
            });
          } else {
            api.updateGroup(params).then((res) => {
              this.dialogVisible = false;
              this.getGroup();
              this.$message.success("修改成功！");
            });
          }
        }
      });
    },
    getGroup() {
      this.loading = true;
      api.getGroup().then((res) => {
        this.dataList = res.data.slice(1);
        this.loading = false;
      });
    },
    delGroup(id) {
      this.$confirm("确认要删除该角色吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delGroup(id).then((res) => {
          this.$message.success("删除成功！");
          this.getGroup();
        });
      });
    },
    openDialog(n, data) {
      this.form = {};
      if (n == 1) {
        this.title = "新增组名";
      } else {
        this.title = "修改组名";
        console.log(data);
        this.form = { ...data }; //必须要解构，不跟直接this.form.deptName = data.deptName这是引用
      }
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
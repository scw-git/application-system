<template>
  <div class="user p15">
    <div class="operation mb10">
      <el-select
        clearable
        @change="() => getUserList()"
        v-model="pagination.deptId"
        placeholder="选择分组"
      >
        <el-option
          v-for="item in groupList"
          :key="item.deptId"
          :label="item.deptName"
          :value="item.deptId"
        >
        </el-option>
      </el-select>
      <el-input
        clearable
        v-model="pagination.userName"
        @keydown.enter.native="() => getUserList()"
        style="width: 180px; margin-left: 10px"
        placeholder="用户名称"
      ></el-input>
      <el-button
        style="margin-left: 10px"
        type="primary"
        @click="openDialog(1)"
      >
        新建用户</el-button
      >
    </div>
    <div class="table" v-loading="loading">
      <el-table :data="userList" border>
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="用户名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="nickName"
          label="昵称"
        ></el-table-column>
        <el-table-column align="center" label="分组">
          <template slot-scope="scope">{{
            scope.row.dept ? scope.row.dept.deptName : "暂无分组"
          }}</template></el-table-column
        >
        <el-table-column align="center" prop="status" label="账号状态">
          <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeStatus(scope.row)"
            >
            </el-switch
          ></template>
        </el-table-column>

        <el-table-column width="250px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="openDialog(2, scope.row)"
              type="primary"
            >
              编辑</el-button
            >

            <el-button
              size="small"
              @click="delUser(scope.row.userId)"
              type="danger"
              >删除</el-button
            >
            <el-button
              size="small"
              @click="openPassword(scope.row)"
              type="warning"
              >修改密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="重置密码" :visible.sync="passwordDialog" width="30%">
      <span>请输入“{{ resetPassword.nickName }}”的新密码</span>
      <el-input v-model="resetPassword.password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePassword" type="primary">确认</el-button>
        <el-button @click="passwordDialog = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form
        :disabled="isDisabled"
        ref="ruleForm"
        label-width="100px"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="组别" prop="deptId">
          <el-select v-model="form.deptId" placeholder="选择岗位">
            <el-option
              v-for="item in groupList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="title == '新建用户'" label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="角色选择" prop="roleIds">
          <el-select v-model="form.roleIds[0]" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 20px"
      layout="total,prev, pager, next"
      :total="total"
      :current-page="pagination.pageNum"
      @current-change="handleChangePageNum"
    >
    </el-pagination>
  </div>
</template>
<script>
import * as api from "@/api/user";

export default {
  data() {
    return {
      //重置密码
      resetPassword: {
        password: "",
        userId: "",
        nickName: "",
      },
      passwordDialog: false,
      total: 0,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        userName: "", //搜索的值
      },
      loading: false,
      isDisabled: false,
      dialogVisible: false,
      rules: {
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        deptId: [{ required: true, message: "请选择", trigger: "blur" }],
        roleIds: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      form: {
        status: "0",
        nickName: "",
        roleIds: [],
        userName: "",
      },
      dataList: {},
      title: "新建用户",
      // userInfo: {}, //获取个人用户信息
      groupList: [], //组别列表
      roleList: [], //角色列表
      userList: [], //用户列表
    };
  },
  created() {
    this.getGroup();
    this.getRoleList();
    this.getUserList();
  },
  methods: {
    openPassword(data) {
      this.passwordDialog = true;
      this.resetPassword.userId = data.userId;
      this.resetPassword.nickName = data.nickName;
    },
    updatePassword() {
      api.updatePassword(this.resetPassword).then((res) => {
        if (res.code == 200) {
          this.$message.success("重置成功！");
          this.passwordDialog = false;
        }
      });
    },
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getUserList();
    },
    changeStatus(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.userName + '"用户吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          api
            .changeUserStatus({ userId: row.userId, status: row.status })
            .then(() => {
              this.$message({
                type: "success",
                message: text + "成功!",
              });
            });
        })
        .catch(() => {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    submitData() {
      if (this.title == "新建用户") {
        this.$refs.ruleForm.validate((valide) => {
          if (valide) {
            api.addUser(this.form).then((res) => {
              if (res.code == 200) {
                this.$message.success("添加成功！");
                this.getUserList();
                this.dialogVisible = false;
              }
            });
          }
        });
      } else if (this.title == "编辑用户") {
        api.updateUser(this.form).then((res) => {
          if (res.code == 200) {
            this.$message.success("更新成功！");
            this.getUserList();
            this.dialogVisible = false;
          }
        });
      }
    },
    delUser(id) {
      this.$confirm("确认要删除该用户吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delUser(id).then((res) => {
          this.$message.success("删除成功！");
          this.getUserList();
          this.dialogVisible = false;
        });
      });
    },
    // 获取用户列表
    getUserList() {
      this.loading = true;
      api.getUserList(this.pagination).then((res) => {
        this.userList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },
    // 获取组名
    getGroup() {
      api.getGroup().then((res) => {
        this.groupList = res.data.slice(1);
      });
    },
    // 获取角色列表
    getRoleList() {
      let params = {
        pageNum: 1,
        pageSize: 100,
      };
      api.getRoleList(params).then((res) => {
        this.roleList = res.rows;
      });
    },
    getUserInfo(id) {
      api.getUserInfo(id).then((res) => {
        // this.userInfo = res.data;
        this.form.userName = res.data.userName;
        this.form.nickName = res.data.nickName;
        this.form.deptId = res.data.deptId;
        this.form.status = res.data.status;
        this.form.roleIds = res.roleIds;
        this.form.userId = res.data.userId;
      });
    },
    openDialog(n, data) {
      this.isDisabled = false;
      this.form = {
        status: "0",
        nickName: "",
        roleIds: [],
        userName: "",
      };
      if (n == 1) {
        this.title = "新建用户";
      } else if (n == 2) {
        this.getUserInfo(data.userId);
        this.title = "编辑用户";
      }
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
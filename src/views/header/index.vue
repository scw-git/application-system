<template>
  <div class="header">
    <!-- <el-row>
      <el-col :span="1">
        <img src="@/assets/img/logo.png" alt />
      </el-col>
      <el-col :span="19">
        <span>广西壮族自治区财政厅厅属单位事业单位公开招聘报名系统</span>
      </el-col>
      <el-col :span="4" class="user">
        <el-dropdown>
          <el-button>
            首成文，您好
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>基本信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>-->
    <div class="logo">
      <img src="@/assets/img/logo.png" alt />
      <span>广西壮族自治区财政厅公开招聘考试报名系统</span>
      <div class="user">
        <el-dropdown @command="handleChange">
          <el-button>
            <i
              style="font-size: 16px; margin-right: 3px"
              class="el-icon-user"
            ></i>
            {{ userName }} 您好
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu style="width: 100px" slot="dropdown">
            <!-- <el-dropdown-item command="info">基本信息</el-dropdown-item> -->
            <el-dropdown-item v-if="type == 'student'" command="password"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog
      :close-on-click-modal="false"
      title="修改密码"
      :visible.sync="openDialog"
      width="30%"
    >
      <el-form ref="resetPassword" :model="form" :rules="rules">
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatePw1 } from "@/utils/validator";
import { updatePassword } from "@/api/user";
export default {
  data() {
    return {
      userName: "",
      type: "",
      openDialog: false,
      form: {},
      rules: {
        password: [
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "change",
          },
          { required: true, validator: validatePw1, trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.userName = JSON.parse(sessionStorage.getItem("info")).user.nickName;
    this.type = JSON.parse(sessionStorage.getItem("loginInfo")).type;
  },

  methods: {
    resetPassword() {
      this.$refs.resetPassword.validate((valid) => {
        if (valid) {
          this.loading = true;
          updatePassword(this.form).then((res) => {
            if (res.code == 200) {
              this.$message.success("密码重置成功");
              this.openDialog = false;
              this.logout();
            }
          });
        }
      });
    },
    handleChange(command) {
      switch (command) {
        case "info":
          break;
        case "password":
          this.openDialog = true;
          this.form = {};
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.type == "student") {
            this.$router.push("login");
          } else {
            this.$router.push("ksbm");
          }
          sessionStorage.removeItem("loginInfo");
          sessionStorage.removeItem("router");
          sessionStorage.removeItem("info");
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
// .header {
//   height: 80px;
//   background-color: #4784e3;
//   line-height: 80px;

//   img {
//     // margin: auto;
//     height: 70px;
//   }
//   span {
//     line-height: 80px;
//     font-size: 28px;
//     color: white;
//     margin-left: 10px;
//   }
//   .user {
//     flex: 1;
//     display: flex;
//     justify-content: flex-end;
//     .el-button {
//       background-color: #4784e3;
//       color: white;
//       border: 0;
//     }
//   }
// }
.header {
  background-color: #4784e3;
  height: 75px;
  .logo {
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    > img {
      height: 70px;
      //   width: 63px;
      margin-left: 10px;
    }
    > span {
      font-size: 28px;
      color: white;
      margin-left: 10px;
    }
    .user {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .el-button {
        background-color: #4784e3;
        color: white;
        border: 0;
      }
    }
  }
}
</style>
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
      <span>广西壮族自治区财政厅厅属单位事业单位公开招聘报名系统</span>
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
            <!-- <el-dropdown-item command="info">基本信息</el-dropdown-item>
            <el-dropdown-item command="password">修改密码</el-dropdown-item> -->
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  created() {
    this.userName = JSON.parse(sessionStorage.getItem("info")).user.nickName;
  },

  methods: {
    handleChange(command) {
      switch (command) {
        case "info":
          break;
        case "password":
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      sessionStorage.removeItem("loginInfo");
      sessionStorage.removeItem("router");
      sessionStorage.removeItem("info");

      this.$router.push("login");
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
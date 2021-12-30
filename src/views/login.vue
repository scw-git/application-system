<template>
  <div class="login">
    <el-form class="login-from" ref="login" :model="form" :rules="rules">
      <h2 class="title">事业单位考试报名系统</h2>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="考生登录" name="student">
          <div class="notice">
            <span>通知：</span>
            <br />
            <a href="#"
              >[8月1日起广西再次提高部分优抚对象等人员抚恤和生活补助标准]</a
            >
            <a href="#"
              >广西考生请注意：2021年度全国会计专业技术中级资格考试打印准考证时间sedrhrh</a
            >
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入手机号/邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="code">
            <el-input
              style="width: 63%"
              prefix-icon="el-icon-circle-check"
              v-model="form.code"
              placeholder="验证码"
            ></el-input>
            <div class="login-code">
              <img src="@/assets/img/code.gif" alt />
            </div>
          </el-form-item> -->
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="login('student')"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <div class="other">
              <router-link to="register" class="noCount"
                >没有账号？去注册</router-link
              >
              <a class="noCount">忘记密码</a>
            </div>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="管理员登录" name="admin">
          <el-form-item style="margin: 20px 0">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入手机号/邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item style="width: 100%; margin-top: 30px">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="login('admin')"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import { login, loginAdmin } from "@/api/login";
import { encrypt, decrypt } from "@/utils/encrypt";
import { validatePhone } from "@/utils/validator";
export default {
  data() {
    return {
      activeName: "student",
      loading: false,
      form: {
        username: "17677400644",
        password: "123456",

        code: "11",
        codeUrl: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],

        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
    };
  },
  cremoated() {},
  methods: {
    handleClick() {
      //this.form 必须要这么写，否则管理员登录不提示
      this.form = {
        username: "",
        password: "",
        code: "",
        codeUrl: "",
      };
      this.$refs.login.resetFields();
    },
    setStorage(type, token) {
      sessionStorage.setItem(
        "loginInfo",
        JSON.stringify({
          login: true,
          type,
          token,
        })
      );
    },
    login(type) {
      if (type == "student") {
        this.$refs.login.validate((valid) => {
          if (valid) {
            let params = {
              username: this.form.username,
              password: this.form.password,
            };
            this.loading = true;
            // this.setStorage(type); //存储登录信息
            // this.$router.push({
            //   path: "/student_notice",
            // });
            login(params).then((res) => {
              this.loading = false;
              this.setStorage(type, res.token); //存储登录信息
              this.$router.push({
                path: "/student_notice",
              });
            });
          }
        });
      } else if (type == "admin") {
        let params = {
          username: this.form.username,
          password: this.form.password,
        };
        if (this.form.username == "" || this.form.password == "") {
          this.$message.warning("账号或密码不能为空！");
        } else {
          this.loading = true;
          loginAdmin(params).then((res) => {
            this.loading = false;
            this.setStorage(type, res.token); //存储登录信息
            this.$router.push({
              path: "/admin_examinee_check",
            });
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: cover;

  .login-from {
    min-height: 400px;
    border-radius: 6px;
    background: #ffffff;
    min-width: 350px;
    width: 33%;
    padding: 25px 25px 5px 25px;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #707070;
    }
    .notice {
      margin-bottom: 10px;
      a {
        // a标签是行内元素，不能设置宽高。所以要转换下
        display: inline-block;
        width: 420px;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .login-code {
      width: 33%;
      height: 40px;
      float: right;
      display: flex;
      img {
        height: 100%;
        cursor: pointer;
      }
    }
    .other {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
    }
  }
}
</style>
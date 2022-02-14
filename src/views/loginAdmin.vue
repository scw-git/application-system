<template>
  <div class="login">
    <el-form class="login-from" ref="login" :model="form" :rules="rules">
      <h2 class="title">广西壮族自治区财政厅公开招聘考试报名系统</h2>

      <el-form-item style="margin: 20px 0">
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入手机号/用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          @keydown.enter.native="login('admin')"
          v-model="form.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          @keydown.enter.native="login('admin')"
          style="width: 63%"
          prefix-icon="el-icon-circle-check"
          v-model="form.code"
          placeholder="验证码"
        ></el-input>
        <div class="login-code">
          <img @click="getCodeImg" :src="codeUrl" alt />
        </div>
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
    </el-form>

    <el-dialog
      :close-on-click-modal="false"
      title="重置密码"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="forgetPassword" :rules="rules" ref="forgetPassword">
        <el-form-item v-if="!showLastStep" prop="phone">
          <el-input
            v-model="forgetPassword.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!showLastStep" prop="code">
          <el-input
            v-model="forgetPassword.code"
            @keydown.enter.native="nextStep"
            placeholder="请输入验证码"
          >
            <el-button v-if="show" @click="getCode" slot="append"
              >获取手机验证码</el-button
            >
            <el-button disabled v-else slot="append"
              >重发验证码 ({{ time }} s)</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item v-if="showLastStep" prop="resetPassword">
          <el-input
            v-model="forgetPassword.resetPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!showLastStep" @click="nextStep()"
          >下一步</el-button
        >
        <el-button v-else @click="resetPassword">重 置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="公告" :visible.sync="noticeDialog" width="800px">
      <p v-html="noticeContent"></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getNoticeList } from "@/api/system";
import {
  login,
  loginAdmin,
  getInfo,
  getRouters,
  getCodeImg,
} from "@/api/login";
// import { encrypt, decrypt } from "@/utils/encrypt";
import { validatePw1 } from "@/utils/validator";
import { register, getCode, verifyCode, resetPassword } from "@/api/register";

export default {
  data() {
    return {
      codeUrl: "",
      noticeDialog: false,
      dialogVisible: false,
      activeName: "student",
      dataList: [],
      noticeContent: "",
      showLastStep: false, //显示重置密码的最后一步
      forgetPassword: {
        phone: "",
        code: "",
      },
      loading: false,
      show: true, //用于显示忘记密码中的验证码
      time: 5,
      form: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        resetPassword: [
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "change",
          },
          { required: true, validator: validatePw1, trigger: "change" },
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],

        code: [{ required: true, trigger: "blur", message: "验证码不能为空" }],

        phone: [{ required: true, trigger: "blur", message: "手机号不能为空" }],
      },
    };
  },
  created() {
    sessionStorage.removeItem("loginInfo");
    sessionStorage.removeItem("router");
    sessionStorage.removeItem("info");

    this.getNoticeList();
    this.getCodeImg();
  },
  methods: {
    // 获取图片的验证码
    getCodeImg() {
      getCodeImg().then((res) => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.form.uuid = res.uuid;
      });
    },
    getCode() {
      if (this.forgetPassword.phone) {
        this.show = false;
        let timer = setInterval(() => {
          if (this.time == 0) {
            clearInterval(timer);
            this.show = true;
            this.time = 60;
          } else {
            this.time--;
          }
        }, 1000);
        getCode({ mobile: this.forgetPassword.phone }).then((res) => {
          if (res.code == 200) {
            this.$message.success("发送成功！");
          } else {
            this.show = false;
          }
        });
      } else {
        this.$message.warning("请输入手机号！");
      }
    },
    showDetail(data) {
      this.noticeDialog = true;
      this.noticeContent = data;
    },
    getNoticeList() {
      this.dataList = [];
      getNoticeList().then((res) => {
        res.rows.map((item) => {
          if (item.noticeType == "0") {
            this.dataList.push(item);
          }
        });
      });
    },
    // 重置密码第二步
    resetPassword() {
      resetPassword({
        ...this.forgetPassword,
        password: this.forgetPassword.resetPassword,
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success("密码重置成功！");
          this.dialogVisible = false;
        }
      });
    },
    // 重置密码第一步
    nextStep() {
      this.$refs.forgetPassword.validate((valid) => {
        if (valid) {
          // 验证验证码是否正确
          verifyCode(this.forgetPassword).then((res) => {
            if (res.code == 200) {
              this.showLastStep = true;
            }
          });
        }
      });
    },
    openDialog() {
      this.forgetPassword = {};
      this.showLastStep = false;
      this.dialogVisible = true;
    },
    handleClick() {
      this.getCodeImg();
      //this.form 必须要这么写，否则管理员登录不提示
      this.form = {
        username: "",
        password: "",
        code: "",
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
    //获取用户信息
    getInfo() {
      getInfo().then((res) => {
        sessionStorage.setItem("info", JSON.stringify(res));
      });
    },
    // 获取路由有权限标识
    getRouters() {
      getRouters().then((res) => {
        sessionStorage.setItem("router", JSON.stringify(res.data));
      });
    },
    login(type) {
      if (type == "student") {
        this.$refs.login.validate((valid) => {
          if (valid) {
            this.loading = true;
            login(this.form)
              .then((res) => {
                this.setStorage(type, res.token); //存储登录信息
                this.getInfo();
                // 防止跳转太快没有渲染
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({
                    path: "/student_notice",
                  });
                }, 200);
              })
              .catch(() => {
                this.loading = false;
                this.getCodeImg();
                this.form.code = "";
              });
          }
        });
      } else if (type == "admin") {
        // let params = {
        //   username: this.form.username,
        //   password: this.form.password,
        // };
        if (this.form.username == "" || this.form.password == "") {
          this.$message.warning("账号或密码不能为空！");
        } else {
          this.loading = true;
          loginAdmin(this.form)
            .then((res) => {
              if (res.code == 200) {
                this.setStorage(type, res.token); //存储登录信息
                this.getRouters();
                this.getInfo();
                // 防止跳转太快没有渲染
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({
                    path: "/admin_examinee_check",
                  });
                }, 600);
              }
            })
            .catch(() => {
              this.loading = false;
              this.getCodeImg();
              this.form.code = "";
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
    // background: #ffffff;
    background-color: rgba(255, 255, 255, 0.715);
    min-width: 430px;
    max-width: 500px;
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
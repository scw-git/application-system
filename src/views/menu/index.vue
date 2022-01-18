<template>
  <div class="menu">
    <el-menu
      v-if="type == 'student'"
      style="height: calc(100vh - 80px)"
      :default-active="activeIndex"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item style="padding-left: 23px" index="student_notice">
        <i class="el-icon-message-solid iconfont"></i>
        <span slot="title">考试须知</span>
      </el-menu-item>
      <el-submenu index="student_info">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>资料填写</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="student_info_image">上传照片</el-menu-item>
          <el-menu-item index="student_info_basic">个人基本情况</el-menu-item>
          <el-menu-item index="student_info_work">学习/工作情况</el-menu-item>
          <el-menu-item index="student_info_other">奖惩/特长情况</el-menu-item>
          <el-menu-item index="student_info_home">家庭情况</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="student_operation">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>业务办理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="student_operation_queryAndApply"
            >考试查询与报名</el-menu-item
          >
          <el-menu-item index="student_operation_queryStatus"
            >报名状态查询</el-menu-item
          >
          <el-menu-item index="student_operation_pay">考试缴费</el-menu-item>
          <el-menu-item index="student_operation_print"
            >打印笔试准考证</el-menu-item
          >
          <el-menu-item index="student_operation_score">成绩查询</el-menu-item>
          <!-- <el-menu-item index="student_operation_interview"
            >打印面试准考证</el-menu-item
          > -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <el-menu
      router
      v-if="type == 'admin'"
      style="height: calc(100vh - 80px)"
      :default-active="adminActiveIndex"
    >
      <el-submenu
        v-show="router.includes('考生管理')"
        index="admin_examinee_check"
      >
        <template slot="title">
          <i class="el-icon-coordinate"></i>
          <span>考生管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="admin_examinee_check">报名审核</el-menu-item>
          <el-menu-item index="admin_examinee_written">笔试统计</el-menu-item>
          <el-menu-item index="admin_examinee_interview">面试统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu
        v-if="router.includes('考试管理')"
        index="admin_exam_testPaper"
      >
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>考试管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="admin_exam_testPaper">考卷设置</el-menu-item>
          <el-menu-item index="admin_exam_test">考试设置</el-menu-item>
          <el-menu-item index="admin_exam_time">时间设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu v-if="router.includes('考场管理')" index="admin_site_written">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span>考场管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="admin_site_written">笔试考场设置</el-menu-item>
          <el-menu-item index="admin_site_interview">面试地点设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu v-if="router.includes('用户管理')" index="admin_user_role">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="admin_user_role">角色管理</el-menu-item>
          <el-menu-item index="admin_user_group">组别管理</el-menu-item>
          <el-menu-item index="admin_user_user">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu
        v-if="router.includes('系统配置')"
        index="admin_system_notice"
      >
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统配置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="admin_system_notice">通知管理</el-menu-item>
          <el-menu-item index="admin_system_log">操作日志</el-menu-item>
          <el-menu-item index="admin_system_other">其他设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      list: [],
      activeIndex: "student-notice",
      adminActiveIndex: "admin_examinee_check",
      router: [],
    };
  },
  watch: {
    $route(to, from) {
      this.activeIndex = this.$router.currentRoute.name;
      this.adminActiveIndex = this.$router.currentRoute.name;
    },
  },

  created() {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    //只有管理员才有这个
    if (sessionStorage.getItem("router")) {
      let arr = JSON.parse(sessionStorage.getItem("router"));
      this.router = arr.map((item) => {
        return item.name;
      });
    }

    if (loginInfo.type === "student") {
      this.type = "student";
    } else if (loginInfo.type === "admin") {
      this.type = "admin";
    }
    this.activeIndex = this.$router.currentRoute.name;
    this.adminActiveIndex = this.$router.currentRoute.name;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // handleSelect(key) {
    //    this.$router.push(key);
    // },
  },
};
</script>
<style lang="scss" scoped>
.menu {
  // height: calc(100vh - 80px);
  // background-color: red;
  i {
    margin-right: 5px;
  }
}
</style>
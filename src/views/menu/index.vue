<template>
  <div class="menu">
    <el-menu style="height:calc(100vh - 80px)" @select="handleSelect" :default-active="activeIndex">
      <el-menu-item
        style=" padding-left: 40px;"
        :index="item.index"
        v-for="item in list "
        :key="item.title"
      >
        <i :class="`${item.icon} iconfont`"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      student: [
        { icon: "icon-notice", title: "考试须知", index: "student-notice" },
        {
          icon: "icon-kaoshianpai1",
          title: "考试报名",
          index: "student-testRegistration"
        },
        { icon: "icon-pay1", title: "网上缴费", index: "student-payment" },
        {
          icon: "icon-dayin1",
          title: "打印笔试准考证",
          index: "student-writeTicket"
        },
        // {
        //   icon: "icon-kaoshianpai",
        //   title: "考试安排",
        //   index: "student-arrange"
        // },
        {
          icon: "icon-chengjichaxun-",
          title: "成绩查询",
          index: "student-scoreQuery"
        },
        {
          icon: "icon-print",
          title: "打印面试准考证",
          index: "student-interviewTicket"
        }
      ],
      admin: [
        {
          icon: "icon-notice",
          title: "通知管理",
          index: "admin-noticeManagement"
        },
        {
          icon: "icon-notice",
          title: "考试计划",
          index: "admin-examPlan"
        },
        {
          icon: "icon-kaoshianpai1",
          title: "考生管理",
          index: "admin-examineeManagement"
        },
        {
          icon: "icon-dayin1",
          title: "缴费管理",
          index: "admin-payManagement"
        },
        {
          icon: "icon-chengjichaxun-",
          title: "考场管理",
          index: "admin-roomManagement"
        },
        {
          icon: "icon-pay1",
          title: "成绩管理",
          index: "admin-scoreManagement"
        },
        {
          icon: "icon-dayin1",
          title: "短信管理",
          index: "admin-noteManagement"
        }
      ],
      activeIndex: "student-notice"
    };
  },
  created() {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    if (loginInfo.type === "student") {
      this.list = this.student;
    } else if (loginInfo.type === "admin") {
      this.list = this.admin;
    }
    this.activeIndex = this.$router.currentRoute.name;
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    }
  }
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
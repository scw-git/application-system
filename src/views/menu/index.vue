<template>
  <div class="menu">
    <el-menu style="height:calc(100vh - 80px)" @select="handleSelect" :default-active="activeIndex">
      <el-menu-item index="notice">
        <i class="iconfont icon-notice"></i>
        <span slot="title">考试须知</span>
      </el-menu-item>
      <el-menu-item index="testRegistration">
        <i class="iconfont icon-kaoshianpai1"></i>
        <span slot="title">考试报名</span>
      </el-menu-item>
      <el-menu-item index="payment">
        <i class="iconfont icon-pay1"></i>
        <span slot="title">网上缴费</span>
      </el-menu-item>
      <el-menu-item index="writeTicket">
        <i class="iconfont icon-dayin1"></i>
        <span slot="title">打印笔试准考证</span>
      </el-menu-item>
      <el-menu-item index="arrange">
        <i class="iconfont icon-kaoshianpai"></i>
        <span slot="title">考试安排</span>
      </el-menu-item>
      <el-menu-item index="scoreQuery">
        <i class="iconfont icon-chengjichaxun-"></i>
        <span slot="title">成绩查询</span>
      </el-menu-item>
      <el-menu-item index="interviewTicket">
        <i class="iconfont icon-print"></i>
        <span slot="title">打印面试准考证</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "notice"
    };
  },
  created() {
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
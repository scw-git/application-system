<template>
  <div class="index">
    <div class="header">
      <my-header />
    </div>

    <div class="body">
      <div class="list">
        <div class="content">
          <div class="title">
            <div class="left">
              <i class="iconfont icon-kaoshianpai1"></i>
              <span>2021年下半年软考</span>
            </div>
            <div class="right">
              <div class="triangle"></div>未报名
            </div>
          </div>
          <div class="detail">
            <div class="left">
              考生报名时间：2021-08-12 至 2021-08-19
              <br />考生报名时间：2021-08-12 至 2021-08-19
            </div>
            <div class="right">
              <el-button
                type="primary"
                plain
                @click="()=>this.$router.push('student-testRegistration')"
              >点击报名</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="content">
          <div class="title">
            <div class="left">
              <i class="iconfont icon-kaoshianpai1"></i>
              <span>2021年下半年软考</span>
            </div>
            <div class="right">
              <div class="triangle"></div>未报名
            </div>
          </div>
          <div class="detail">
            <div class="left">
              考生报名时间：2021-08-12 至 2021-08-19
              <br />考生报名时间：2021-08-12 至 2021-08-19
            </div>
            <div class="right">
              <el-button disabled>报名已终止</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myHeader from "@/views/header/index";
export default {
  components: {
    myHeader
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.index {
  background-color: #f3f3f3;
  width: 100%;
  min-width: 1300px;
  // height: calc(100vh - 110px);
  .header {
    margin-bottom: 40px;
  }
  .body {
    .list {
      background-color: white;
      padding: 20px;
      border: 1px solid #e6e6e6;
      margin: 0 5%;
      margin-bottom: 80px;
      .content {
        height: 227px;
        border-width: 1px 0;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 57px;
          border-bottom: 1px solid #e6e6e6;
          .left {
            font-size: 18px;
            padding: 0 10px;

            i {
              font-weight: 700;
              font-size: 20px;
              margin-right: 5px;
            }
          }
          .right {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 102px;
            height: 32px;
            color: white;
            background-color: #18a87e;
            .triangle {
              position: absolute;
              left: -21px;
              border: 16px solid white;
              margin-right: 20px;
              transform: rotate(45deg);
              border-left: 16px solid transparent;
              border-bottom: 16px solid transparent;
            }
          }
        }
        .detail {
          height: 157px;
          padding: 30px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="payment">
    <el-empty v-if="status==0" description="暂无待支付订单"></el-empty>
    <div v-else-if="status==1" class="nopay">
      <div class="list">
        <div class="title">
          <h3>报考费用</h3>
        </div>
        <div class="content">
          <span>考试名称：2021年下半年事业单位考试</span>
          <span>报考岗位：会计管理</span>
          <div class="pay">
            缴费时间：2021年3月18日08:00至2021年3月28日08:00
            <div>
              考试费用：
              <span class="triangle"></span>
              <span class="num">136.00元</span>
            </div>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="payment">点击缴费</el-button>
        </div>
      </div>
    </div>
    <di v-else-if="status==2" class="pay">
      <div class="list">
        <div class="title">
          <h3>报考费用</h3>
        </div>
        <div class="content">
          <span>考试名称：2021年下半年事业单位考试</span>
          <span>报考岗位：会计管理</span>

          <div class="pay">
            缴费时间：2021年3月18日08:00至2021年3月28日08:00
            <div>
              考试费用：
              <span class="triangle"></span>
              <span class="num">136.00元</span>
            </div>
          </div>
        </div>
        <div class="payStatus">
          <div class="title" style="margin:40px 0 10px 0;">
            <h3>缴费状态</h3>
          </div>
          <div class="content">
            <span>支付订单：454577473009825</span>
            <span>支付网关：支付宝</span>
            <span>支付时间：2021-3-18 08:00</span>
            <span>支付金额：136.00元</span>
            <div class="pay">
              <div>
                支付结果：
                <span class="triangle"></span>
                <span class="num">缴费成功</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </di>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: 1
    };
  },
  methods: {
    payment() {
      this.status = 2;
    }
  }
};
</script>
<style lang="scss" scoped>
.payment {
  padding: 20px 30px;
  .list {
    position: relative;
    border: 2px solid #e4e7ed;
    padding: 10px 15px;
    margin-bottom: 10px;
    .title h3 {
      font-weight: 700;
      color: #5a8fe6;
    }
    .content {
      line-height: 25px;
      > span {
        display: block;
        font-weight: 700;
      }
      .pay {
        margin-top: 15px;
        div {
          position: relative;
          margin-bottom: 10px;
          margin-top: 5px;
          .triangle {
            position: absolute;
            left: 70px;
            top: 8px;
            display: inline-block;
            border: 5px solid #fc8a26;
            transform: rotate(45deg);
            border-top: 5px solid transparent;
            border-right: 5px solid transparent;
          }
          .num {
            display: inline-block;
            background-color: #fc8a26;
            color: white;
            padding: 0 5px;
            border-radius: 3px;
          }
        }
      }
    }
    .payStatus {
      .pay {
        margin-top: 0;
        div {
          font-weight: 700;
          .triangle {
            border: 5px solid #4fb16f;
            border-top: 5px solid transparent;
            border-right: 5px solid transparent;
          }
          .num {
            font-weight: 500;
            background-color: #4fb16f;
          }
        }
      }
    }
    .btn {
      position: absolute;
      top: 50%;
      left: 85%;
      transform: translate(0, -50%);
    }
  }
}
</style>
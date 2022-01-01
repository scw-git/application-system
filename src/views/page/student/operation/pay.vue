<template>
  <div class="pay frame">
    <el-table :data="dataList">
      <el-table-column
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="考试名称"
        align="center"
        prop="examName"
      ></el-table-column>
      <el-table-column
        label="考试岗位"
        align="center"
        prop="recruitmentJob"
      ></el-table-column>
      <el-table-column label="考试费用" align="center" prop="free">
        <template slot-scope="scope">
          {{ scope.row.free }}
        </template></el-table-column
      >
      <el-table-column label="缴费状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="
              Number(scope.row.payStatus) == 2
                ? 'primary'
                : Number(scope.row.payStatus) == 1
                ? 'success'
                : 'warning'
            "
            >{{
              Number(scope.row.payStatus) == 2
                ? "免费"
                : Number(scope.row.payStatus) == 1
                ? "已缴费"
                : "待缴费"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            v-if="scope.row.payStatus == '0'"
            >缴费
          </el-button>
          <span v-else>暂无操作</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div>
      <div class="frame_title">报考费用</div>
      <div class="list">
        <div class="content">
          <span>考试名称： 2021年下半年事业单位考试</span>
          <span>报考岗位： 会计管理</span>
          <div class="pay">
            缴费时间： 2021年3月18日08:00至2021年3月28日08:00
            <div>
              考试费用： <span class="triangle"></span>
              <span class="num">136.00元</span>
            </div>
          </div>
        </div>
        <div class="payType">
          <span>支付方式： </span>
          <el-radio-group v-model="payType">
            <el-radio :label="1">
              <img src="@/assets/img/wxpay.png" alt="" />
            </el-radio>
            <el-radio :label="2">
              <img src="@/assets/img/alipay.png" alt="" />
            </el-radio>
          </el-radio-group>
        </div>
        <div class="btn">
          <el-button type="primary" @click="payment">点击缴费</el-button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as api from "@/api/operation";
export default {
  data() {
    return {
      isShow: true,
      payType: 1,
      dataList: [],
    };
  },
  created() {
    this.payment();
  },
  methods: {
    payment() {
      api.payment().then((res) => {
        this.dataList = res.data;
        // if (res.code == 200) {

        // } else {
        //   this.isShow = false;
        // }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  position: relative;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-weight: 700;

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
  .payType {
    img {
      height: 30px;
    }
  }

  .btn {
    position: absolute;
    top: 50%;
    left: 85%;
    transform: translate(0, -50%);
  }
}
</style>
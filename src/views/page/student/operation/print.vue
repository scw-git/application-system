<template>
  <div class="b">
    <div class="print">
      <el-empty v-if="isShow">
        <div slot="description">
          <span style="font-size: 20px; color: #dc851f"
            >准考证打印时间未开放，请于2021-5-12至2021-7-12</span
          >
        </div>
      </el-empty>
      <div v-else id="getPdf" class="printForm">
        <div class="applicationForm">
          <div class="left">
            <div class="title">
              <span>广西壮族自治区财政厅事业部</span> <br />
              <span> 2021年下半年全国事业单位考试报名表</span><br />
              <span>准 考 证</span>
            </div>
            <img src="@/assets/img/aa.jpg" alt="" />
            <div class="table">
              <table border="1">
                <tr>
                  <td>姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名：</td>
                  <td class="w230">首成文</td>
                  <td>性 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</td>
                  <td class="tl" style="width: 133px">男</td>
                </tr>
                <tr>
                  <td>身份证号：</td>
                  <td class="tl">232324555666770989</td>
                  <td>准考证号：</td>
                  <td class="tl">34345789</td>
                </tr>
                <tr>
                  <td>报考单位：</td>
                  <td class="tl" colspan="3">广西壮族自治区财政厅事业部</td>
                </tr>
                <tr>
                  <td>报考岗位：</td>
                  <td class="tl" colspan="3">前端开发</td>
                </tr>
                <tr>
                  <td>考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</td>
                  <td class="tl" colspan="3">南宁市</td>
                </tr>
                <tr>
                  <td>考点名称：</td>
                  <td class="tl" colspan="3">广西壮族自治区财政厅事业部</td>
                </tr>
                <tr>
                  <td>报点地址：</td>
                  <td class="tl" colspan="3">广西民族大学</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;考场号：</td>
                  <td class="tl">88</td>
                  <td>座位号：</td>
                  <td class="tl">88</td>
                </tr>
                <tr>
                  <td class="tl" colspan="4">
                    &nbsp;&nbsp; 考试时间及科目：<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    2021年12月30日下午9：30-12：30 前端开发
                  </td>
                </tr>
              </table>
            </div>
            <p class="tip">敬请诚信参考，反对考试作弊，共同维护公平公正！</p>
          </div>
          <div class="right">
            <div class="title">考生须知</div>
            <div class="content">
              <p>
                1、敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！
                <br />
                1、敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！
                <br />
                1、敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！
                1、敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！
                <br />
                1、敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！
                1、敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！敬请诚信参考，反对考试作弊，共同维护公平公正！
              </p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span>广西壮族自治区财政厅事业部 制</span>
        </div>
      </div>
      <el-button
        @click="downLoad"
        style="margin-top: 20px; margin-left: 45%"
        type="primary"
        >下载打印</el-button
      >
    </div>
  </div>
</template>
<script>
import { getPdf } from "@/utils/htmlToPdf";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    downLoad() {
      getPdf("#getPdf");
    },
  },
};
</script>
<style lang="scss" scoped>
.b {
  display: flex;
  justify-content: center;
  .print {
    color: black;
    .applicationForm {
      display: flex;
      margin-top: 20px;
      .left {
        padding-top: 10px;
        text-align: center;
        border: 1px solid #808080;
        .title {
          font-weight: 700;
          color: black;
          font-size: 18px;
        }
        img {
          width: 150px;
        }
        .tip {
          font-weight: 700;
          color: black;
          font-size: 18px;
          margin: 10px 0;
        }
        .table {
          width: 100%;
          margin-top: 15px;
          padding: 5px;
          td {
            padding: 5px;
            //   width: 84px;
            height: 31px;
          }
          .w230 {
            width: 230px;
            text-align: left;
          }
          .tl {
            text-align: left;
          }
        }
      }
      .right {
        padding: 0 5px;
        padding-top: 10px;
        width: 540px;
        border: 1px solid #808080;
        border-left: 0;
        .title {
          text-align: center;
          color: black;
          font-weight: 700;
          font-size: 18px;
        }
        .content {
          margin-top: 10px;
        }
      }
    }
    .bottom {
      text-align: center;
      width: 1078px;
      color: black;
      font-weight: 16px;
      border: 1px solid #808080;
      border-top: 0;
      padding: 5px 0;
    }
  }
}
</style>
<template>
  <div class="b">
    <div class="interview">
      <!-- <el-empty>
      <div slot="description">
        <span style="font-size: 20px; color: #dc851f"
          >准考证打印时间未开放，请于2021-5-12至2021-7-12</span
        >
      </div>
    </el-empty> -->
      <div id="getPdf" class="interview_form">
        <div class="title">
          广西财政厅事业单位 <br />
          面试准考证
        </div>
        <div class="table">
          <table border="1">
            <tr>
              <td>面试单位</td>
              <td class="w150">广西财政厅</td>
              <td style="width: 150px; padding: 5px" rowspan="5">
                <img src="@/assets/img/aa.jpg" alt="" />
              </td>
            </tr>
            <tr>
              <td>面试岗位</td>
              <td>技术开发</td>
            </tr>
            <tr>
              <td>面试岗位</td>
              <td>技术开发</td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td>437348573573563</td>
            </tr>
            <tr>
              <td>准考证号</td>
              <td>346427347</td>
            </tr>
            <tr>
              <td>面试时间</td>
              <td colspan="2">2021-12-02 14：30</td>
            </tr>
            <tr>
              <td>面试地点</td>
              <td colspan="2">广西民族大学</td>
            </tr>
          </table>
        </div>
        <div class="tip">
          面试须知：<br />
          1、考生持本人身份原件、面试准考证参加面,。考生持本人身份原件、面试准考证参加面,考生持本人身份原件、面试准考证参加面,考生持本人身份原件、面试准考证参加面,
          <br />
          1、考生持本人身份原件、面试准考证参加面试。 <br />
          1、考生持本人身份原件、面试准考证参加面试。 <br />
          1、考生持本人身份原件、面试准考证参加面试。 <br />
          1、考生持本人身份原件、面试准考证参加面试。 <br />
        </div>
      </div>
      <el-button class="btn" type="primary" @click="downLoad"
        >下载打印</el-button
      >
    </div>
  </div>
</template>
<script>
import { getPdf } from "@/utils/htmlToPdf";
export default {
  data() {
    return {};
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
  margin-top: 20px;
  .interview {
    .interview_form {
      color: black;
      border: 1px solid #808080;
      padding: 10px 7px;
      img {
        width: 150px;
      }
      .title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .table {
        td {
          padding: 12px 20px;
          height: 31px;
        }
      }
      .tip {
        max-width: 555px;
        margin-top: 10px;
      }
    }
    .btn {
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 15px;
    }
    .w150 {
      width: 300px;
    }
  }
}
</style>
<template>
  <div class="b p15">
    <el-table v-show="isShow" :data="dataList">
      <el-table-column
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="考试单位"
        align="center"
        prop="examUnit"
      ></el-table-column>
      <el-table-column
        label="考试岗位"
        align="center"
        prop="recruitmentJob"
      ></el-table-column>
      <el-table-column
        label="考试名称"
        align="center"
        prop="examName"
      ></el-table-column>
      <el-table-column
        label="打印时间"
        align="center"
        prop="printTime"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="getWrittenInfo(scope.row.id)"
            type="primary"
          >
            打印</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="print">
      <div v-show="!isShow" id="getPdf" class="printForm">
        <div class="applicationForm">
          <div class="left">
            <div class="title">
              <span>广西壮族自治区财政厅事业部</span> <br />
              <span>
                {{ time.year }}年{{ time.stage }}全国事业单位考试报名表</span
              ><br />
              <span>准 考 证</span>
            </div>
            <img
              crossOrigin="Anonymous"
              :src="`http://10.9.2.15:8080${personalData.picture}`"
              alt=""
            />

            <div class="table">
              <table border="1">
                <tr>
                  <td>姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名：</td>
                  <td class="w230">{{ personalData.name }}</td>
                  <td>性 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</td>
                  <td class="tl" style="width: 133px">
                    {{ personalData.sex }}
                  </td>
                </tr>
                <tr>
                  <td>身份证号：</td>
                  <td class="tl">{{ personalData.certificateNumber }}</td>
                  <td>准考证号：</td>
                  <td class="tl">{{ personalData.admissionTicketNumber }}</td>
                </tr>
                <tr>
                  <td>报考单位：</td>
                  <td class="tl" colspan="3">{{ personalData.examUnit }}</td>
                </tr>
                <tr>
                  <td>报考岗位：</td>
                  <td class="tl" colspan="3">
                    {{ personalData.recruitmentJob }}
                  </td>
                </tr>
                <!-- <tr>
                  <td>考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</td>
                  <td class="tl" colspan="3">南宁市</td>
                </tr> -->
                <tr>
                  <td>考点名称：</td>
                  <td class="tl" colspan="3">{{ personalData.placeName }}</td>
                </tr>
                <tr>
                  <td>考点地址：</td>
                  <td class="tl" colspan="3">
                    {{ personalData.placeAddress }}
                    {{
                      personalData.placeLocation
                        ? personalData.placeLocation
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;考场号：</td>
                  <td class="tl">{{ personalData.examination }}</td>
                  <td>座位号：</td>
                  <td class="tl">{{ personalData.seatNumber }}</td>
                </tr>
                <tr>
                  <td class="tl" colspan="4">
                    &nbsp;&nbsp; 考试时间：<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {{ personalData.startTime + " 至 " + personalData.endTime }}
                  </td>
                </tr>
              </table>
            </div>
            <p class="tip">敬请诚信参考，反对考试作弊，共同维护公平公正！</p>
          </div>
          <div class="right">
            <div class="title">考生须知</div>
            <div class="content">
              <p v-html="msg"></p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span>广西壮族自治区财政厅事业部 制</span>
        </div>
      </div>
      <el-button
        v-show="!isShow"
        @click="downLoad"
        style="margin-top: 20px; margin-left: 45%"
        type="primary"
        >下载打印</el-button
      >
      <el-button v-show="!isShow" @click="isShow = true" type="primary"
        >返回</el-button
      >
    </div>
  </div>
</template>
<script>
import * as api from "@/api/system";
import { getPdf } from "@/utils/htmlToPdf";
export default {
  data() {
    return {
      dataList: [],
      isShow: true,
      msg: "",
      personalData: {},
      time: {},
    };
  },
  created() {
    this.getOther();
    this.getTime();
    this.getList();
  },
  methods: {
    getList() {
      api.getList().then((res) => {
        this.dataList = res.data;
      });
    },
    getTime() {
      this.time.year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      if (month >= 7) {
        this.time.stage = "下半年";
      } else {
        this.time.stage = "下半年";
      }
    },
    getOther() {
      api.getOther().then((res) => {
        this.msg = res.data[0].writtenNote;
      });
    },
    getWrittenInfo(id) {
      api.getWrittenInfo(id).then((res) => {
        if (res == undefined) {
          this.isShow = true; //未到打印准考证时间
        } else {
          this.isShow = false;
          this.personalData = res.data;
        }
      });
    },
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
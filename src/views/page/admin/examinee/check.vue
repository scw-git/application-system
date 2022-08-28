<template>
  <div>
    <div
      v-show="showWrittenPrint == false && showInterviewPrint == false"
      class="check p15"
    >
      <div v-show="status" class="content">
        <div class="search">
          <el-select
            clearable
            v-model="queryData.recruitmentJob"
            placeholder="请选择岗位"
          >
            <el-option
              v-for="item in jobList"
              :key="item.id"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>

          <el-date-picker
            style="width: 140px; margin: 0 10px"
            value-format="yyyy-MM-dd"
            v-model="queryData.createTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-select
            clearable
            style="width: 120px"
            v-model="queryData.sex"
            placeholder="选择性别"
          >
            <el-option label="男" value="1"> </el-option>
            <el-option label="女" value="0"> </el-option>
          </el-select>
          <el-input
            clearable
            @keydown.enter.native="getData()"
            v-model="idOrName"
            style="width: 230px; margin: 0 10px"
            placeholder="请输入身份证或者名字"
          ></el-input>
          <el-button
            style="margin-right: 10px"
            size="medium"
            type="primary"
            @click="getData()"
            >确定</el-button
          >
          <el-popover placement="bottom-start" width="210" trigger="hover">
            <el-button @click="checkAllPass(1)" size="mini">
              审核通过</el-button
            >
            <el-button @click="checkAllPass(2)" size="mini"
              >审核不通过</el-button
            >
            <el-button
              v-show="params.status == '2'"
              size="medium"
              type="primary"
              slot="reference"
              >批量审核</el-button
            >
          </el-popover>
          <!-- <el-button
            style="margin-right: 10px"
            size="medium"
            type="primary"
            @click="printInfo"
            >下载报名信息表</el-button
          > -->
          <el-button
            @click="batchSend"
            v-show="params.status == '1'"
            size="medium"
            type="primary"
            slot="reference"
            >批量发送短信</el-button
          >
          <!-- <el-button
            @click="changeStatus"
            v-show="params.status == '1'"
            size="medium"
            type="primary"
            slot="reference"
            >修改审核状态</el-button
          > -->
        </div>
        <el-tabs
          v-loading="loading"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="待审核" name="dsh">
            <el-table
              @selection-change="handleSelectionChange"
              border
              :data="allData"
            >
              <el-table-column type="selection" width="45"> </el-table-column>
              <el-table-column
                align="center"
                width="60"
                label="序号"
                type="index"
              ></el-table-column>
              <el-table-column
                align="center"
                label="姓名"
                prop="userName"
              ></el-table-column>
              <el-table-column
                align="center"
                width="50"
                label="性别"
                prop="sex"
              >
                <template slot-scope="scope">
                  {{ scope.row.sex == "0" ? "女" : "男" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="政治面貌"
                prop="politics"
              ></el-table-column>
              <el-table-column
                label="毕业院校"
                prop="graduatedSchool"
              ></el-table-column>
              <el-table-column
                width="155"
                align="center"
                label="报名时间"
                prop="createTime"
              ></el-table-column>
              <el-table-column
                align="center"
                label="报考单位"
                prop="examUnit"
              ></el-table-column>
              <el-table-column
                align="center"
                label="报考岗位"
                prop="recruitmentJob"
              ></el-table-column>
              <el-table-column width="150" align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="check(scope.row)"
                    type="primary"
                    size="small"
                    >审核并打印信息表</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已通过" name="ytg">
            <el-table
              @selection-change="handleSelectionChange"
              border
              :data="allData"
            >
              <el-table-column type="selection" width="45"> </el-table-column>
              <el-table-column
                align="center"
                width="60"
                label="序号"
                type="index"
              ></el-table-column>
              <el-table-column
                align="center"
                label="姓名"
                prop="userName"
              ></el-table-column>
              <el-table-column
                width="50"
                align="center"
                label="性别"
                prop="sex"
              >
                <template slot-scope="scope">
                  {{ scope.row.sex == "0" ? "女" : "男" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="政治面貌"
                prop="politics"
              ></el-table-column>
              <el-table-column
                label="毕业院校"
                prop="graduatedSchool"
              ></el-table-column>
              <el-table-column
                width="155"
                align="center"
                label="报名时间"
                prop="createTime"
              ></el-table-column>
              <el-table-column
                align="center"
                label="报考单位"
                prop="examUnit"
              ></el-table-column>
              <el-table-column
                align="center"
                label="报考岗位"
                prop="recruitmentJob"
              ></el-table-column>
              <el-table-column align="center" label="缴费状态" prop="payStatus">
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.payStatus == '0'
                        ? 'warning'
                        : scope.row.payStatus == '1'
                        ? 'success'
                        : 'primary'
                    "
                  >
                    {{
                      scope.row.payStatus == "0"
                        ? "待缴费"
                        : scope.row.payStatus == "1"
                        ? "已缴费"
                        : "免费"
                    }}
                  </el-tag>
                </template></el-table-column
              >
              <el-table-column align="center" width="280" label="操作">
                <template class="op" slot-scope="scope">
                  <div class="one">
                    <el-button
                      style="margin-bottom: 5px"
                      type="primary"
                      @click="openDialog(scope.row.id)"
                      size="small"
                      >修改审核状态</el-button
                    >
                    <el-button
                      style="margin-bottom: 5px"
                      type="primary"
                      @click="check(scope.row)"
                      size="small"
                      >查看并打印信息表</el-button
                    >
                  </div>
                  <div class="two">
                    <el-button
                      type="primary"
                      @click="printWritten(scope.row.id)"
                      size="small"
                      >打印笔试准考证</el-button
                    >
                    <el-button
                      type="primary"
                      @click="printInterview(scope.row.id)"
                      size="small"
                      >打印面试准考证</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="未通过" name="wtg">
            <el-table border :data="allData">
              <el-table-column type="selection" width="45"> </el-table-column>
              <el-table-column
                align="center"
                width="60"
                label="序号"
                type="index"
              ></el-table-column>
              <el-table-column
                align="center"
                label="姓名"
                prop="userName"
              ></el-table-column>
              <el-table-column
                align="center"
                width="50"
                label="性别"
                prop="sex"
              >
                <template slot-scope="scope">
                  {{ scope.row.sex == "0" ? "女" : "男" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="政治面貌"
                prop="politics"
              ></el-table-column>
              <el-table-column
                label="毕业院校"
                prop="graduatedSchool"
              ></el-table-column>
              <el-table-column
                width="155"
                align="center"
                label="报名时间"
                prop="createTime"
              ></el-table-column>
              <el-table-column
                align="center"
                label="报考单位"
                prop="examUnit"
              ></el-table-column>
              <el-table-column
                align="center"
                label="报考岗位"
                prop="recruitmentJob"
              ></el-table-column>
              <el-table-column
                align="center"
                label="未通过原因"
                prop="checkResult"
              >
                <template slot-scope="scope">
                  <el-tag type="warning">{{ scope.row.checkResult }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button @click="check(scope.row)" type="text" size="small"
                    >查看并打印信息表</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-show="!status" class="applicationForm">
        <el-button type="primary" @click="status = true">返回</el-button>

        <application-form id="getPdf" :data="dataList"></application-form>
        <div class="fj">
          <p>附件：</p>
          <a
            style="display: block"
            :href="item.url"
            v-for="item in dataList.annexList"
            :key="item.id"
          >
            {{ item.fileName }}
          </a>
        </div>
        <div class="opinion" style="margin-bottom: 10px">
          <el-input
            v-if="params.status == '2'"
            v-model="opinion"
            placeholder="审核单位意见"
          ></el-input>
        </div>
        <div class="operation">
          <el-button
            type="primary"
            v-if="params.status == '2'"
            @click="checkAndPass(1)"
            >审核通过</el-button
          >
          <el-button
            type="warning"
            v-if="params.status == '2'"
            @click="checkAndPass(2)"
            >审核不通过</el-button
          >
          <el-button type="primary" @click="printPdf">下载打印</el-button>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="reasonDialog" width="30%">
        <el-input placeholder="请输入不通过的理由" v-model="reason"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reasonDialog = false">取 消</el-button>
          <el-button type="primary" @click="allNoPass">确 定</el-button>
        </span>
      </el-dialog>

      <el-pagination
        v-if="total > 0 && status == true"
        style="margin-top: 20px"
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        @size-change="handleSizeChange"
        :current-page="params.pageNum"
        @current-change="handleChangePageNum"
      >
      </el-pagination>
    </div>
    <div class="print" v-if="showWrittenPrint == true">
      <el-button @click="showWrittenPrint = false" type="primary"
        >返回</el-button
      >

      <written :personalData="personalData" />
    </div>
    <div class="printInterview" v-if="showInterviewPrint == true">
      <el-button
        style="margin: 10px 5%"
        @click="showInterviewPrint = false"
        type="primary"
        >返回</el-button
      >

      <interview :id="printInterviewId" />
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-input
        v-model="msg"
        type="textarea"
        :rows="2"
        placeholder="请输入短信内容"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendNote">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <el-input
        v-model="opinion"
        type="textarea"
        :rows="2"
        placeholder="请输入不通过的理由"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="changeStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/examinee";
import { getWrittenInfo } from "@/api/system";
import written from "@/views/page/components/written";
import interview from "@/views/page/components/interview";
import applicationForm from "@/views/page/components/applicationForm";
import { getPdf } from "@/utils/htmlToPdf";

export default {
  components: {
    applicationForm,
    written,
    interview,
  },
  data() {
    return {
      msg: "", //批量发送短线时的短信内容
      dialogVisible1: false,
      dialogVisible: false,
      printInterviewId: "",
      showInterviewPrint: false,
      showWrittenPrint: false, //是否显示打印
      personalData: {},
      reason: "", //批量审核不通过的理由
      reasonDialog: false,
      idOrName: "", //输入框搜索的值
      queryData: {
        recruitmentJob: "",
        createTime: "",
        sex: "",
      }, //搜索参数
      total: 0,

      loading: true,
      opinion: "", //审核不通过的意见
      id: "", //点击“审核查看”时该条的id
      status: true,
      activeName: "dsh",
      dataList: [], //个人的具体内容
      allData: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      jobList: [],
      value: "",
      params: {
        pageNum: 1,
        pageSize: 10,
        status: "2",
        ids: [],
      },
    };
  },
  watch: {
    queryData: {
      handler: function () {
        this.getData();
      },
      deep: true,
    },
  },
  created() {
    this.getData();
    this.getJobList();
  },
  methods: {
    openDialog(id) {
      this.id = id;
      this.dialogVisible1 = true;
    },
    changeStatus() {
      if (this.opinion) {
        this.$confirm("确定审核不通过？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          api
            .checkNoPass({ checkResult: this.opinion, id: this.id })
            .then((res) => {
              this.getData();
              this.$message.success("审核不通过");
              this.dialogVisible1 = false;
            });
        });
      } else {
        this.$message.warning("请输入修改审核意见的理由！");
      }
    },
    printPdf() {
      getPdf("#getPdf");
    },
    // 批量发送短线
    batchSend() {
      if (this.params.ids.length <= 0) {
        this.$message.warning("请勾选考试！！");
      } else {
        this.dialogVisible = true;
      }
    },
    sendNote() {
      let params = {
        ids: this.params.ids,
        msg: this.msg,
      };
      if (this.msg === "") {
        this.$message.warning("请输入内容！");
        return;
      }
      api.batchSend(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("发送成功");
          this.dialogVisible = false;
        }
      });
    },
    // 批量下载报名表
    printInfo() {
      if (this.params.ids.length > 0) {
        // getPdf("#getPdf");
      } else {
        this.$message.warning("请勾选要下载的人员");
      }
    },
    // 打印面试准考证
    printInterview(id) {
      this.printInterviewId = id;
      this.showInterviewPrint = true;
    },
    // 打印笔试准考证
    printWritten(id) {
      // 获取个人打印笔试准考证详细信息
      getWrittenInfo(id).then((res) => {
        if (res.code == 200) {
          this.personalData = res.data;
          this.showWrittenPrint = true;
          // this.$bus.$emit("download");
        }
      });
    },
    handleSelectionChange(data) {
      this.params.ids = data.map((item) => {
        return item.id;
      });
    },
    // 批量审核不通过
    allNoPass() {
      if (this.reason != "") {
        api
          .checkAllNoPass({ ids: this.params.ids, reason: this.reason })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("批量审核不通过已完成！");
              this.getData();
              this.reasonDialog = false;
            }
          });
      } else {
        this.$message.warning("请输入理由");
      }
    },
    // 获取岗位列表
    getJobList() {
      api.getJobList().then((res) => {
        this.jobList = res.data.recruitmentJob;
      });
    },
    // 批量审核
    checkAllPass(n) {
      if (this.params.ids.length > 0) {
        let tip = n == 1 ? "审核通过" : "审核不通过";
        this.$confirm(`确定批量${tip}？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          if (n == 1) {
            api.checkAllPass({ ids: this.params.ids }).then((res) => {
              if (res.code == 200) {
                this.$message.success("审核完成！");
                this.getData();
              }
            });
          } else {
            this.reasonDialog = true;
          }
        });
      } else {
        this.$message.warning("请选择要审核的考生！");
      }
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getData();
    },
    handleChangePageNum(val) {
      this.params.pageNum = val;
      this.getData();
    },

    // 1为审核通过，2不通过
    checkAndPass(n) {
      if (n == 1) {
        this.$confirm("确定审核通过？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          api.checkPass(this.id).then((res) => {
            this.getData();
            this.$message.success("审核成功");
            this.status = true;
          });
        });
      } else if (n == 2) {
        if (this.opinion) {
          this.$confirm("确定审核不通过？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            api
              .checkNoPass({ checkResult: this.opinion, id: this.id })
              .then((res) => {
                this.getData();
                this.$message.success("审核不通过");
                this.status = true;
              });
          });
        } else {
          this.$message.warning("请输入审核单位意见！");
        }
      }
    },
    // 显示附件
    // showFj(url) {
    //   window.open(url);
    //   // window.open(
    //   //   "https://view.officeapps.live.com/op/view.aspx?src=" + url,
    //   //   "_blank"
    //   // );
    // },
    handleClick(val) {
      if (val.name == "dsh") {
        this.params.status = "2";
      } else if (val.name == "ytg") {
        this.params.status = "1";
      } else {
        this.params.status = "0";
      }
      this.getData();
    },
    // 获取待审核、已通过、未通过数据
    getData() {
      this.loading = true;
      api
        .getDsh({ ...this.params, ...this.queryData, idOrName: this.idOrName })
        .then((res) => {
          this.allData = res.rows;
          this.loading = false;
          this.total = res.total;
        });
    },

    check(data) {
      this.id = data.id;
      api.getDshDetail(data.id).then((res) => {
        if (res.code == 200) {
          this.status = false;
          this.dataList = res.data;
        }
      });
      // if (type == "dsh") {
      //   api.getDshDetail(data.id).then((res) => {
      //     this.dataList = res.data;
      //   });
      // } else if (type == "ytg") {
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.op {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  text-align: center;
  // white-space:
}
.print {
  margin: 10px 5%;
}
.printInterview {
  // margin: 10px 5%;
}
.check {
  .content {
    .search {
      margin-bottom: 10px;
    }
  }
  .applicationForm {
    .operation {
      display: flex;
      justify-content: center;
    }
    .fj {
      margin-top: -10px;
      width: 830px;
      margin-left: 50%;
      transform: translateX(-50%);
      padding: 5px;
      border: 1px solid #808080;
      p:nth-child(n + 2) {
        color: #1890ff;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .opinion {
      margin-top: 10px;
      width: 830px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
<template>
  <div class="check p15">
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
            :label="item.recruitmentJob"
            :value="item.recruitmentJob"
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
          @keydown.enter.native="() => getData()"
          v-model="idOrName"
          style="width: 230px; margin: 0 10px"
          placeholder="请输入身份证或者名字"
        ></el-input>
        <el-button
          @click="checkAllPass"
          v-if="params.status == '2'"
          size="medium"
          type="primary"
        >
          批量审核</el-button
        >
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
            <el-table-column align="center" width="50" label="性别" prop="sex">
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
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="check(scope.row)" type="text" size="small"
                  >审核查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已通过" name="ytg">
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
            <el-table-column width="50" align="center" label="性别" prop="sex">
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
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="check(scope.row)" type="text" size="small"
                  >查看</el-button
                >
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
            <el-table-column align="center" width="50" label="性别" prop="sex">
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
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-show="!status" class="applicationForm">
      <el-button type="primary" @click="status = true">返回</el-button>

      <application-form :data="dataList"></application-form>
      <div class="fj">
        <p>附件：</p>
        <p
          @click="showFj(item.url)"
          v-for="item in dataList.annexList"
          :key="item.id"
        >
          {{ item.fileName }}
        </p>
      </div>
      <div class="opinion" style="margin-bottom: 10px">
        <el-input
          v-if="params.status == '2'"
          v-model="opinion"
          placeholder="请输入审核不通过的原因"
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
      </div>
    </div>
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
</template>
<script>
import * as api from "@/api/examinee";
// import { getConfirmForm } from "@/api/operation";

import applicationForm from "@/views/page/components/applicationForm";
export default {
  components: {
    applicationForm,
  },
  data() {
    return {
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
    handleSelectionChange(data) {
      this.params.ids = data.map((item) => {
        return item.id;
      });
    },
    // 获取岗位列表
    getJobList() {
      api.getJobList().then((res) => {
        this.jobList = res.data;
      });
    },
    // 批量审核
    checkAllPass() {
      if (this.params.ids.length > 0) {
        api.checkAllPass({ ids: this.params.ids }).then((res) => {
          if (res.code == 200) {
            this.$message.success("审核完成！");
            this.getData();
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
          this.$message.warning("请输入审核不通过的原因！");
        }
      }
    },
    // 显示附件
    showFj(url) {
      console.log(url);
      // window.open(url);
      window.open(
        "https://view.officeapps.live.com/op/view.aspx?src=" + url,
        "_blank"
      );
    },
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
      p:nth-of-type(2) {
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
<template>
  <div class="written p15">
    <div class="search">
      <el-select
        clearable
        v-model="queryData.recruitmentJob"
        placeholder="请选择岗位"
      >
        <el-option
          v-for="(item, i) in jobList.recruitmentJob"
          :key="i"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        style="margin-left: 10px"
        clearable
        v-model="queryData.examName"
        placeholder="请选择考试名称"
      >
        <el-option
          v-for="(item, i) in jobList.examName"
          :key="i"
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
        @keydown.enter.native="getWrittenList()"
        v-model="idOrName"
        style="width: 200px; margin: 0 10px"
        placeholder="请输入身份证或者名字"
      ></el-input>
      <el-button
        style="margin-right: 10px"
        size="medium"
        type="primary"
        @click="getWrittenList()"
        >确定</el-button
      >
      <el-button
        @click="exportTemplate"
        style="margin-left: 20px"
        size="medium"
        type="primary"
      >
        批量导出</el-button
      >
      <el-upload
        ref="upload"
        style="display: inline-block; padding: 0 10px"
        class="upload-demo"
        action="/api/apply-info/written-batch-import"
        :limit="1"
        :headers="headers"
        accept=".xlsx, .xls"
        :on-success="handleFileSuccess"
        :on-error="() => (isLoading = false)"
        :before-upload="() => (isLoading = true)"
        :show-file-list="false"
      >
        <el-button size="medium" :loading="isLoading" type="primary">
          批量导入成绩</el-button
        >
      </el-upload>

      <el-button size="medium" type="primary" @click="allSendIntervie">
        批量发送面试通知</el-button
      >
    </div>
    <div class="table" v-loading="loading">
      <el-table
        @filter-change="filterChange"
        @selection-change="handleSelectionChange"
        border
        :data="dataList"
        ref="table"
      >
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          width="50"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="考试名称"
          prop="examName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="准考证号"
          prop="admissionTicketNumber"
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
          width="80"
          align="center"
          label="考场号"
          prop="examination"
        >
          <template slot-scope="scope">
            {{ scope.row.examination ? scope.row.examination : "暂无数据" }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="座位号"
          prop="seatNumber"
        >
          <template slot-scope="scope">
            {{ scope.row.seatNumber ? scope.row.seatNumber : "暂无数据" }}
          </template></el-table-column
        >
        <el-table-column
          width="110"
          align="center"
          label="笔试成绩"
          prop="writtenScore"
          column-key="writtenScore"
          :filter-multiple="false"
          :filters="scoreFilters"
        >
        </el-table-column>
        <el-table-column
          width="100"
          column-key="isInterview"
          :filter-multiple="false"
          :filters="isInterviewFilters"
          align="center"
          label="已发面试"
          prop="ifInterview"
        >
          <template slot-scope="scope">
            {{
              scope.row.ifInterview == "0"
                ? "否"
                : scope.row.ifInterview == "1"
                ? "是"
                : "待定中"
            }}
          </template></el-table-column
        >
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="openDialog(scope.row.id)"
            >
              通知面试</el-button
            >
            <el-button
              @click="openWrittenScoreDialog(scope.row.id)"
              type="warning"
              size="mini"
              >填写成绩</el-button
            >
            <!-- <el-button size="mini" type="danger">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialog" width="30%">
        <el-form label-width="50px">
          <el-form-item label="成绩">
            <el-input v-model="personalData.writtenScore"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="writtenScore" type="primary">确认</el-button>
          <el-button @click="dialog = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog title="发送面试" :visible.sync="dialogVisible" width="30%">
      <el-table
        @selection-change="handleInterviewSelectionChange"
        :data="interviewSiteList"
        border
      >
        <el-table-column
          label="序号"
          width="60"
          align="center"
          type="selection"
        ></el-table-column>

        <el-table-column align="center" prop="time" label="面试时间">
          <template slot-scope="scope">
            {{ scope.row.startExamDate }} <br />{{ scope.row.endExamDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="placeAddress"
          label="面试地点"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSendIntervie">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 20px"
      layout="total,sizes,prev, pager, next"
      :total="total"
      :current-page="pagination.pageNum"
      @current-change="handleChangePageNum"
    >
    </el-pagination>
  </div>
</template>
<script>
import * as api from "@/api/examinee";
import { getInterviewSiteList } from "@/api/site";
import { downloadFile } from "@/utils/downloadFile";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      jobList: [],
      //搜索参数
      idOrName: "",
      queryData: {
        recruitmentJob: "",
        createTime: "",
        sex: "",
        examName: "",
      },
      isInterviewFilters: [
        { text: "否", value: "0" },
        { text: "是", value: "1" },
      ],
      scoreFilters: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" },
      ],
      isLoading: false,
      total: 0,
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      laoding: false,
      dialogVisible: false,
      searchValue: "",
      dialog: false,
      interviewSiteList: [], //面试地点列表
      ids: {}, //通知面试所需的两个id
      personalData: {
        id: "",
        writtenScore: "",
      },
      selectedIds: [], //所有选中的id
      selectedArr: [],
      value: "",
      dataList: [],
      tag: false, //区分批量面试通知还是单人
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
    };
  },
  created() {
    this.getJobList();
    this.getWrittenList();
    this.getInterviewSiteList(); //获取面试地点列表
  },
  watch: {
    queryData: {
      handler: function () {
        this.getWrittenList();
      },
      deep: true,
    },
  },
  methods: {
    // 获取岗位列表
    getJobList() {
      api.getJobList().then((res) => {
        this.jobList = res.data;
      });
    },

    filterChange(filters) {
      if (filters.isInterview) {
        this.pagination.ifInterview = filters.isInterview[0];
      } else if (filters.writtenScore) {
        this.pagination.isAsc = filters.writtenScore[0];
        this.pagination.orderByColumn = "writtenScore";
      }
      this.getWrittenList();
    },
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getWrittenList();
    },
    // 批量发送面试通知
    allSendIntervie() {
      if (this.selectedIds.length > 0) {
        this.dialogVisible = true;
        this.tag = true;
      } else {
        this.tag = false;
        this.$message.warning("请选择考生！");
      }
    },
    confirmSendIntervie() {
      if (this.selectedArr.length == 1) {
        if (this.tag) {
          console.log(9, this.ids);
          api
            .allSendIntervie({
              applyIds: this.selectedIds,
              facePlaceId: this.ids.faceInfoId,
            })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("通知面试成功");
                this.getWrittenList();
                this.dialogVisible = false;
              }
            });
        } else {
          api.confirmSendIntervie(this.ids).then((res) => {
            if (res.code == 200) {
              this.$message.success("通知面试成功");
              this.getWrittenList();
              this.dialogVisible = false;
            }
          });
        }
      } else {
        this.$message.warning("只能选一个面试地址！");
      }
    },
    handleInterviewSelectionChange(data) {
      this.selectedArr = data;
      this.ids.faceInfoId = data[0].id;
    },
    openDialog(id) {
      this.dialogVisible = true;
      this.ids.id = id;
    },
    // 获取面试列表
    getInterviewSiteList() {
      getInterviewSiteList().then((res) => {
        this.interviewSiteList = res.rows;
      });
    },
    // 文件上传成功处理
    handleFileSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.$message.success("导入成功！");
        this.isLoading = false;
        this.getWrittenList();
      } else {
        this.$message.error("导入失败！");
        this.isLoading = false;
      }
    },

    handleSelectionChange(data) {
      this.selectedIds = data.map((item) => {
        return item.id;
      });
    },
    openWrittenScoreDialog(id) {
      this.dialog = true;
      this.personalData.id = id;
    },
    getWrittenList() {
      this.loading = true;
      api
        .getWrittenList({
          recruitmentJob: "",
          ...this.pagination,
          ...this.queryData,
          idOrName: this.idOrName,
        })
        .then((res) => {
          this.dataList = res.rows;
          this.total = res.total;
          this.loading = false;
        });
    },
    // 填写笔试成绩
    writtenScore() {
      api.writtenScore(this.personalData).then((res) => {
        this.$message.success("操作成功！");
        this.dialog = false;
        this.getWrittenList();
      });
    },

    exportTemplate() {
      let name = new Date().getFullYear() + "年笔试统计.xlsx";
      api
        .exportTemplate({
          ids: this.selectedIds,
          recruitmentJob: this.searchValue,
        })
        .then((res) => {
          downloadFile(res, name);
          this.$refs.table.clearSelection();
        });
      // if (this.selectedIds.length > 0) {

      // } else {
      //   this.$message.warning("请选择要导出的内容！");
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.written {
  .search {
    margin-bottom: 20px;
  }
}
</style>
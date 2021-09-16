<template>
  <div class="notice">
    <div class="menu">
      <div class="left-menu">
        <el-radio-group v-model="radio">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="未审核"></el-radio-button>
          <el-radio-button label="审核未通过"></el-radio-button>
          <el-radio-button label="审核通过"></el-radio-button>
          <el-radio-button label="面试人员"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="right-menu">
        <el-button type="primary">批量审核</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="danger">批量删除</el-button>
        <el-button type="success">发送面试通知</el-button>
        <el-button type="primary">打印笔试准考证</el-button>
        <el-button type="primary">打印面试准考证</el-button>
      </div>
    </div>
    <div class="search">
      <el-row>
        <el-select class="mr10" v-model="searchValue.unit" placeholder="请选择报考单位">
          <el-option label="单位一"></el-option>
          <el-option label="单位二"></el-option>
        </el-select>
        <el-select class="mr10" v-model="searchValue.job" placeholder="请选择岗位">
          <el-option key="1" label="岗位一"></el-option>
          <el-option key="2" label="岗位二"></el-option>
        </el-select>
        <el-select class="mr10" style="width:110px" v-model="searchValue.sex" placeholder="性别">
          <el-option key="1" label="男"></el-option>
          <el-option key="2" label="女"></el-option>
        </el-select>
        <el-select class="mr10" style="width:110px" v-model="searchValue.year" placeholder="年份">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary">确认</el-button>
        <el-button type="warning">重置</el-button>
      </el-row>

      <el-input
        style="width:300px;"
        placeholder="请输入身份证或者姓名"
        prefix-icon="el-icon-search"
        v-model="searchValue.value"
        @keyup.enter.native="search"
      ></el-input>
    </div>
    <div class="content">
      <el-table border style="width: 100%" :data="dataList">
        <el-table-column
          width="50"
          align="center"
          type="selection"
          @selection-change="selectionChange"
        ></el-table-column>

        <!-- <el-table-column label="序号" width="80" align="center" type="index"></el-table-column> -->
        <el-table-column fixed label="姓名" width="100" align="center" prop="name"></el-table-column>
        <el-table-column label="性别" width="80" align="center" prop="sex"></el-table-column>
        <!-- <el-table-column label="手机号" width="120" align="center" prop="phone"></el-table-column> -->
        <!-- <el-table-column label="出生年月" width="120" align="center" prop="birth"></el-table-column>
        <el-table-column label="民族" width="80" align="center" prop="nation"></el-table-column>-->
        <el-table-column label="政治面貌" width="80" align="center" prop="politics"></el-table-column>
        <el-table-column label="学历" width="80" align="center" prop="education"></el-table-column>
        <el-table-column label="毕业学校" min-width="150" align="center" prop="school"></el-table-column>
        <el-table-column label="专业" width="150" align="center" prop="profession"></el-table-column>
        <el-table-column label="报名时间" width="100" align="center" prop="registrationTime"></el-table-column>
        <!-- <el-table-column label="报考单位" width="100" align="center" prop="unit"></el-table-column> -->
        <el-table-column label="报考岗位" width="80" align="center" prop="job"></el-table-column>
        <el-table-column label="缴费状态" width="80" align="center" prop="payStatus">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.payStatus=='已缴费'">{{scope.row.payStatus}}</el-tag>
            <el-tag type="warning" v-else>{{scope.row.payStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="100" align="center" prop="checkStatus">
          <template slot-scope="scope">
            <el-tag
              type="success"
              v-if="scope.row.checkStatus=='审核通过'||scope.row.checkStatus=='面试人员'"
            >{{scope.row.checkStatus}}</el-tag>
            <el-tag type="warning" v-else>{{scope.row.checkStatus}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="205" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.checkStatus=='未审核'"
              @click="toDetail(scope)"
              size="mini"
              type="danger"
            >审核</el-button>
            <el-button class="mr10" @click="toDetail(scope)" size="mini" type="success">详情</el-button>
            <el-dropdown>
              <el-button type="primary" size="mini">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item v-if="scope.row.checkStatus=='未审核'">审核</el-dropdown-item> -->
                <el-dropdown-item>导出</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>-->
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import { getFullYear } from "@/utils/common.js";
export default {
  data() {
    return {
      radio: "全部",
      yearOptions: [],
      searchValue: {
        unit: "",
        job: "",
        sex: "",
        year: null,
        value: ""
      },
      dataList: [
        {
          name: "首成文",
          sex: "男",
          phone: "124334433",
          birth: "2020-12-21",
          nation: "瑶族",
          politics: "群众",
          education: "本科",
          school: "广西民族大学",
          profession: "计算机科学与技术",
          registrationTime: "2021-5-08",
          unit: "财政厅",
          job: "开发",
          payStatus: "未缴费",
          checkStatus: "未审核"
        },
        {
          name: "首成文",
          sex: "男",
          phone: "124334433",
          birth: "2020-12-21",
          nation: "瑶族",
          politics: "群众",
          education: "本科",
          school: "广西民族大学",
          profession: "计算机科学与技术",
          registrationTime: "2021-5-08",
          unit: "财政厅",
          job: "开发",
          payStatus: "已缴费",
          checkStatus: "审核通过"
        },
        {
          name: "首成文",
          sex: "男",
          phone: "124334433",
          birth: "2020-12-21",
          nation: "瑶族",
          politics: "群众",
          education: "本科",
          school: "广西民族大学",
          profession: "计算机科学与技术",
          registrationTime: "2021-5-08",
          unit: "财政厅",
          job: "开发",
          payStatus: "未缴费",
          checkStatus: "审核未通过"
        },
        {
          name: "首成文",
          sex: "男",
          phone: "124334433",
          birth: "2020-12-21",
          nation: "瑶族",
          politics: "群众",
          education: "本科",
          school: "广西民族大学",
          profession: "计算机科学与技术",
          registrationTime: "2021-5-08",
          unit: "财政厅",
          job: "开发",
          payStatus: "已缴费",
          checkStatus: "面试人员"
        }
      ]
    };
  },
  created() {
    this.yearOptions = getFullYear();
  },
  watch: {
    radio() {}
  },
  methods: {
    toDetail() {
      this.$router.push({
        path: "/applicationForm"
      });
    },
    selectionChange() {},
    search() {
      console.log("search");
    }
  }
};
</script>
<style lang="scss" scoped>
.notice {
  width: 100%;
  .mr10 {
    margin-right: 5px;
  }
  padding: 20px 30px;
  .menu {
    display: flex;
    .right-menu {
      margin-left: 30px;
    }
  }
  .search {
    margin: 20px 0 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .content {
    width: 100%;
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>

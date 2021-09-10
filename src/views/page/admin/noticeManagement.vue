<template>
  <div class="notice">
    <div class="menu">
      <div class="left-menu">
        <el-radio-group v-model="radio">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="已发布"></el-radio-button>
          <el-radio-button label="未发布"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="right-menu">
        <el-button>新建</el-button>
        <el-button>批量发布</el-button>
        <el-button>批量删除</el-button>
      </div>
    </div>
    <div class="search">
      <el-select v-model="searchValue.year" placeholder="请选择">
        <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input
        style="width:300px;margin-left:20px;"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchValue.value"
        @keyup.enter.native="search"
      ></el-input>
    </div>
    <div class="content">
      <el-table border :data="dataList">
        <el-table-column
          width="50"
          align="center"
          type="selection"
          @selection-change="selectionChange"
        ></el-table-column>

        <el-table-column label="序号" align="center" width="100" type="index"></el-table-column>
        <el-table-column label="标题" align="center" prop="title"></el-table-column>
        <el-table-column label="状态" width="120" align="center" prop="status"></el-table-column>
        <el-table-column label="创建时间" width="180" align="center" prop="time"></el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">发布</el-button>
            <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>-->
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
        year: null,
        value: ""
      },
      dataList: [
        {
          title: "干活搜狗黑色公共受开发商手工活干活搜狗黑色公共受开发商手工活",
          status: "已发布",
          time: "2021-3-23 13:45"
        },
        {
          title: "干活搜狗黑色公共受开发商手工活",
          status: "未发布",
          time: "2021-3-23 13:45"
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
    selectionChange() {},
    search() {
      console.log("search");
    }
  }
};
</script>
<style lang="scss" scoped>
.notice {
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
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>

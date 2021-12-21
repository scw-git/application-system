<template>
  <div class="time p15">
    <el-button type="primary" @click="add">发布时间</el-button>
    <div class="table">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="考试名称"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="check"
          label="审核时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="query"
          label="成绩查询时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="print"
          label="打印笔试时间"
        ></el-table-column>

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="add(2)">
              查看</el-button
            >
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发布时间" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="150px" :model="form" :rules="rules">
        <el-form-item label="选择考试">
          <el-select v-model="form.ks" placeholder="请选择">
            <el-option label="考试一" value="1"> </el-option>
            <el-option label="考试2" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成绩查询时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="打印笔试准考证时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      dialogVisible: false,
      form: {
        position: 1,
      },
      rules: {},
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
<template>
  <div class="applicationFrom">
    <!-- <el-button @click="aa('#getPdf')">pdf</el-button> -->

    <div id="getPdf" class="wrap">
      <div class="title">
        <h1>
          广西壮族自治区财政厅厅属事业单位
          <br />2020年度公开招聘工作人员报名表
        </h1>
      </div>
      <div class="body">
        <table border="1">
          <tr>
            <td class="tac">报考单位</td>
            <td colspan="5">广西财会培训考试中心</td>
            <td rowspan="5" style="height:156px;width:169px;">
              <img style="width:100%;" src="@/assets/img/aa.jpg" alt />
            </td>
          </tr>
          <tr>
            <td class="tac">报考岗位</td>
            <td colspan="3">综合管理局</td>
            <td class="tac">岗位代码</td>
            <td>003</td>
          </tr>
          <tr>
            <td class="tac">姓名</td>
            <td>首成文</td>
            <td class="tac">性别</td>
            <td>男</td>
            <td class="tac">出生年月</td>
            <td>2021-02-23</td>
          </tr>
          <tr>
            <td class="tac">籍贯</td>
            <td>广西贺州</td>
            <td class="tac">民族</td>
            <td>瑶</td>
            <td class="tac">政治面貌</td>
            <td>群众</td>
          </tr>
          <tr>
            <td class="tac">个人特长</td>
            <td>玩游戏</td>
            <td>健康状态</td>
            <td>良好</td>
            <td class="tac">专业技术职务</td>
            <td>前端开发</td>
          </tr>
          <tr>
            <td class="tac" rowspan="2">身份证号码</td>
            <td rowspan="2" colspan="3">2322222222222222222</td>
            <td class="tac" style="height:25px;">手机号码</td>
            <td style="height:17px;" colspan="2">12455555555</td>
          </tr>
          <tr>
            <td class="tac" style="height:25px;">电子邮箱</td>
            <td style="height:17px;" colspan="2">1324555555@qq.com</td>
          </tr>
          <tr>
            <td class="tac">教育程度</td>
            <td>学历/学位</td>
            <td>本科、学士</td>
            <td>毕业院校及专业</td>
            <td colspan="3">广西民族大学、计算机科学与技术</td>
          </tr>
          <tr>
            <td class="tac" colspan="2">
              现工作单位及职务
              <br />(在职人员填写)
            </td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td class="tac">家庭住址</td>
            <td colspan="6"></td>
          </tr>
          <tr>
            <td style="padding:10px 0;height:200px;" class="tac">
              学习及工作简历
              <br />(从大大学开始填写)
            </td>
            <td style="vertical-middle:top;" colspan="6">
              2021-02-23 在xxxxxxxxxxx
              <br />2021-02-23 在xxxxxxxxxxx
              <br />2021-02-23 在xxxxxxxxxxx
              <br />
            </td>
          </tr>
          <tr>
            <td style="height:100px;" class="tac">奖惩情况</td>
            <td colspan="6"></td>
          </tr>
          <tr>
            <td class="tac" rowspan="4">家庭主要成员及社会关系</td>
            <td>关系</td>
            <td>姓名</td>
            <td>政治面貌</td>
            <td>出生年月</td>
            <td colspan="2">工作单位和职务</td>
          </tr>
          <tr>
            <td>父亲</td>
            <td>xxx</td>
            <td>群众</td>
            <td>xxxx</td>
            <td colspan="2">xxxx</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="2"></td>
          </tr>
          <!-- <tr>
            <td class="tac">签名确认</td>
            <td colspan="6">
              <div>
                <div style="padding:5px 0;">本人对以上内容的真实性、准确性和合法性负责，如有虚假，愿意承担责任。</div>
                <div style="text-align:right;margin-right:30%">考生签名：</div>
                <div style="text-align:right;margin-right:20%">年 月 日</div>
              </div>
            </td>
          </tr>-->
          <tr>
            <td class="tac" style="padding:5px 0;">
              招聘单位
              <br />审核意见
            </td>
            <td colspan="6"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { getPdf } from "@/utils/htmlToPdf";
export default {
  data() {
    return {
      dataList: [
        {
          unit: "广西财会培训考试中心"
        }
      ]
    };
  },
  methods: {
    aa(id) {
      getPdf(id);
    }
  }
};
</script>
<style lang="scss" scoped>
.applicationFrom {
  padding: 20px 30px;

  .wrap {
    .title {
      text-align: center;
      h1 {
        font-weight: 700;
        font-size: 26px;
      }
    }
    .body {
      display: flex;
      justify-content: center;
      .tac {
        text-align: center;
        padding-left: 0px;
      }
      td {
        padding-left: 15px;
        width: 110px;
        height: 37px;
      }
    }
  }
}
</style>
<template>
  <div class="artical-list">
    <el-button type="primary" plain class="add-artical-btn" @click="articalAdd">新建文章</el-button>
 
    <el-tabs v-model="activeName" @tab-click="handleClick" class="artical-tab">
      <el-tab-pane label="已发布文章" name="first">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column v-for="(item, index) in labelField" :key="index"
                :prop="item.prop"
                :label="item.label">
                <template slot-scope="scope">
                    <div v-if="item.prop == 'oper'">
                        <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">预览</el-button> -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                    
                    <span v-else> {{ scope.row[item.prop] }} </span>
                </template>
 
            </el-table-column>
        </el-table>        
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="second">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column v-for="(item, index) in labelField" :key="index"
                :prop="item.prop"
                :label="item.label">
                <template slot-scope="scope">
                    <div v-if="item.prop == 'oper'">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                    
                    <span v-else> {{ scope.row[item.prop] }} </span>
                </template>
 
            </el-table-column>
        </el-table> 
      </el-tab-pane>
    </el-tabs>
    <div class="party-jx-dialog">
      <el-dialog top="20px" :title="formTitle" :visible.sync="partyJxDialog" :before-close="jxDialogBeforeClose" width="100%">
        <quill-edit
          ref="editJx"
          :partyFormData="partyFormData"
          :isCarouselShow="isCarouselShow"
          :partyFormModel.sync="partyFormModel"
          @radioChange="isCarouselChange"
          :partyDialogVisible.sync="partyDialogVisible"
          :partydetails.sync="jxdetails"
          :dialogVis.sync="partyJxDialog"
          @creatAdd="creatAdd"
          @saveDraft="saveDraft"
        ></quill-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QuillEdit from "@/components/QuillEdit.vue"
export default {
  components: {QuillEdit},
  data() {
    return {
      activeName: 'first',
      formTitle: "新建文章",
      partyJxDialog: false,
      labelField: [
        {
          prop: "title",
          label: "标题",
        },
        {
          prop: "date",
          label: "发布日期",
        },
        {
          prop: "oper",
          label: "操作",
        },

      ],
      tableData: [{
                title: 'test',
                date: '2019-10-11',
                oper: ''
            }, {
                title: 'test',
                date: '2019-10-11',
                oper: ''
      }],
      jxdetails: {},
      partyDialogVisible: false,
      partyFormData: [
        { id: "title", label: "简讯标题", colSpan: 12, type: "input" },
      ],
      isCarouselShow: false,
      partyFormModel: {
        title: "",
      },  
  
    }
  },
  methods: {
    articalAdd() {
      this.partyJxDialog = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    jxDialogBeforeClose() {
      this.partyJxDialog = false;
    },
    isCarouselChange(val) {
      if (val == "1") {
        this.isCarouselShow = true;
      } else {
        this.isCarouselShow = false;
      }
    },
    creatAdd(data) {
      // if (!data.title) {
      //   this.$message.error("请输入简讯标题");
      //   return;
      // }
      // if (this.partyFormModel.isCover == 1) {
      //   if (!data.cover) {
      //     this.$message.error("请添加封面");
      //     return;
      //   }
      //   if (!data.coverTitle) {
      //     this.$message.error("请添加封面标题");
      //     return;
      //   }
      // }
      // delete data.attaches;
      
    },
    saveDraft(data) {
      // delete data.attaches;
      // console.log(data);
      // request("party/news/saveDraft", data).then(result => {
      //   if (result) {
      //     this.partyFormModel.id = result;
      //     this.$message("保存成功");
      //     this.partyList("news", "listDraft", this.tabIndex, 0);
      //     this.partyJxDialog = false;
      //   }
      // });
    },    
  }

}
</script>

<style lang="scss">
.artical-list{
  padding: 20px;
  padding-top: 0;
  .add-artical-btn{
    position: absolute;
    right: 20px;
    margin-top: -10px;
    z-index: 100;
  }
  .artical-tab{
    margin-top: 20px;
  }
}
</style>

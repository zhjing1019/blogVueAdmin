<template>
  <div class="artical-list">
    <el-button type="primary" plain class="add-artical-btn" @click="articalAdd">新建文章</el-button>
    <el-select class="artical-type-select" v-model="type" placeholder="请选择文章分类">
      <el-option
        v-for="item in typeData"
        :key="item.name"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
 
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
                    <div v-else-if="item.prop == 'lastModifyTime'">
                        {{new Date(scope.row[item.prop])}}
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
          :partyDialogVisible.sync="partyDialogVisible"
          :partydetails.sync="jxdetails"
          :dialogVis.sync="partyJxDialog"
          @creatAdd="creatAdd"
          @saveDraft="saveDraft"
          @typeChange="typeChange"

        ></quill-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QuillEdit from "@/components/QuillEdit.vue"
export default {
  components: {QuillEdit},
  data() {
    return {
      type: "",
      typeData: [],
      activeName: 'first',
      formTitle: "新建文章",
      partyJxDialog: false,
      labelField: [
        {
          prop: "title",
          label: "标题",
        },
        {
          prop: "lastModifyTime",
          label: "发布日期",
        },
        // {
        //   prop: "oper",
        //   label: "操作",
        // },

      ],
      tableData: [],
      jxdetails: {},
      partyDialogVisible: false,
      partyFormData: [
        { id: "title", label: "文章标题", colSpan: 24, type: "input" },
        { id: "brief", label: "文章简介", colSpan: 24, type: "textarea"},
        { id: "type", label: "文章分类", colSpan: 12, type: "select", list: []},
        { id: "tags", label: "文章标签", colSpan: 12, multiple: true, type: "select", list:[]},

      ],
      isCarouselShow: false,
      partyFormModel: {
        title: "",
        brief: "",
        type: "",
        tags: [],
      },  
  
    }
  },
  mounted() {
    this.getType()
  },
  watch: {
    type() {
      this.getArtical();
    }
  },
  methods: {
    //获取所有分类
    getType() {
      let _this = this;
      axios.get('cms/type')
        .then(function (res) {
          console.log(res.data.data)
            _this.typeData = res.data.data;
            _this.type = _this.typeData[0].name;
            _this.partyFormData[2].list = res.data.data
        })
        .catch(function (error) {
          _this.$message.error(error.msg);
        })
    },
    //根据分类获取文章
    getArtical() {
      let _this = this;
      axios.get('/cms/article/' + _this.type)
        .then(function (res) {
            _this.tableData = res.data.data;
        })
        .catch(function (error) {
          _this.$message.error(error.msg);
        })
    },
    typeChange(value) {
      this.typeData.forEach(x => {
        if(x.name === value) this.partyFormData[3].list = x.tags
      })

    },
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
      let _this = this;
      axios({
        method: 'post',
        url: '/cms/article/edit',
        data: data
      }).then(() => {
        _this.getArtical();
        _this.partyJxDialog = false;
      }).catch(error => {
        _this.$message.error(error.msg);
      });
      
    },
    saveDraft(data) {
      console.log(data);
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
  .artical-type-select{
    position: absolute;
    right: 130px;
    margin-top: -10px;
    z-index: 100;
  }
}
</style>

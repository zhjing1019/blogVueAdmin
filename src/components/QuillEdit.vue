<template>
  <div class="partyjx-release-form scroll-div">
    <el-row class="party-building-form-main">
      <el-form :model="form" ref="ruleForm"  label-width="80px">
        <template v-for="(item, index) in partyFormData">
          <el-col :span="item.colSpan" :key="index">
            <el-form-item :label="item.label">
              <el-input v-if="item.type == 'input'" v-model="form[item.id]"></el-input>
              <el-input v-if="item.type == 'textarea'" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form[item.id]"></el-input>
              <el-select @change="typeChange(form[item.id])" v-if="item.type == 'select'" v-model="form[item.id]" placeholder="请选择" :multiple="item.multiple ? item.multiple : false">
                <el-option
                  v-for="y in item.list"
                  :key="y.name"
                  :label="y.name"
                  :value="y.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24">
          <div class="partyjx-editor">
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
            >
            </quill-editor>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="text-align-right el-form-footer">
      <el-button class="red-default-btn" @click="cancel">取消</el-button>
      <!-- <el-button class="red-default-btn" @click="saveDraft">保存到草稿箱</el-button> -->
      <!-- <el-button class="red-default-btn" @click="seeModel">预览</el-button> -->
      <el-button type="primary" class="red-btn" @click="creatAdd">立即创建</el-button>
    </el-row>
  </div>
</template>
<script>

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      fileListArr: [],
      content: "",
      nowHtml: "",
      summary: "",
      fileList: [],
      form: this.partyFormModel,
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image"]
          ]
        },
        placeholder: "请输入..."
      }
    };
  },
  props: {
    partyFormData: Array,
    isCarouselShow: Boolean,
    partyFormModel: Object,
    uploadFile: Boolean,
    partyDialogVisible: Boolean,
    partydetails: Object,
    dialogVis: Boolean
  },
  components: {
    // UploadImg,
    // UploadFile,
    quillEditor
  },
  computed: {
    upDataForm() {
      let ids = [];
      this.fileList.forEach(x => {
        let idDetail = { attach: x.id };
        ids.push(idDetail);
      });
      let data = {
        title: this.form.title,
        brief: this.form.brief,
        type: this.form.type,
        tags: this.form.tags,
        content: this.nowHtml,
      };
      return data;
    },
    upDataContent() {
      let data = {
        title: this.form.title,
        brief: this.form.brief,
        type: this.form.type,
        tags: this.form.tags,
        content: this.nowHtml,
      };
      if (this.partyFormModel.id) data.id = this.partyFormModel.id;
      return data;
    },
    formData() {
      let data = this.form;
      this.$emit("updata:partyFormModel", this.form);
      return data;
    }
  },

  watch: {
    partyDialogVisible: function(val) {
      this.partyDialogVisible = val;
    },
    dialogVis: function(val) {
      this.dialogVis = val;
    },

    partyFormModel: {
      handler(val) {
        this.partyFormModel = val;
      },
      deep: true
    },

  },
  methods: {
    typeChange(value) {
      this.$emit("typeChange", value)
    },
    downloadList(list) {
      this.fileList = list;
    },
    resetEditContent() {
      this.content = "";
      this.form = this.partyFormModel;
    },
    giveEditContent(content) {
      this.content = content;
      this.form = this.partyFormModel;
    },
    cancel() {
      this.$emit("update:dialogVis", false);
    },
    // 立即创建
    creatAdd() {
      this.$emit("creatAdd", this.upDataForm);
    },
    // 保存到草稿箱
    saveDraft() {
      if (this.partyFormModel.id) this.upDataForm.id = this.partyFormModel.id;
      this.$emit("saveDraft", this.upDataForm);
    },
    seeModel() {
      this.$emit("update:partydetails", this.upDataContent);
      this.$emit("update:partyDialogVisible", true);
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.nowHtml = html;
      // let summary = text.length > 300 ? text.slice(0, 300) : text;
      // this.summary = summary;
    },
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  }
};
</script>
<style lang="scss">
.partyjx-release-form {
  height: 100%;
  overflow: auto;
  padding: 0 20px;
  .party-building-form-main {
    margin-bottom: 70px;
  }
  .el-input {
    width: 500px;
  }
  .partyjx-editor {
    width: 100%;
    height: 420px;
    margin: 20px 0 0 0;
    .quill-editor {
      height: 380px;
      width: 100%;
      .ql-toolbar {
        background: #f8f8f8;
        border: 1px solid #d9d9d9;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
      }
      .ql-container.ql-snow {
        border: 1px solid #d9d9d9;
        border-radius: 0px 0px 4px 4px;
      }
    }
  }
  .party-building-upload-file-content {
    width: 100%;
    min-height: 72px;
    height: auto;
    background: #f8f8f8;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid #d9d9d9;
    border-top: 0;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-form-footer {
    margin-top: 20px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .red-btn {
    background-color: #e52f32;
    border-color: #e52f32;
  }
  .red-btn:hover {
    background-color: rgba(229, 47, 50, 0.8);
    border-color: rgba(229, 47, 50, 0.8);
  }
  .red-default-btn:hover {
    background: rgba(229, 47, 50, 0.1);
    border: 1px solid #e52f32;
    color: #e52f32;
  }
  .el-radio-button__inner:hover {
    color: #e32b30;
  }
  .is-active .el-radio-button__inner:hover {
    color: #fff;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #e32b30;
    border-color: #e32b30;
    -webkit-box-shadow: -1px 0 0 0 #e32b30;
    box-shadow: -1px 0 0 0 #e32b30;
  }
}
.text-align-right {
  text-align: right;
  box-shadow: 0px 12px 8px -12px #dddddd;
  position: absolute;
  padding: 10px 25px;
  bottom: 0px;
  right: 0;
  background: #fff;
  width: 100%;
  border-top: 1px solid #ddd;
}
</style>

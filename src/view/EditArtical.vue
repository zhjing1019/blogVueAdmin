<template>
  <div class="edit-artical">
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
  </div>
</template>

<script>
import QuillEdit from "@/components/QuillEdit.vue"
export default {
  components: {QuillEdit},
  data() {
    return {
      jxdetails: "",
      partyDialogVisible: false,
      partyJxDialog: false,
      partyFormData: [
        { id: "title", label: "简讯标题", colSpan: 12, type: "input" },
        { id: "source", label: "简讯来源", colSpan: 12, type: "input" },
        {
          id: "isCover",
          label: "是否添加封面",
          colSpan: 24,
          type: "radio-button",
          defaultVal: "0",
          list: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        }
      ],
      isCarouselShow: false,
      partyFormModel: {
        title: "",
        source: "",
        isCover: "0",
        bannerTitle: "",
        bannerId: ""
      },
    }
  },
  methods: {
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
.edit-artical {

}

</style>

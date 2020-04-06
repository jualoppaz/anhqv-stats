<template>
  <el-card
    class="chapter-card"
    shadow="hover"
    :body-style="{ padding: '0px' }">
    <div class="image-container">
      <img v-bind:src="chapter.image_url" class="image">
    </div>
    <div
      class="chapter-card-info"
      style="padding: 14px;">
      <el-row>
        <span class="chapter-name"><b>{{chapter.slug}} - {{chapter.name}}</b></span>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          plain
          v-on:click="goToDetail()">
          {{detailButtonText}}
        </el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ChapterCard',
  props: ['chapter'],
  data() {
    return {
      detailButtonText: this.$t('VIEWS.CHAPTERS.SEE_DETAIL.TEXT'),
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: 'ChapterDetail',
        params: {
          slug: this.chapter.slug,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chapter-card{
  text-align: center;

  .image-container{
    .image{
      width: 100%;
      display: block;
    }
  }

  .chapter-card-info{
    text-align: left;

    .el-row{
      .chapter-name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }

      &:not(:last-child){
        margin-bottom: 20px;
      }
    }
  }
}
</style>

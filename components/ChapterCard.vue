<template>
  <el-card
    class="chapter-card"
    shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img :src="chapter.image_url" class="image">
    </div>
    <div
      class="chapter-card-info"
      style="padding: 14px;"
    >
      <el-row>
        <span class="chapter-name"><b>{{ chapter.natural_id }} - {{ chapter.name }}</b></span>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          plain
          @click="goToDetail()"
        >
          {{ detailButtonText }}
        </el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ChapterCard',
  props: {
    chapter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailButtonText: this.$t('VIEWS.SEASONS.SEE_DETAIL.TEXT'),
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: `seasons-season_number-chapters-slug___${this.$i18n.locale}`,
        params: {
          season_number: this.chapter.season,
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

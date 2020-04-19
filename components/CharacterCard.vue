<template>
  <el-card
    class="character-card"
    shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img :src="character.image_url" class="image">
    </div>
    <div
      class="character-card-info"
      style="padding: 14px;"
    >
      <el-row>
        <span class="character-name"><b>{{ character.shortname }}</b></span>
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
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailButtonText: this.$t('VIEWS.CHARACTERS.SEE_DETAIL.TEXT'),
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: `characters-slug___${this.$i18n.locale}`,
        params: {
          slug: this.character.slug,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.character-card{
  text-align: center;

  .image-container{
    .image{
      width: 100%;
      display: block;
    }
  }

  .character-card-info{
    text-align: left;

    .el-row{
      .character-name{
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

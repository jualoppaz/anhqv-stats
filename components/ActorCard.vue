<template>
  <el-card
    class="actor-card"
    shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img :src="actor.image_url" class="image">
    </div>
    <div
      class="actor-card-info"
      style="padding: 14px;"
    >
      <el-row>
        <span class="actor-name"><b>{{ actor.shortname }}</b></span>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          plain
          @click="goToDetail()"
        >
          {{ detailButtonText }}
        </el-button>
        <font-awesome-icon
          v-if="actor.deathdate"
          class="ribbon"
          icon="ribbon"
          size="2x"
        />
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ActorCard',
  props: {
    actor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailButtonText: this.$t('VIEWS.ACTORS.SEE_DETAIL.TEXT'),
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: `actors-slug___${this.$i18n.locale}`,
        params: {
          slug: this.actor.slug,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.actor-card{
  text-align: center;

  .image-container{
    .image{
      width: 100%;
      display: block;
    }
  }

  .actor-card-info{
    text-align: left;

    .el-row{
      .actor-name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }

      &:not(:last-child){
        margin-bottom: 20px;
      }

      .ribbon{
        float: right;
      }
    }
  }
}
</style>

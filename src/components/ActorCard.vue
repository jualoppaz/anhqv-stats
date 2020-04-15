<template>
  <el-card
    class="actor-card"
    shadow="hover"
    :body-style="{ padding: '0px' }">
    <div class="image-container">
      <img v-bind:src="actor.image_url" class="image">
    </div>
    <div
      class="actor-card-info"
      style="padding: 14px;">
      <el-row>
        <span class="actor-name"><b>{{actor.shortname}}</b></span>
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
  name: 'ActorCard',
  props: ['actor'],
  data() {
    return {
      detailButtonText: this.$t('VIEWS.CHARACTERS.SEE_DETAIL.TEXT'),
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: 'ActorDetail',
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
    }
  }
}
</style>

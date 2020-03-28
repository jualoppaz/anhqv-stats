<template>
  <el-card
    class="character-card"
    shadow="hover"
    :body-style="{ padding: '0px' }">
    <div class="image-container">
      <img v-bind:src="character.image_url" class="image">
    </div>
    <div
      class="character-card-info"
      style="padding: 14px;">
      <el-row>
        <span><b>{{character.shortname}}</b></span>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          plain
          v-on:click="goToDetail(character)">
          {{detailButtonText}}
        </el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: ['character'],
  data() {
    return {
      detailButtonText: this.$t('VIEWS.CHARACTERS.SEE_DETAIL.TEXT'),
    };
  },
};
</script>

<style lang="scss" scoped>
.character-card{
  text-align: center;

  .image-container{
    @media screen and (min-width: 768px) {
      height: 300px;
    }

    .image{
      width: 100%;
      max-height: 100%;
      display: block;
    }
  }

  .character-card-info{
    text-align: left;

    .el-row{
      &:not(:last-child){
        margin-bottom: 20px;
      }
    }
  }
}
</style>

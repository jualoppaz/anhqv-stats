<template>
  <div id="characters">
    <p>
      Aquí puedes ver el detalle de todos y cada uno de los personajes que aparecen en la serie.
    </p>
    <el-row
      id="characters-list"
      :gutter="gutter"
      v-loading.fullscreen.lock="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col
        class="character-col"
        :xs="24"
        :sm="6"
        :md="6"
        v-for="character in characters"
        :key="character.id">
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
            <span><b>{{character.shortname}}</b></span>
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                v-on:click="goToDetail(character)">
                Detalle
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Characters',
  components: {},
  data() {
    return {
      loading: true,
      gutter: 50,
    };
  },
  created() {
    this.$store.dispatch('characters/getAll')
      .then(() => {
        this.loading = false;
      });
  },
  computed: {
    ...mapState('characters', {
      characters: 'all',
    }),
  },
  methods: {
    goToDetail() {
      // TODO
    },
  },
};
</script>

<style lang="scss">

#characters {
  #characters-list{
    .character-col{
      padding: 6px;

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
        }
      }
    }
  }
}
</style>

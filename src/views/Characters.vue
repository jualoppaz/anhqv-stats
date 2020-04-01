<template>
  <div id="characters">
    <p>
      Aquí puedes ver el detalle de todos y cada uno de los personajes que aparecen en la serie.
    </p>
    <el-row
      id="characters-list"
      :gutter="gutter">
      <el-col
        class="character-col"
        :xs="24"
        :sm="6"
        :md="6"
        v-for="character in characters"
        :key="character.id">
        <CharacterCard :character="character">
        </CharacterCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import CharacterCard from '../components/CharacterCard.vue';

import utils from '../utils';

export default {
  name: 'Characters',
  components: {
    CharacterCard,
  },
  data() {
    return {
      gutter: utils.VIEWS.CHARACTERS.GUTTER.DEFAULT,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    this.loadingInstance = Loading.service({
      target: utils.LOADING.QUERY_SELECTOR,
      background: 'rgba(0, 0, 0, 0.8)',
    });

    this.$store.dispatch('characters/getAll')
      .finally(() => {
        this.loadingInstance.close();
      });
  },
  beforeDestroy() {
    this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    ...mapState('characters', {
      characters: 'all',
    }),
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.DEFAULT;
      }
    },
  },
};
</script>

<style lang="scss">

#characters {
  #characters-list{
    .character-col{
      padding: 6px;
    }
  }
}
</style>

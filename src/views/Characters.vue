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
        <CharacterCard :character="character">
        </CharacterCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import CharacterCard from '../components/CharacterCard.vue';

export default {
  name: 'Characters',
  components: {
    CharacterCard,
  },
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
    }
  }
}
</style>

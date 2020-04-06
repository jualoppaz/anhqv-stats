<template>
  <div id="season">
    <p>
      Capítulos de la temporada {{seasonNumber}}.
    </p>
    <el-row
      id="chapters-list"
      :gutter="gutter">
      <el-col
        class="chapter-col"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        v-for="chapter in chapters"
        :key="chapter.id">
        <ChapterCard :chapter="chapter">
        </ChapterCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import utils from '../utils';
import ChapterCard from '../components/ChapterCard.vue';

export default {
  name: 'Season',
  data() {
    return {
      gutter: 50,
      detailButtonText: 'Detalle',
    };
  },
  components: {
    ChapterCard,
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    this.loadingInstance = Loading.service({
      target: utils.LOADING.QUERY_SELECTOR,
      background: 'rgba(0, 0, 0, 0.8)',
    });

    this.$store.dispatch('chapters/getAll', { season: this.$route.params.season_number })
      .finally(() => {
        this.loadingInstance.close();
      });
  },
  computed: {
    ...mapState('chapters', {
      chapters: 'all',
    }),
    seasonNumber() {
      return this.$route.params.season_number;
    },
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
  beforeDestroy() {
    this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
#season {
  #chapters-list{
    .chapter-col{
      padding: 6px;

      .image-container{
        .image{
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .chapter-card-info{
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
  }
}
</style>

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

    this.chapters = [
      {
        id: 1,
        name: '\u00c9rase una mudanza',
        slug: '1x01',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x01.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 2,
        name: '\u00c9rase una reforma',
        slug: '1x02',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x02.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 3,
        name: '\u00c9rase el reciclaje',
        slug: '1x03',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x03.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 4,
        name: '\u00c9rase un rumor',
        slug: '1x04',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x04.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 5,
        name: '\u00c9rase un ni\u00f1o',
        slug: '1x05',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x05.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 6,
        name: '\u00c9rase un resbal\u00f3n',
        slug: '1x06',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x06.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 7,
        name: '\u00c9rase una rata',
        slug: '1x07',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x07.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 8,
        name: '\u00c9rase un indigente',
        slug: '1x08',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x08.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 9,
        name: '\u00c9rase una de miedo',
        slug: '1x09',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x09.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 10,
        name: '\u00c9rase un dilema',
        slug: '1x10',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x10.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 11,
        name: '\u00c9rase un traspaso',
        slug: '1x11',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x11.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 12,
        name: '\u00c9rase un sustituto',
        slug: '1x12',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x12.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 13,
        name: '\u00c9rase una fiesta',
        slug: '1x13',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x13.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 14,
        name: '\u00c9rase una aver\u00eda',
        slug: '1x14',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x14.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 15,
        name: '\u00c9rase un anillo',
        slug: '1x15',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x15.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 16,
        name: '\u00c9rase una Nochebuena',
        slug: '1x16',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x16.jpg',
        created_at: null,
        updated_at: null,
      },
      {
        id: 17,
        name: '\u00c9rase un fin de a\u00f1o',
        slug: '1x17',
        season: '1',
        image_url: 'http://localhost:8080/images/chapters/1x17.jpg',
        created_at: null,
        updated_at: null,
      },
    ];
  },
  computed: {
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

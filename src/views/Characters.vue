<template>
  <div id="characters">
    <p>
      Aquí puedes ver el detalle de todos y cada uno de los personajes que aparecen en la serie.
    </p>
    <el-row id="characters-list" :gutter="50">
      <el-col
        class="character-col"
        :xs="8"
        :sm="6"
        :md="6"
        v-for="character in characters"
        :key="character.id">
        <el-card
          class="character-card"
          shadow="hover"
          :body-style="{ padding: '0px' }">
          <img v-bind:src="character.image" class="image">
          <div
            class="character-card-info"
            style="padding: 14px;">
            <span><b>{{character.nickname}}</b></span>
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

export default {
  name: 'Characters',
  components: {},
  created() {},
  data() {
    return {
      characters: [
        {
          id: 1,
          name: 'Mauricio',
          surname: 'Hidalgo',
          nickname: 'Mauri',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/a/a6/Mauri.jpg/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20110104141719&path-prefix=es',
        }, {
          id: 2,
          name: 'María Luisa',
          surname: 'Benito Valbuena',
          nickname: 'Marisa',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/c/c4/Marisa_Benito.jpg/revision/latest/top-crop/width/300/height/300?cb=20111126095454&path-prefix=es',
        }, {
          id: 3,
          name: 'Mauricio 3',
          surname: 'Hidalgo',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/a/a6/Mauri.jpg/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20110104141719&path-prefix=es',
        }, {
          id: 4,
          name: 'Mauricio 4',
          surname: 'Hidalgo',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/a/a6/Mauri.jpg/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20110104141719&path-prefix=es',
        }, {
          id: 5,
          name: 'Mauricio',
          surname: 'Hidalgo',
          nickname: 'Mauri',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/a/a6/Mauri.jpg/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20110104141719&path-prefix=es',
        }, {
          id: 6,
          name: 'María Luisa',
          surname: 'Benito Valbuena',
          nickname: 'Marisa',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/c/c4/Marisa_Benito.jpg/revision/latest/top-crop/width/300/height/300?cb=20111126095454&path-prefix=es',
        }, {
          id: 7,
          name: 'Mauricio 3',
          surname: 'Hidalgo',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/a/a6/Mauri.jpg/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20110104141719&path-prefix=es',
        }, {
          id: 8,
          name: 'Mauricio 4',
          surname: 'Hidalgo',
          image: 'https://vignette.wikia.nocookie.net/seriesspain/images/a/a6/Mauri.jpg/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/250/window-height/250?cb=20110104141719&path-prefix=es',
        },
      ],
    };
  },
  methods: {
    goToDetail(character) {
      console.log(character.id);
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

        .image{
          width: 100%;
          display: block;
        }
        .character-card-info{
          text-align: left;
        }
      }
    }
  }
}
</style>

<template>
  <div id="chapter-scenes-list">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane
        v-for="scene in chapter.scenes"
        :key="scene.id"
        :label="getTabLabel(scene)"
      >
        <ChapterSceneEvents :order="scene.order" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChapterSceneEvents from './ChapterSceneEvents.vue';

export default {
  name: 'ChapterScenesList',
  components: {
    ChapterSceneEvents,
  },
  data() {
    return {
      tabPosition: 'left',
    };
  },
  computed: {
    ...mapState('chapters', {
      chapter: 'current',
    }),
  },
  methods: {
    getTabLabel(scene) {
      return String(scene.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tabs {
  ::v-deep .el-tabs__header {
    height: 450px;
    overflow: hidden;
  }

  ::v-deep .el-tabs__content {
    padding-right: 15px;
  }
}
</style>

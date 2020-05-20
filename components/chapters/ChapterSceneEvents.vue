<template>
  <div id="chapter-scene-events">
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="event in scene.events"
          :key="event.id"
          :timestamp="getNodeTimestamp(event)"
          placement="top"
          :icon="getNodeIcon(event)"
          :type="getNodeType(event)"
          :color="getNodeColor(event)"
          :size="getNodeSize()"
        >
          <el-card>
            <h4>
              <el-avatar
                v-for="character in event.characters"
                :key="character.id"
                :size="characterAvatarSize"
                :src="character.image_url"
                :alt="character.image_alt"
              />
            </h4>
            <cite>{{ event.text }}</cite>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import utils from '../../utils';

export default {
  name: 'ChapterSceneEvents',
  data() {
    return {
      characterAvatarSize: 'small',
      eventTypeDialog: utils.VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.SCENES.EVENTS.TYPE.DIALOG,
    };
  },
  computed: {
    ...mapState('scenes', {
      scene: 'current',
    }),
  },
  methods: {
    getNodeTimestamp(event) {
      return String(event.order);
    },
    getNodeIcon(event) {
      if (event.type === this.eventTypeDialog) return 'el-icon-more';
      return '';
    },
    getNodeType(event) {
      if (event.type === this.eventTypeDialog) return 'primary';
      return 'info';
    },
    getNodeColor(event) {
      if (event.type === this.eventTypeDialog) return '';
      return '';
    },
    getNodeSize() {
      return 'large';
    },
  },
};
</script>

<style lang="scss" scoped>

h4 {
  margin-top: 0;
}

</style>

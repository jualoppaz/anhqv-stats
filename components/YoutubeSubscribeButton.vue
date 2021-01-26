<template>
  <div
    :id="identifier"
  />
</template>

<script>
export default {
  name: 'YoutubeSubscribeButton',
  props: {
    identifier: {
      type: String,
      required: true,
    },
    channelid: {
      type: String,
      default: '',
    },
    channel: {
      type: String,
      default: '',
    },
    layout: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'full'].includes(value),
    },
    count: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'hidden'].includes(value),
    },
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        this.validateProps();
      },
    },
  },
  mounted() {
    if (process.browser) {
      const container = document.getElementById(this.identifier);
      const options = {
        channelid: this.channelid,
        channel: this.channel,
        layout: this.layout,
        count: this.count,
      };
      window.gapi.ytsubscribe.render(container, options);
    }
  },
  methods: {
    validateProps() {
      if (this.channel === '' && this.channelid === '') {
        // eslint-disable-next-line no-console
        console.error(`YoutubeSubscribeButton#${this.identifier}: You must indicate channel or channelid value.`);
      }
    },
  },
};
</script>

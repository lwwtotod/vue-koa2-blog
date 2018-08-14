<template>
  <div>
    <div class="demo-split">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
          <i-editor v-model="content"></i-editor>
        </div>
        <div slot="right" class="demo-split-pane">
          Right Pane
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      split1: 0.5,
      content: ''
    }
  },
}
</script>

<style scoped>
.demo-split {
  height: 500px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
<template>
  <div class="markdown-wrapper">
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
export default {
  naem: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    localCache: {
      type: Boolean,
      default: true
    },
    isNewContent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    // value:function(){
    //    this.editor.value(this.value)
    // }
  },
  methods: {
    addEvents() {
      this.editor.codemirror.on('change', () => {
        let value = this.editor.value()
        if (this.isNewContent) {
          if (this.localCache) localStorage.newMarkdownContent = value
        } else {
          if (this.localCache) localStorage.markdownContent = value
        }

        this.$emit('input', value)
        this.$emit('on-change', value)
      })
      this.editor.codemirror.on('focus', () => {
        this.$emit('on-focus', this.editor.value())
      })
      this.editor.codemirror.on('blur', () => {
        this.$emit('on-blur', this.editor.value())
      })
    }
  },
  mounted() {
    this.editor = new Simplemde(Object.assign(this.options, {
      element: this.$refs.editor
    }))
    /**
     * 事件列表为Codemirror编辑器的事件，更多事件类型，请参考：
     * https://codemirror.net/doc/manual.html#events
     */

    this.addEvents()
    if (this.isNewContent) {
      let content = localStorage.newMarkdownContent
      if (content) this.editor.value(content)
    } else {
      // let content = localStorage.markdownContent
      // if (content) this.editor.value(content)
      this.editor.value(this.value)
    }
    // console.log(this.isNewContent)
  },
}
</script>

<style lang="stylus">
.markdown-wrapper {
  .editor-toolbar.fullscreen {
    z-index: 9999;
  }

  .CodeMirror-fullscreen {
    z-index: 9999;
  }
}
</style>

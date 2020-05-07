<template lang="pug">
div(:class="[iconSize < 24 ? 'w-full sm:w-1/4 md:w-1/5 xl:w-1/6' : iconSize < 48 ? 'w-1/4' : 'w-1/3' ]")
  div(class="m-2")
    a(href="" :class="[isDark? 'bg-cool-gray-700 text-cool-gray-100' : 'bg-white' , iconSize < 32 ? 'h-40' : iconSize < 56 ?' h-64' : 'h-80' ]" class="relative flex-shrink-0 flex flex-col justify-center items-center w-full text-gray-800 hover:text-white  hover:bg-indigo-500 rounded shadow hover:shadow-lg hover:z-30 transition duration-150 ease-in-out"  @click.prevent="doCopy")
      div()
        component(:is="`${type}${icon.icon}`" ref="s" :strokeWidth="iconStrokeWidth" :class="`w-${iconSize} h-${iconSize}`")
        textarea(v-show="false") {{ markup }}
      div.p-5.absolute.x-inset-0.bottom-0
        p.font-semibold.text-center.text-xs.leading-tight {{ title }}
</template>

<script>
import { Parser, defaultOptions } from "@nmyvision/html2pug";
export default {
  props: {
    icon: Object,
    type: String,
    isDark: Boolean,
    iconSize: Number,
    iconStrokeWidth: Number,
    usePug: Boolean
  },
  data() {
    return { markup: null, title: this.icon.title };
  },
  methods: {
    async doCopy() {
      try {
        this.title = "COPIED";
        await this.$copyText(this.markup, this.$el);
        setTimeout(() => (this.title = this.icon.title), 1000);
      } catch (err) {
        console.error(err);
      }
    },
    setMarkup() {
      this.$nextTick(() => {
        const m = this.$el.querySelector("svg").outerHTML;
        this.markup = this.usePug ? this.p.parse(m) : m;
      });
    }
  },
  computed: {
    key() {
      return `${this.type}${this.isDark}${this.iconSize}${this.iconStrokeWidth}${this.usePug}`;
    }
  },
  watch: {
    key() {
      this.setMarkup();
    }
  },
  mounted() {
    const options = Object.assign({}, defaultOptions, { collapse: false });
    this.p = new Parser(options);
    this.setMarkup();
  }
};
</script>

<style></style>

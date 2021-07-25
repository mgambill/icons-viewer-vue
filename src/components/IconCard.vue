<template lang="pug">
div(
  :class="[iconSize < 24 ? 'w-full sm:w-1/4 md:w-1/5 xl:w-1/6' : iconSize < 48 ? 'w-1/4' : 'w-1/3']"
)
  .m-2
    a.cursor-pointer.relative.flex-shrink-0.flex.flex-col.justify-center.items-center.w-full.text-gray-800.rounded.shadow.transition.duration-150.ease-in-out(
      :class="[iconSize < 32 ? 'h-40' : iconSize < 56 ? ' h-64' : 'h-80']",
      class="hover:text-white hover:bg-indigo-500 hover:shadow-lg hover:z-30 bg-white dark:bg-gray-700 dark:text-gray-100",
      @click.prevent="doCopy"
    )
      div
        component(
          :is="`${prefix ? prefix : ''}${type ? type : ''}${icon.icon}`",
          ref="s",
          :strokeWidth="iconStrokeWidth",
          :class="`w-${iconSize} h-${iconSize}`"
        )
        textarea.text-gray-800.text-xs(v-show="false") {{ markup }}
      .p-5.absolute.x-inset-0.bottom-0
        p.font-semibold.text-center.text-xs.leading-tight {{ title }}
</template>

<script>
import useClipboard from "vue-clipboard3";
import { Parser, defaultOptions } from "@nmyvision/html2pug";
const { toClipboard } = useClipboard();
export default {
  props: {
    icon: Object,
    prefix: String,
    type: String,
    isDark: Boolean,
    iconSize: Number,
    iconStrokeWidth: Number,
    copyFormat: String,
    validate(value) {
      return ["pug", "html", "jsx"].includes(value.toLowerCase());
    },
  },
  data() {
    return {
      markup: null,
      markup2: null,
      title: this.icon.title,
    };
  },

  methods: {
    async doCopy(e) {
      console.log(e);
      try {
        if (e.ctrlKey) {
          await toClipboard(this.markup2);
          this.title = "COPIED *";
        } else {
          await toClipboard(this.markup);
          this.title = "COPIED";
        }
        setTimeout(() => (this.title = this.icon.title), 1000);
      } catch (err) {
        console.error(err);
      }
    },
    setMarkup() {
      const prep = (m, f) => {
        if (f === "jsx") {
          m = m
            .replace("stroke-linecap", "strokeLinecap")
            .replace("stroke-linejoin", "strokeLinejoin")
            .replace("stroke-width", "strokeWidth")
            .replace("fill-rule", "fillRule")
            .replace("fill-clip", "fillClip");
        } else if (f === "pug") m = this.p.parse(m);

        return m;
      };
      this.$nextTick(() => {
        const f = this.copyFormat;

        if (this.$el.querySelector("svg") === null) return;

        let m = this.$el.querySelector("svg").outerHTML;
        this.markup = prep(m, f);

        m = this.$el.querySelector("svg").innerHTML;
        this.markup2 = prep(m, f);
      });
    },
  },
  computed: {
    key() {
      return `${this.type}${this.isDark}${this.iconSize}${this.iconStrokeWidth}${this.copyFormat}`;
    },
  },
  watch: {
    key() {
      this.setMarkup();
    },
  },
  mounted() {
    const options = Object.assign({}, defaultOptions, { collapse: false });
    this.p = new Parser(options);
    this.setMarkup();
  },
};
</script>

<style></style>

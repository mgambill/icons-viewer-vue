<template lang="pug">
#app.min-h-screen.w-full.relative(
  class="dark:bg-gray-900 bg-gray-200"
)
  .py-8.bg-gray-800.mb-4
    .container.relative.mx-auto.px-3(class="xl:px-0")
      .float-right.mt-4.flex.items-center
        button.text-white.p-2(
          @click="toggleTheme",
          title="toggle dark / light mode",
          type="button"
        )
          .w-5.w-5
            template(v-if="isDark")
              SolidSunIcon
            template(v-else)
              SolidMoonIcon

        .relative.inline-block.text-right(@keydown.escape="open = false")
          div
            button.flex.items-center.text-gray-400.relative.z-30.p-2(
              @click="open = !open",
              class="hover:text-indigo-400 focus:outline-none focus:text-indigo-400",
              title="Settings"
            )
              SolidCogIcon.h-5.w-5

          .fixed.inset-0.z-10.w-screen.h-screen(
            @click="open = false",
            v-if="open"
          )
          .origin-top-right.absolute.z-20.right-0.mt-2.w-64.rounded-md.shadow-lg(
            v-show="open",
            x-transition:enter="transition ease-out duration-100",
            x-transition:enter-start="transform opacity-0 scale-95",
            x-transition:enter-end="transform opacity-100 scale-100",
            x-transition:leave="transition ease-in duration-75",
            x-transition:leave-start="transform opacity-100 scale-100",
            x-transition:leave-end="transform opacity-0 scale-95"
          )
            .rounded-md.bg-white.shadow-xs(class="dark:bg-gray-900 dark:text-gray-50")
              .py-1.text-left
                .block.pr-4.pl-10.py-2
                  label.text-sm.leading-5
                    | Copy text as
                    select.border.border.mx-1.px-2.py-1.border-gray-300(v-model="copyFormat" class="dark:bg-gray-700 dark:text-gray-100 dark:border-transparent")
                      option(value="html") HTML
                      option(value="pug") Pug
                      option(value="jsx") JSX

                .border-t.border-gray-100(class="dark:border-gray-700")
                .flex.items-center.px-4.py-2.block(
                  class="hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                )
                  input#useLocalStorage.sr-only(
                    type="checkbox",
                    v-model="useLocalStorage"
                  )
                  label(
                    :class="useLocalStorage ? 'dark:text-gray-500 text-gray-800' : 'text-gray-300'",
                    for="useLocalStorage"
                  )
                    SolidCheckIcon.w-4.h-4
                  label.ml-2.text-sm.leading-5(
                    for="useLocalStorage"
                  )
                    | Save settings in locally
                a.block.pr-4.pl-10.py-2.text-sm.leading-5(
                  href="#",
                  :class="hasState ? 'text-gray-700' : 'text-gray-400'",
                  class="hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900",
                  @click="onReset"
                ) Reset settings
                .border-t.border-gray-100(class="dark:border-gray-700")
                a.flex.items-center.block.pr-4.pl-10.py-2.text-sm.leading-5(
                  href="https://github.com/mgambill/heroicons-viewer-vue/issues",
                  target="_blank",
                  rel="noreferrer",
                  class="hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                )
                  | Issues
                  OutlineExternalLinkIcon.w-4.h-4.ml-2

      div.space-y-3
        h1.flex.font-semibold.tracking-tight.text-5xl.text-gray-200.relative
          span {{ currentSet.title }}
          .absolute.-ml-12
            button.btn.px-4.py-2.text-gray-500(
              type="button",
              @click="toggleSet",
              class="hover:text-indigo-400 focus:outline-none focus:text-indigo-400",
              title="Toggle between icon sets."
            )
              SolidSwitchVerticalIcon.w-6.h-6

        h2#info.mb-2.font-light(
          class="-tracking-0.5 text-gray-100/75",
          v-html="currentSet.info"
        )

  .container.mx-auto(class="md:px-3 xl:px-0")
    .flex.w-full.space-x-4
      .flex-1
        label.sr-only(for="filter") Search candidates
        .flex.rounded-md.shadow-sm
          .relative.flex.items-stretch.flex-grow(class="focus-within:z-10")
            .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
              OutlineSearchIcon.h-5.w-5.text-gray-400(aria-hidden="true")
            input#filter.block.w-full.pl-10.border-gray-300(
              type="text",
              name="filter",
              :class="[currentSet.variants ? 'rounded-none rounded-l-md' : 'rounded-md']",
              class="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:border-transparent",
              placeholder="Search Icons..."
            )
          template(v-if="currentSet.variants")
            button.-ml-px.w-28.relative.inline-flex.items-center.justify-between.space-x-2.px-4.py-2.border.border-gray-300.text-sm.font-medium.rounded-r-md.text-gray-700.bg-gray-50(
              class="hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",
              @click="toggleIconType"
            )
              span {{ iconType }}
              OutlineSwitchVerticalIcon.h-5.w-5.text-gray-400(
                aria-hidden="true"
              )

      div
        label.sr-only(for="icon_size") Icon Size
        .relative.rounded-md.shadow-sm
          .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
            span.text-gray-500(class="sm:text-sm")
              | Size:

          select#icon_size.block.w-full.pl-14.pr-10.py-2.text-base.border-gray-300.rounded-md.bg-white(
            name="icon_size",
            class="focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100",
            v-model.number="iconSize"
          )
            template(v-for="(key, $index) in spacing", :key="key")
              option {{ key }}

      div(:class="{ 'opacity-50': disableStroke }", :disabled="disableStroke")
        label.sr-only(for="icon_size") Stroke Width
        .relative.rounded-md.shadow-sm
          .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
            span.text-gray-500(class="sm:text-sm")
              | Stroke:

          select#icon_size.block.w-full.pl-16.pr-10.py-2.text-base.border-gray-300.rounded-md.bg-white(
            name="icon_size",
            class="focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:border-transparent",
            v-model.number="iconStrokeWidth"
          )
            template(v-for="(key, $index) in strokeWidths", :key="key")
              option {{ key }}

    template(v-if="filteredIcons")
      .flex.flex-wrap.-mx-2.mt-2
        template(
          v-for="icon in filteredIcons",
          :key="`${icon.title}--${iconType}`"
        )
          IconCard(
            :icon="icon",
            :prefix="currentSet.prefix",
            :type="iconType",
            :is-dark="isDark",
            :icon-size="iconSize",
            :icon-stroke-width="iconStrokeWidth",
            :copyFormat="copyFormat"
          )

    template(v-else)
      .flex.h-48.items-center.justify-center.mt-4.w-full
        h1.text-2xl Loading

    .text-sm.py-8.mt-3.flex.justify-between.text-gray-600(class="dark:text-gray-200")
      .flex
        //- Search icon
        svg.w-4.w-4.mr-3(viewBox="0 0 496 512", fill="currentColor")
          path(
            fill="currentColor",
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          )

        a.text-indigo-600(
          href="https://github.com/mgambill/icons-viewer-vue/",
          target="_blank",
          rel="noreferrer",
          class="hover:underline dark:text-indigo-300"
        ) icons-viewer-vue
</template>

<script>
import kebabCase from "lodash.kebabcase";
import theme from "tailwindcss/defaultTheme";
import IconCard from "../components/IconCard.vue";
import marked from "marked";
import { default as $state, mapCache, clearState } from "../state";
import HeroiconNames from "../icons/heroicons/list.json";
import CodiconNames from "../icons/codicons/list.json";
import FeatherNames from "../icons/feather/list.json";
import TeenyiconNames from "../icons/teenyicons/list.json";
import config_source from "../config.json";

const config = config_source.map((c) => ({ ...c, info: marked(c.info) }));

export default {
  name: "Home",
  components: {
    IconCard,
  },
  data() {
    const isDark = localStorage.theme === "dark";

    return {
      isDark,
      icons: null,
      open: false,
      filterText: "",
      strokeWidths: [0.5, 1, 1.5, 2],
      spacing: Object.keys(theme.spacing).filter((key) => +key > 3),
      sets: [HeroiconNames, CodiconNames, FeatherNames, TeenyiconNames],
    };
  },
  computed: {
    ...mapCache(
      "iconType",
      "iconSize",
      "iconStrokeWidth",
      "copyFormat",
      "useLocalStorage",
      "iconVariant",
      "iconSetIndex"
    ),
    filteredIcons() {
      const filter = this.filterText.toLowerCase();
      if (filter.length === 0) return this.icons;
      return this.icons.filter(
        (x) => x.title.toLowerCase().indexOf(filter) > -1
      );
    },
    disableStroke() {
      return this.iconType !== "Outline" && this.currentSet.isStroke === null;
    },
    hasState() {
      return $state.hasState;
    },
    currentSet() {
      return config[this.iconSetIndex];
    },
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      console.log("toggleTheme:", this.isDark);

      // Whenever the user explicitly chooses light mode
      if (this.isDark) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    },
    onReset() {
      clearState();
      this.open = false;
    },
    toggleIconType() {
      this.iconType = this.iconType === "Solid" ? "Outline" : "Solid";
      this.iconVariant = this.iconType;
    },
    toggleSet() {
      if (this.sets.length === this.iconSetIndex + 1) this.iconSetIndex = 0;
      else this.iconSetIndex++;
    },
  },
  watch: {
    iconSetIndex: {
      immediate: true,
      handler() {
        const arr = this.sets[this.iconSetIndex];
        this.icons = arr.map((x) => ({
          icon: x,
          title: kebabCase(x.replace("Icon", "")),
        }));
        if (this.currentSet.variants === null) {
          this.iconType = null;
        } else {
          this.iconType = this.iconVariant;
        }
        // this.$nextTick(() => {

        // })
      },
    },
  },
  mounted() {
    this.config = config;
  },
};
</script>

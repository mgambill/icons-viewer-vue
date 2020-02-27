<template lang="pug">
div(class="w-full sm:w-1/4 md:w-1/5 xl:w-1/6")
  div(class="m-2")
    a(href="" class="relative flex-shrink-0 flex flex-col justify-center items-center w-full h-40 text-gray-800 hover:text-white bg-white hover:bg-indigo-500 rounded shadow hover:shadow-lg hover:z-30 transition duration-150 ease-in-out"  @click.prevent="doCopy")
      .w-5.h-5
        component(:is="`${type}${icon.icon}`" ref="s")
        textarea(v-show="false") {{ markup }}
      div.p-3.absolute.x-inset-0.bottom-0
        p.font-semibold.text-center.text-xs.leading-tight {{ title }}  
</template>

<script>
export default {
  props: {
    icon: Object,
    type: String
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.markup = this.$el.querySelector("svg").outerHTML;
    });
  }
};
</script>

<style></style>

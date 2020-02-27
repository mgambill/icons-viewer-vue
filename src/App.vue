<template lang="pug">
  #app.min-h-screen.bg-cool-gray-200.w-full
    //-#nav
      router-link(to="/") Home
      router-link(to="/about") About
  
    router-view
  
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <Fmap />
</template>

<script>
import Fmap from "./components/Fmap";
//import Fmap from "./components/Fmap2";

export default {
  name: "app",
  components: {
    Fmap,
  },
};
</script>

<style>
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#fmap {
  width: 100%;
  height: 100%;
}
</style>

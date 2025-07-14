<template>
  <div class="test-home">test home page</div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.test-home {
  padding: 20px;
  border: 2px solid blue;
  margin: 10px;
}

nav {
  margin: 20px 0;
}

nav a {
  margin-right: 10px;
  color: blue;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>

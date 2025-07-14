<script setup>

</script>

<template>
  <div class="home-page-wrapper">
    <h1>Vue3 Boilerplate</h1>
    <p>Welcome to the Vue3 boilerplate project</p>
  </div>
</template>

<style scoped lang="scss">
.home-page-wrapper {
  padding: 2rem;
  text-align: center;

  h1 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    margin-bottom: 1rem;
    color: #666;
  }

  .navigation {
    margin: 2rem 0;

    .demo-link {
      display: inline-block;
      padding: 1rem 2rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.3s ease;

      &:hover {
        background: #0056b3;
      }
    }
  }
}
</style>
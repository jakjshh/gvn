<template>
  <div class="module-content">
    <router-link to="/" class="home-icon" title="回到主页">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg>
    </router-link>
    <h2>Cosplay</h2>
    <p>这里是 Cosplay 的内容。</p>
  </div>
</template>
<script>
export default {
  name: 'Cosplay'
}
</script>
<style scoped>
.module-content { padding: 32px; }
  .home-icon {
    display: inline-block;
    margin-bottom: 16px;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .home-icon:hover {
    transform: scale(1.1);
  }
</style>

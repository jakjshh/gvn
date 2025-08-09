<template>
  <div class="home-container">
    <div class="modules-grid">
      <router-link class="module-card" to="/original">原作介绍</router-link>
      <router-link class="module-card" to="/images">同人图片</router-link>
      <router-link class="module-card" to="/articles">同人文章</router-link>
      <router-link class="module-card" to="/peripheral">周边、谷美</router-link>
      <router-link class="module-card" to="/cosplay">Cosplay</router-link>
      <router-link class="module-card" to="/ideas">代餐、脑洞</router-link>
      <router-link class="module-card" to="/about">关于</router-link>
    </div>
  </div>
</template>

<script>
// 引入 JSON 数据
export default {
  name: 'Home'
}
</script>


    <style scoped>
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f7f7f7;
    }
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 32px;
      width: 80vw;
      max-width: 900px;
    }
    .module-card {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      font-size: 1.2rem;
      color: #333;
      text-decoration: none;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .module-card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.16);
      transform: translateY(-4px) scale(1.04);
      color: #1976d2;
    }
    </style>
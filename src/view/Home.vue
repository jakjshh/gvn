<template>
  <div class="home-container">
    <div class="animated-bg">
      <div class="note" v-for="n in 12" :key="n" :style="{left: (n*8+10)+'vw', animationDelay: (n*0.3)+'s'}">🎵</div>
      <div class="guitar"></div>
    </div>
    <router-link to="/moe" class="corner-icon">
      <img src="/home/inu_a.jpg" alt="Icon" class="corner-image">
      <span class="corner-text">(,,´•ω•)ノ</span>
    </router-link>
    <div class="home-content">
      <h1 class="home-title">ギヴン</h1>
      <p class="home-desc">应该是一个仅群内的总结合集</p>
      <div class="modules-grid">
        <router-link class="module-card" to="/original">原作相关</router-link>
        <router-link class="module-card" to="/images">同人图/文</router-link>
        <!-- <router-link class="module-card" to="/articles">同人文</router-link> -->
        <router-link class="module-card" to="/peripheral">周边、谷美</router-link>
        <router-link class="module-card" to="/cosplay">Cosplay</router-link>
        <router-link class="module-card" to="/Ideas">口嗨</router-link>
        <router-link class="module-card" to="/about">关于</router-link>
      </div>
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
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      background: linear-gradient(120deg, #e0f7fa 0%, #fffde4 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .animated-bg {
      position: absolute;
      top: 0; left: -200px; width: 100vw; height: 100vh;
      z-index: 1;
      pointer-events: none;
    }
    .note {
      position: absolute;
      top: 0;
      font-size: 2.2rem;
      opacity: 0.18;
      animation: floatNote 6s linear infinite;
    }
    @keyframes floatNote {
      0% { top: 0; opacity: 0.18; }
      50% { opacity: 0.32; }
      100% { top: 80vh; opacity: 0.1; }
    }
    .guitar {
      position: absolute;
      bottom: 0; right: 8vw;
      width: 120px; height: 120px;
      background: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3b8.svg') no-repeat center/contain;
      opacity: 0.12;
    }
    .home-content {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
       /* margin-top: -1vh; */
    }
    .home-title {
      font-size: 2.8rem;
      color: #0984e3;
      font-weight: bold;
      margin-bottom: 0.5rem;
      letter-spacing: 2px;
      text-shadow: 0 2px 12px #a29bfe44;
    }
    .home-desc {
      font-size: 1.2rem;
      color: #636e72;
      margin-bottom: 2rem;
      text-shadow: 0 1px 6px #81ecec33;
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
      background: linear-gradient(120deg, #fffde4 60%, #e0f7fa 100%);
      border-radius: 20px;
      box-shadow: 0 2px 12px #a29bfe22;
      font-size: 1.3rem;
      color: #0984e3;
      text-decoration: none;
      font-weight: 500;
      letter-spacing: 1px;
      transition: box-shadow 0.2s, transform 0.2s, background 0.2s, color 0.2s;
      position: relative;
      overflow: hidden;
    }
    .module-card:hover {
      box-shadow: 0 8px 24px #a29bfe44;
      transform: translateY(-6px) scale(1.05);
      color: #fd79a8;
      background: linear-gradient(120deg, #81ecec 0%, #a29bfe 100%);
    }
    /* 新增的左上角图标样式 */
.corner-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s;
}
.corner-icon:hover {
  transform: scale(1.1);
}
.corner-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #a29bfe;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.corner-text {
  margin-top: 5px;
  font-size: 14px;
  color: #636e72;
  font-weight: 500;
}
    </style>
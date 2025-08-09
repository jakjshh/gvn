<template>
  <div class="module-content">
    <router-link to="/" class="home-icon" title="回到主页">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg>
    </router-link>
    <h2>关于</h2>
    <p>初衷是想成为一个史官(bu),因为后入群的uu看不到之前的消息，</p>
     <p> 所以想把群消息总结记录下来。算是一个手动群相册。</p>  
      <strong>初步设定功能</strong>  
      <p>1.浏览图片、引入外链，把群内产出总结到一起去</p>  
       <p>2.作者功能 当前图片的创作者可以决定图片隐藏与否(进度0)</p> 
       <p>3.留言板 贴图+留言(进度0)</p> 
       <p>4.筛选功能 加入每个角色的筛选(进度0)</p> 
       <p>模糊筛选(只要选了a，包含a的都有)；精确筛选（选a只会出现a单人，选abcd只会出现四人同时出现）</p>
  <strong>总之就是我不会做，看个乐就好</strong> 
  </div>
</template>
<script>
export default {
  name: 'About'
}
</script>
<style scoped>
  .module-content {
    padding: 32px;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);
  }
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

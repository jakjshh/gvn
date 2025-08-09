<template>
  <div class="images-page">
    <router-link to="/" class="home-icon" title="回到主页">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg>
    </router-link>
    <div class="images-masonry">
      <div v-for="img in images" :key="img.src" class="masonry-item" :style="img.style">
        <img :src="img.src" class="masonry-img" @click="openPreview(img)" :alt="img.title || '同人图'" />
      </div>
    </div>
    <div v-if="showPreview" class="preview-modal" @click.self="closePreview">
      <div class="preview-content">
        <img :src="previewImg.src" class="preview-img" :alt="previewImg.title || '同人图'" />
        <div class="preview-info">
          <h2 v-if="previewImg.title">{{ previewImg.title }}</h2>
          <p v-if="previewImg.author">by {{ previewImg.author }}</p>
          <p v-if="previewImg.desc">{{ previewImg.desc }}</p>
        </div>
        <button class="close-btn" @click="closePreview">×</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Images',
  data() {
    // 自动生成所有图片列表
    // 只展示真实存在的图片
    const imgFiles = [
      'uenoyama_AN_b.jpg',
      'yuki_AN_a.jpg',
      'uenoyama_CS_a.jpg',
      'uenoyama_AN_a.jpg',
      'shizuhiiragi_YX_b.jpg',
      'shizuhiiragi_YX_a.jpg',
      'shizuhiiragi_LS_a.jpg',
      'natsufuyu_ZY_a.jpg',
      'natsufuyu_N_a.jpg',
      'natsufuyu_LGQ_a.jpg',
      'mafuyu_YZ_b.jpg',
      'mafuyu_YZ_a.jpg',
      'mafuyu_CS_b.jpg',
      'mafuyu_CS_a.jpg',
      'mafuyu_AN_a.jpg',
      'hiiragi_YX_b.jpg',
      'hiiragi_YX_a.png',
      'haruki_N_a.jpg',
      'given_N_b.jpg',
      'given_N_a.png',
      'akiharu_CS_a.jpg',
      'akiharu_CS_b.jpg',
      'akiharu_CS_c.jpg',  
      'all_N_a.jpg',  
      // ...如需补充请将 public/images 下的文件名全部列出
    ];
    const images = imgFiles.map((file, i) => ({
      src: `/images/${file}`,
      title: '',
      author: '',
      desc: '',
      style: {},
    }));
    return {
      images,
      showPreview: false,
      previewImg: {},
    };
  },
  methods: {
    openPreview(img) {
      this.previewImg = img;
      this.showPreview = true;
    },
    closePreview() {
      this.showPreview = false;
      this.previewImg = {};
    },
  },
}
</script>
<style scoped>
.images-page {
  font-family: 'Segoe UI', 'PingFang SC', 'Arial', sans-serif;
  background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);
  min-height: 100vh;
}
.home-icon {
  display: inline-block;
  margin: 2rem 0 0 2rem;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 10;
}
.home-icon:hover {
  transform: scale(1.1);
}
.images-masonry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 1.2rem;
  padding: 1.5rem;
  align-items: start;
}
.masonry-item {
  overflow: hidden;
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(160, 155, 254, 0.12);
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
  display: block;
}
.masonry-item:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 24px rgba(160, 155, 254, 0.18);
}
.masonry-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  transition: filter 0.2s;
  border-radius: 0.8rem;
  display: block;
}
.masonry-img:hover {
  filter: brightness(1.08) saturate(1.2);
}
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(30, 30, 60, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.preview-content {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px rgba(160, 155, 254, 0.22);
  padding: 2rem;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.preview-img {
  max-width: 50vw;
  max-height: 60vh;
  border-radius: 1rem;
  margin-right: 1rem;
  box-shadow: 0 2px 12px rgba(160, 155, 254, 0.18);
}
.preview-info {
  min-width: 200px;
  max-width: 350px;
  text-align: left;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #fd79a8;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(160, 155, 254, 0.18);
  transition: background 0.2s;
}
.close-btn:hover {
  background: #e17055;
}
</style>

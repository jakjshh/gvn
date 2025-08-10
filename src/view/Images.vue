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
        <div class="preview-img-wrap">
          <img :src="previewImg.src" class="preview-img" :alt="previewImg.title || '同人图'" />
          <div class="preview-author">by:{{ previewImg.author }}</div>
        </div>
        <div class="preview-info">
          <h2 v-if="previewImg.title">{{ previewImg.title }}</h2>
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
      'uenoyama_阿柠_b.jpg',
      'yuki_阿柠_a.jpg',
      'uenoyama_陈时_a.jpg',
      'uenoyama_阿柠_a.jpg',
      'shizuhiiragi_於邪_b.jpg',
      'shizuhiiragi_於邪_a.jpg',
      'shizuhiiragi_林深_a.jpg',
      'natsufuyu_朝云_a.jpg',
      'natsufuyu_南_a.jpg',
      'natsufuyu_两个秋_a.jpg',
      'mafuyu_叶子_b.jpg',
      'mafuyu_叶子_a.jpg',
      'mafuyu_陈时_b.jpg',
      'mafuyu_陈时_a.jpg',
      'mafuyu_阿柠_a.jpg',
      'hiiragi_於邪_b.jpg',
      'hiiragi_於邪_a.png',
      'haruki_南_a.jpg',
      'given_南_b.jpg',
      'given_南_a.png',
      'akiharu_陈时_a.jpg',
      'akiharu_陈时_b.jpg',
      'akiharu_陈时_c.jpg',  
      'all_南_a.jpg',  
      // ...如需补充请将 public/images 下的文件名全部列出
    ];
const images = imgFiles.map((file, i) => {
  const match = file.match(/_([^_]+)_/);
  const author = match ? match[1] : '';
  return {
    src: `/images/${file}`,
    title: '',
    author,
    desc: '',
    style: {},
    filename: file,
  };
});
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
.preview-img-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.images-page {
  font-family: 'Segoe UI', 'PingFang SC', 'Arial', sans-serif;
  background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);
  min-height: 100vh;
}
/* 主页图标 */
.home-icon {
  display: inline-block;
  margin: 2rem 0 0 2rem;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 10;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.home-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
}

.images-masonry {
  column-count: 4;
  column-gap: 1.2rem;
  margin-top: 1rem;
    padding: 5rem 1.5rem 1.5rem;

}
.masonry-item {
    break-inside: avoid;
  margin-bottom: 1.2rem;
  width: 100%;
  display: block;
   overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(160, 155, 254, 0.12);
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;

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

.preview-author {
  font-size: 0.95rem;
  color: #636e72;
  margin-top: 0.5rem;
  text-align: center;
  opacity: 0.8;
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
  max-width: 60vw !important;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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

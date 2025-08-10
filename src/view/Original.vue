<template>
  <div class="artworks-page">
    <router-link to="/" class="home-icon" title="回到主页">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg>
    </router-link>
    <header class="banner">
      <div class="banner-content">
        <!-- <h1>青春与音乐的画作展</h1>
        <p>在旋律与色彩中，感受青春的律动</p> -->
        <div class="music-notes">
          <span>🎵</span><span>🎸</span><span>🥁</span><span>🎻</span><span>🎤</span>
        </div>
      </div>
    </header>
    <main class="artworks-grid">
      <div v-for="art in artworks" :key="art.id" class="art-card">
        <img :src="art.img" :alt="art.title" class="art-img" @click="openPreview(art)" style="cursor:pointer" />
        <div class="art-info">
          <h2 class="art-title">
            <template v-if="art.link">
              <a :href="art.link" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">{{ art.title }}</a>
            </template>
            <template v-else>
              {{ art.title }}
            </template>
          </h2>
          <!-- <p class="art-author">by {{ art.author }}</p> -->
          <p class="art-desc">{{ art.desc }}</p>
          <template v-if="art.extraLinks">
            <div class="extra-links">
              <a v-for="(ex, idx) in art.extraLinks" :key="idx" :href="ex.url" target="_blank" rel="noopener" class="extra-link">{{ ex.title }}</a>
            </div>
          </template>
        </div>
        <div class="art-music-icon">🎶</div>
      </div>
    </main>
    <div v-if="showPreview" class="preview-modal" @click.self="closePreview">
      <div class="preview-content">
        <img :src="previewArt.img" :alt="previewArt.title" class="preview-img" />
        <div class="preview-info">
          <h2>{{ previewArt.title }}</h2>
          <!-- <p>by {{ previewArt.author }}</p> -->
          <p>{{ previewArt.desc }}</p>
        </div>
        <button class="close-btn" @click="closePreview">×</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Articles',
  data() {
    return {
      artworks: [
                {
          id: 4,
          title: '全员',
          author: 'All',
          img: require('@/../public/original/all_a.jpg'),
          desc: '刺伤yyds。',
        },
        {
          id: 1,
          title: '常看常美的一张图',
          author: 'Akiharu',
          img: require('@/../public/original/akiharu_a.jpg'),
          desc: '男人30一枝花。',
        },
        {
          id: 2,
          title: '居然是左手惯用手吗',
          author: 'Akihiko',
          img: require('@/../public/original/akihiko_a.jpg'),
          desc: 'from CTNTHIA',
        },
        {
          id: 3,
          title: '童贞攻名场面。',
          author: 'Uenoyama',
          img: require('@/../public/original/uenoyama_a.jpg'),
          desc: 'from 屑黄堡',
        },

        {
          id: 5,
          title: '萌萌春樹',
          author: 'Haruki',
          img: require('@/../public/original/haruki_a.jpg'),
          desc: 'from 陈小鸡',
        },
        {
          id: 6,
          // title: '圆盘抓',
          // author: 'Given',
          img: require('@/../public/original/given_a.jpg'),
          desc: '我能循环一万遍。',
          extraLinks: [
             {
              title: '【ギヴン】圆盘抓Vol.1',
              url: 'https://www.bilibili.com/video/BV15g4y1q7eJ?vd_source=7eb10f0b02dfe6bd52e9ec40b46bbb72 ',
            },
            {
              title: '【DRAMA】GIVEN\'S TALK! Vol.2【自翻】',
              url: 'https://www.bilibili.com/video/BV1Rv411y7gA?vd_source=7eb10f0b02dfe6bd52e9ec40b46bbb72',
            },
          ],
        },
        {
          id: 7,
          title: 'cafe',
          author: 'Haruki',
          img: require('@/../public/original/all_b.jpg'),
          desc: 'from 团砸',
        },
      ],
      showPreview: false,
      previewArt: {},
    };
  },
  methods: {
    openPreview(art) {
      this.previewArt = art;
      this.showPreview = true;
    },
    closePreview() {
      this.showPreview = false;
      this.previewArt = {};
    },
  },
};
</script>
<style scoped>
/* 外部链接样式 */
.extra-links {
  margin-top: 0.5rem;
}
.extra-link {
  display: block;
  color: #0984e3;
  text-decoration: underline;
  font-size: 1.05rem;
  margin-bottom: 0.2rem;
  word-break: break-all;
}
.extra-link:hover {
  color: #fd79a8;
}
.artworks-page {
  font-family: 'Segoe UI', 'PingFang SC', 'Arial', sans-serif;
  background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);
  min-height: 100vh;
}
/* ...existing code... */
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
  flex-direction: column;
  align-items: center;
}
.preview-img {
  max-width: 60vw;
  max-height: 60vh;
  border-radius: 1rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 12px rgba(160, 155, 254, 0.18);
}
.preview-info {
  text-align: center;
  margin-bottom: 1rem;
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
.artworks-page {
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

.banner {
  background: linear-gradient(90deg, #81ecec 0%, #a29bfe 100%);
  padding: 2rem 0 1rem 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(160, 155, 254, 0.1);
}
.banner-content h1 {
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}
.banner-content p {
  font-size: 1.2rem;
  color: #636e72;
  margin-bottom: 1rem;
}
.music-notes span {
  font-size: 1.5rem;
  margin: 0 0.3rem;
  color: #00b894;
}
.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
.art-card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(160, 155, 254, 0.12);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.art-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 24px rgba(160, 155, 254, 0.18);
}
.art-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid #dfe6e9;
}
.art-info {
  padding: 1rem;
  text-align: center;
}
.art-title {
  font-size: 1.3rem;
  color: #0984e3;
  margin-bottom: 0.3rem;
}
.art-author {
  font-size: 1rem;
  color: #636e72;
  margin-bottom: 0.5rem;
}
.art-desc {
  font-size: 0.95rem;
  color: #636e72;
}
.art-music-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: #fd79a8;
  opacity: 0.7;
}
</style>

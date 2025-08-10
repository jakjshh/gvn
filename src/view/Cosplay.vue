<template>
  <div class="images-page">
    <!-- 返回主页按钮 -->
    <router-link to="/" class="home-icon" title="回到主页">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    </router-link>

    <!-- 行式瀑布流容器 -->
    <div class="images-waterfall">
      <div 
        v-for="(img, index) in images" 
        :key="index" 
        class="waterfall-item" 
        :class="{ 'wide-item': isWideImage(img) }"
        :style="getItemStyle(img)"
      >
        <a 
          :href="img.link || 'javascript:void(0)'" 
          target="_blank" 
          @click.prevent="handleImageClick(img)"
        >
          <img 
            :src="img.src" 
            class="waterfall-img" 
            :alt="img.title || 'cosplay图片'" 
            loading="lazy"
          />
          <!-- 悬停时显示的信息层 -->
          <div class="item-overlay">
            <h3 class="item-title">{{ img.title }}</h3>
            <div class="item-meta">
              <span class="item-author">by {{ img.author }}</span>
              <a 
                v-if="img.link" 
                :href="img.link" 
                class="item-link" 
                target="_blank"
                @click.stop
              >
                查看详情 →
              </a>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- 图片预览模态框 -->
    <div v-if="showPreview" class="preview-modal" @click.self="closePreview">
      <div class="preview-content">
        <div class="preview-img-wrap">
          <img :src="previewImg.src" class="preview-img" :alt="previewImg.title" />
          <div class="preview-author">by: {{ previewImg.author }}</div>
        </div>
        <div class="preview-info">
          <h2 v-if="previewImg.title">{{ previewImg.title }}</h2>
          <p v-if="previewImg.desc">{{ previewImg.desc }}</p>
          <a 
            v-if="previewImg.link" 
            :href="previewImg.link" 
            class="preview-link" 
            target="_blank"
          >
            查看完整作品
          </a>
        </div>
        <button class="close-btn" @click="closePreview">×</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CosplayGallery',
  data() {
    return {
      images: [
                {
          src: '/cosplay/mafuyu_宵程_a.jpg',
          title: '因为我不再是孤身一人',
          author: '宵程',
          link: 'http://xhslink.com/m/1YRwoDXlrYG',
          width: 375,
          height: 500,
        },
        {
          src: '/cosplay/uenoyama_宵程_a.jpg',
          title: '人夫感这一块🤓☝️ ',
          author: '宵程',
          // desc: '0',
          link: ' http://xhslink.com/m/5Q0NMz0eJic',
          width: 500,
          height: 375,
          tags: ['1', '2']
        },
             {
          src: '/cosplay/natsufuyu_宵程_a.jpg',
          title: '这是夏的最长昼',
          author: '宵程',
          link: 'http://xhslink.com/m/84bRraFQ2I0',
          width: 375,
          height: 500,
        },
        {
          src: '/cosplay/yukifuyu_啊司_a.jpg',
          title: '【cosplay微电影】有你的海边 ',
          author: '啊司',
          // desc: '0',
          link: 'https://www.bilibili.com/video/BV16oCVYWETd/?share_source=copy_web&vd_source=98e519b0754b3636b1b2507893696c90',
          width: 500,
          height: 375,
          tags: ['1', '2']
        },
        {
          src: '/cosplay/mafuyu_团砸_a.jpg',
          title: '​风隙影里浴衣轻擦，蝉鸣漏下凝滞的寂静。',
          author: '团砸',
          link: 'http://xhslink.com/m/1CIxX2LJFQe',
          width: 375,
          height: 500,
        },
        {
          src: '/cosplay/natsufuyu_朝云_a.jpg',
          title: '“一起练琴吧”',
          author: '朝云',
          link: ' http://xhslink.com/m/99uBXGVnxwj',
          width: 375,
          height: 500,
        },
                {
          src: '/cosplay/hiiragi_里里_a.jpg',
          title: '想和全世界分享的幸福',
          author: '里里',
          link: '  http://xhslink.com/m/2ONFEevll9',
          width: 375,
          height: 500,
        },
                {
          src: '/cosplay/natsufuyu_林深_a.jpg',
          title: '音乐可以传达到',
          author: '林深',
          link: '  http://xhslink.com/m/5u09K1SPqmi',
          width: 375,
          height: 500,
        },
        {
          src: '/cosplay/yukifuyu_风山_a.jpg',
          title: '【given由纪真冬/cos翻跳】🎸だから僕は音楽を辞めた🎸 ',
          author: '风山',
          link: 'https://b23.tv/UxeqRNb',
          width: 500,
          height: 375,
        },
                {
          src: '/cosplay/yukifuyu_风山_b.jpg',
          title: '就让我将祈愿都寄托在你随口哼唱的旋律中吧',
          author: '风山',
          link: 'http://xhslink.com/m/3yKAJdkithK',
          width: 500,
          height: 375,
        },
            {
          src: '/cosplay/uenoyamafuyuki_林深_a.jpg',
          title: '他就活在这首歌里',
          author: '林深',
          link: '  http://xhslink.com/m/7XlthCaBszS ',
          width: 375,
          height: 500,
        },
            {
          src: '/cosplay/hiiragi_宵程_a.jpg',
          title: '一个阳光明媚的，普通的夏日',
          author: '宵程',
          link: 'http://xhslink.com/m/5pux2edsd3z',
          width: 375,
          height: 500,
        },
       {
          src: '/cosplay/shizuzumi_林深_a.jpg',
          title: '和hiiragi约会的一天',
          author: '林深',
          link: ' http://xhslink.com/m/SqZgocucgt ',
          width: 375,
          height: 500,
        },
               {
          src: '/cosplay/natsufuyu_宵程_b.jpg',
          title: '和立夏一起',
          author: '宵程',
          link: ' http://xhslink.com/m/8GfBdUJXg8H',
          width: 375,
          height: 500,
        },
               {
          src: '/cosplay/haruki_陈木_a.jpg',
          title: '春树',
          author: '陈木',
          link: ' http://xhslink.com/m/83Lc3PKWbad',
          width: 375,
          height: 500,
        },
               {
          src: '/cosplay/natsufuyu_宵程_c.jpg',
          title: '总之请去主页吃吧',
          author: '宵程',
          link: 'https://www.xiaohongshu.com/user/profile/64c2c041000000001403e7a0?xsec_token=YBHdfTysaX03B-dqqF3Y5ormyEQUAK_23MMd5E1zCwIPE%3D&xsec_source=app_share&xhsshare=CopyLink&appuid=634049c90000000018028880&apptime=1754792330&share_id=6cc750fa692746eca340bd1374814cf2&share_channel=copy_link',
          width: 375,
          height: 500,
        },
        // 可以继续添加更多图片...
      ],
      showPreview: false,
      previewImg: {},
      masonryOptions: {
        gutter: 20,
        fitWidth: true
      }
    };
  },
  methods: {
    // 判断是否为宽图（宽高比大于1.3视为宽图）
    isWideImage(img) {
      if (!img.width || !img.height) return false;
      return img.width / img.height > 1.3;
    },
    
    // 获取项目样式
    getItemStyle(img) {
      if (img.width && img.height) {
        return {
          '--aspect-ratio': (img.height / img.width * 100) + '%'
        };
      }
      return {};
    },
    
    // 处理图片点击
    handleImageClick(img) {
      if (img.link) {
        window.open(img.link, '_blank');
      } else {
        this.openPreview(img);
      }
    },
    
    // 打开预览
    openPreview(img) {
      this.previewImg = img;
      this.showPreview = true;
      document.body.style.overflow = 'hidden';
    },
    
    // 关闭预览
    closePreview() {
      this.showPreview = false;
      this.previewImg = {};
      document.body.style.overflow = '';
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.images-page {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%);
  min-height: 100vh;
  padding-bottom: 2rem;
    background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);

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

/* 行式瀑布流布局 */
.images-waterfall {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding: 5rem 1.5rem 1.5rem;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
}

/* 瀑布流项目 */
.waterfall-item {
  position: relative;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex: 1 1 calc(25% - 1.2rem);
  min-width: 240px;
  max-width: 100%;
  aspect-ratio: var(--aspect-ratio, 3/4);
  background: #f0f0f0;
}

/* 宽图项目 */
.waterfall-item.wide-item {
  flex: 2 1 calc(50% - 1.2rem);
}

/* 图片样式 */
.waterfall-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

/* 悬停覆盖层 */
.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 1.5rem 1rem 1rem;
  transform: translateY(100%);
  transition: all 0.3s ease;
  opacity: 0;
}

/* 悬停效果 */
.waterfall-item:hover .item-overlay {
  transform: translateY(0);
  opacity: 1;
}

.waterfall-item:hover .waterfall-img {
  transform: scale(1.05);
}

/* 标题样式 */
.item-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* 元信息区域 */
.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 作者信息 */
.item-author {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* 链接样式 */
.item-link {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.item-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(3px);
}

/* 预览模态框 */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.preview-content {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.preview-img-wrap {
  margin-bottom: 1rem;
  text-align: center;
}

.preview-img {
  max-width: 80vw;
  max-height: 70vh;
  border-radius: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.preview-author {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

.preview-info {
  max-width: 600px;
  text-align: center;
  padding: 0 1rem;
}

.preview-info h2 {
  margin: 1rem 0 0.5rem;
  color: #333;
}

.preview-info p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.preview-link {
  display: inline-block;
  background: #1976d2;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 2rem;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.preview-link:hover {
  background: #1565c0;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff4757;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.close-btn:hover {
  background: #ff6b81;
  transform: rotate(90deg);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .waterfall-item {
    flex: 1 1 calc(33.333% - 1.2rem);
  }
  .waterfall-item.wide-item {
    flex: 2 1 calc(66.666% - 1.2rem);
  }
}

@media (max-width: 768px) {
  .waterfall-item {
    flex: 1 1 calc(50% - 1.2rem);
  }
  .waterfall-item.wide-item {
    flex: 1 1 100%;
  }
}

@media (max-width: 480px) {
  .waterfall-item {
    flex: 1 1 100%;
  }
  .home-icon {
    margin: 1rem 0 0 1rem;
  }
  .images-waterfall {
    padding-top: 4rem;
  }
}
</style>
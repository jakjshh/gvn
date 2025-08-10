<template>
  <div class="ideas-container">
    <router-link to="/" class="home-icon" title="回到主页">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    </router-link>
    
    <h2 class="page-title">也许是代餐、脑洞</h2>
    <p class="page-subtitle">存放一些乱七八糟的东西</p>
    
    <div class="sticky-notes-grid">
      <div 
        v-for="(note, index) in stickyNotes" 
        :key="index" 
        class="sticky-note"
        :style="{
          transform: `rotate(${note.rotation}deg)`,
          backgroundColor: note.color
        }"
        @click="openModal(note)"
      >
        <h3>{{ note.title }}</h3>
        <p>{{ note.preview }}</p>
        <div class="note-meta">
          <span class="note-date">{{ note.date }}</span>
          <span class="note-music">🎵 {{ note.mood }}</span>
        </div>
      </div>
    </div>
    
    <!-- 音符背景装饰 -->
    <div class="music-notes-bg">
      <span v-for="n in 8" :key="n" class="music-note">♪</span>
    </div>
    
    <!-- 详情弹窗 -->
    <div v-if="selectedNote" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" :style="{ backgroundColor: selectedNote.color }">
        <button class="modal-close" @click="closeModal">×</button>
        <h2>{{ selectedNote.title }}</h2>
        <div class="external-links" v-if="selectedNote.links && selectedNote.links.length">
      <!-- <h4>相关链接：</h4> -->
      <ul>
        <li v-for="(link, index) in selectedNote.links" :key="index">
          <a :href="link.url" target="_blank" rel="noopener noreferrer" class="music-link">
             {{ link.text || '点击查看' }}
          </a>
        </li>
      </ul>
        </div>
        <div class="modal-meta">
          <span class="modal-date">{{ selectedNote.date }}</span>
          <span class="modal-mood">🎵 {{ selectedNote.mood }}</span>
        </div>
        <div class="modal-body">
<p class="preserve-whitespace">{{ selectedNote.content }}</p>        </div>
        <!-- <div class="modal-footer">
          <span class="modal-author">—— 灵感来源: {{ selectedNote.author || '匿名' }}</span>
        </div> -->

        <!-- 图片展示区域 -->
      <div class="modal-image" v-if="selectedNote.image">
        <img :src="selectedNote.image" :alt="selectedNote.title">
        <p class="image-caption" v-if="selectedNote.imageCaption">{{ selectedNote.imageCaption }}</p>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ideas',
  data() {
    return {
      selectedNote: null,
      stickyNotes: [
        {
          id: 1,
          title: "由头纱柄引发的联想",
          preview: "*拍宣传照的场合...",
          

    content: `*拍宣传照的场合

秋：锵锵——看我准备了什么？
春：喔？这是什么纱布之类的吗？
秋：拍艺术照的时候可以用来创作一下呢~
冬：是头纱吗，像这样戴在头上....
夏：∑(°口°๑)⁄(⁄⁄•⁄ω⁄•⁄⁄)⁄
春：www原来如此哦，真冬很合适呢~
      上sama怎么僵住了啊www
冬：很漂亮吧，上山同学？
夏：....简直...呃太漂亮了....
秋：www上sama很纯情呢~
夏：*过载

冬：那这个要怎么创作照片呢？（*摘）（盯）
春：嗯，是个问题，凭空出现的头纱会不会太突兀...得有场景情境之类的吧？
冬：喔！之前在有刷到过，像这样用头纱把两个人都套起来这种，然后拍半身或者大头，很有氛围感吧~（*用头纱把立夏罩起来）
春：www上sama又要过载了
秋：www上sama又要过载了
春：明白了，确实很适合拍双人照
秋：噗，就像在结婚一样
春：诶——！？(๑ŐдŐ)
秋：不觉得吗？我们也试试。（*罩）
春：啊啊...（目移）（内心：不好不好太近了太近了好帅的一张脸omg....）
秋：嘛总之就是这样，我们启动相机吧~春树也准备了很多构图呢（*笑）

*拍摄过程中，然后是休息时间

冬：好喜欢这张图！发给柊看看吧~
-聊天框-
-冬：[image]
-柊：诶？
-柊：你们在
-柊：玩什么！
-柊：我也要
-柊：带我一个
-柊：是聚会吗？
-冬：在拍宣传照，你有什么好的创作想法吗
-柊：有
-柊：等我
-柊：位置发我！
-柊：我和小玄也要去

夏：哈？那家伙为什么也要来？
冬：他似乎有一些想法呢，我们拍的也差不多了一起来聚聚也可以吧？(๑•ω•๑)
春：是syh的朋友吗，可以哦~
秋：syh啊...好啊。
夏：啊？就这么同意了？这可是Given在拍宣传照诶！！
冬：www

*敲门声

冬：啊..应该到了！
春：请进请进~
柊：打扰了——（*一段友好的问候（跳过了立夏））
玄：打扰了——
夏：(╬ఠдఠ)
秋：www可怕可怕~
春：闻到火药味了~
冬：你觉得怎么拍比较好呢？（*递头纱）
柊：哼哼，小玄来，和我示范！

*一段欢乐的时光，除了立夏www

柊：然后是，两个人其中一方戴上头纱，像这样！
玄：！...好漂亮...
柊：然后随意摆动作就可以啦~小玄要不要也试试——（*摘）（*戴）也很可爱呢！
玄：......嗯
春：诶——
秋：嗯？
春：想看秋彦戴呢。
秋：www好啊。（*戴）
春：噗www什么嘛，好好笑www那种浪子回头的奇怪感觉www
秋：噗
夏：等等等一下！现在是在干什么啊！我们是在拍摄诶！！什么情况什么情况
春：诶~上sama要发威了~
秋：诶~上sama要发威了~
夏：喂喂喂那是什么嘴脸啊
春：不过只有两个头纱吗...上sama也试试吧（*递）
冬：噗，上山同学也试试吧~（*套）
夏：诶诶？？
冬：很可爱呢，对吧？
秋：可爱！
春：可爱！
柊：哈哈哈哈哈哈那是什么啊笑死了
夏：闭嘴啊！
柊：哦~~~好可怕好可怕~~
玄：嗯。
夏：( ง °皿°)ง⁼³₌₃
春：ww青春的气息呢~
秋：青春的气息呢~
春：你是不是在一直学我说话啊！还有秋你也很青春喔还在说别人☞
秋：哈哈哈，你也很青春喔~`,
          links: [
      { url: "https://nan75946.lofter.com/post/1fcea717_2becbecc0?incantation=rzLgauMWKJxm", text: "字有点多码一下" },
     
    ],
          image: "/ideas/1.jpg", // 新增图片URL
          // imageCaption: "雨天排练的想象图", // 新增图片说明
          // date: "2023-05-12",
          // mood: "温柔抒情",
          color: "#fff9c4",
          rotation: -2,
          // author: "雨天的即兴创作"
        },
        {
          id: 2,
          title: "关于考斯接力的脑洞",
          preview: "诶我有点在构思那种接力...",
          content: "诶我有点在构思那种接力 就是大家出角色去各个地方游玩然后剪到一起，就好像是角色们在巡演的路上旅游之类的🥺🥺🥺🥺正好大家也在各地，相当于乐团成员门的中国行了！那这样的话大家拍的时候顺便拍一些这种镜头的小视频然后等凑的足够多了剪到一起就可以了耶！",
          color: "#c8e6c9",
          rotation: 1,
        },
        {
          id: 3,
          title: "想看",
          preview: "四人组奔跑的画面，可以是去大海，去麦田，看到了...",
          content: `想看四人组奔跑的画面，可以是去大海，去麦田，看到了精彩的场面，去抢购限量的东西，或者只是少男们没有目的地奔跑起来
夏冬玄柊的场合：
柊永远是第一个，拉着小玄冲在最前方，时不时回头嘲讽“好慢哦，永远也追不上吧”，冬会运动神经大爆发地跑起来，突然想起来立夏于是回头看，发现他累死累活但是一直能紧跟在冬身边“这是突然要干什么啊!!!”
Given的场合：
这个谁先起跑都有可能....那我随便说一个。比如冬先跑起来，然后夏马上跟上去，秋“喔这么热血，看得我腿痒痒了”
春“看着孩子们活力满满的感觉www”
“孩子们www我们也一起吧haruki”
“好哇 别小瞧活力满满的成年人！”
两个大长腿很轻松的跟上了呢！
但可能秋是跑的最快的因为其他仨人都在背着琴（负重训练.jpg）`,
        
          color: "#bbdefb",
          rotation: 3,
        
        },
        {
          id: 4,
          title: "我忘了",
          preview: "还有什么...",
          content: "总之我忘了",
          
          color: "#ffccbc",
          rotation: -1,

        },
        // {
        //   id: 5,
        //   title: "深夜作曲灵感",
        //   preview: "凌晨3点突然想到的旋律，关于...",
        //   content: "凌晨3点，睡意全无。窗外偶尔有汽车驶过的声音，电脑屏幕是唯一的光源。手指无意间在键盘上敲出一段旋律，关于那个总坐在观众席第一排的女孩，她听音乐时会不自觉地用脚尖打拍子，像在演奏只有她自己能听见的乐章。这段旋律后来成为了他们最柔情的慢歌。",
        //   date: "2023-08-01",
        //   mood: "迷幻电子",
        //   color: "#e1bee7",
        //   rotation: 2,
        //   author: "失眠夜的礼物"
        // },
        // {
        //   id: 6,
        //   title: "第一次合奏",
        //   preview: "他们第一次合奏时，发现彼此的音乐竟然...",
        //   content: "第一次合奏时，四个人四种风格。鼓手太激进，贝斯手太保守，吉他手总抢拍，主唱老是忘词。但奇怪的是，当这些不协调的元素碰撞在一起时，却产生了奇妙的化学反应。就像四把调不准的吉他，却弹出了最真实的和声。那一刻他们明白了，不完美才是乐队的开始。",
        //   date: "2023-03-18",
        //   mood: "青春摇滚",
        //   color: "#f8bbd0",
        //   rotation: -3,
        //   author: "乐队起源故事"
        // }
      ]
    }
  },
  methods: {
    openModal(note) {
      this.selectedNote = note;
      document.body.style.overflow = 'hidden'; // 禁止背景滚动
    },
    closeModal() {
      this.selectedNote = null;
      document.body.style.overflow = ''; // 恢复背景滚动
    }
  }
}
</script>

<style scoped>
.ideas-container {
  position: relative;
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f1fe 100%);
  overflow: hidden;
}

.home-icon {
  display: inline-block;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 2;
  position: relative;
}

.home-icon:hover {
  transform: scale(1.1);
}

.page-title {
  font-size: 2.5rem;
  color: #0984e3;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(162, 155, 254, 0.2);
  position: relative;
  z-index: 2;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #636e72;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
}

.sticky-notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 2;
}

.sticky-note {
  padding: 20px;
  border-radius: 4px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  border-top: 15px solid rgba(255, 255, 255, 0.5);
}

.sticky-note:hover {
  transform: rotate(0deg) scale(1.05) !important;
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.15);
}

.sticky-note h3 {
  margin-top: 0;
  color: #2d3436;
  font-size: 1.3rem;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  padding-bottom: 8px;
}

.sticky-note p {
  color: #2d3436;
  flex-grow: 1;
  line-height: 1.5;
}

.note-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #636e72;
}

.note-music {
  font-style: italic;
}

/* 音符背景装饰 */
.music-notes-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.music-note {
  position: absolute;
  font-size: 1.8rem;
  opacity: 0.1;
  color: #0984e3;
  animation: floatNote 10s linear infinite;
}

.preserve-whitespace {
  white-space: pre-line; /* 保留换行符和空格，自动换行 */
  /* 或者使用 pre-wrap 保留所有空白 */
}
/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(3px);
}

.modal-content {
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;
  border-top: 20px solid rgba(255, 255, 255, 0.6);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #2d3436;
  transition: transform 0.2s;
}

.modal-close:hover {
  transform: rotate(90deg);
}

.modal-content h2 {
  margin-top: 0;
  color: #2d3436;
  font-size: 1.8rem;
}

.modal-meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px;
  color: #636e72;
  font-size: 0.95rem;
}
/* 新增图片相关样式 */
.modal-image {
  margin: 20px 0;
  text-align: center;
}

.modal-image img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
}

.image-caption {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #636e72;
  font-style: italic;
}
.modal-body {
  line-height: 1.8;
  color: #2d3436;
}

.modal-footer {
  margin-top: 30px;
  text-align: right;
  font-style: italic;
  color: #636e72;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatNote {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }
  50% {
    opacity: 0.15;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .ideas-container {
    padding: 20px;
  }
  
  .sticky-notes-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 90%;
    padding: 20px;
  }
}
</style>
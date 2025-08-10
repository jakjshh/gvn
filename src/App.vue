<!-- <template>
  <div id="app">
    <button class="music-btn" @click="toggleDropdown">
  <span :class="{'music-icon': true, 'playing': isPlaying}">🎵</span>
    </button>
    <div v-if="showDropdown" class="music-dropdown">
      <div class="music-controls">
        <button class="music-play-btn" @click="togglePlay">
          <span v-if="!isPlaying" class="play-icon">&#9654;</span>
          <span v-else class="pause-icon">&#10073;&#10073;</span>
        </button>
        <button class="music-loop-btn" @click="toggleLoop">{{ loopMode === 'single' ? '单曲循环' : '列表循环' }}</button>
      </div>
      <div class="music-list">
        <label>select：</label>
        <select v-model="currentSong" @change="changeSong">
          <option v-for="song in songs" :key="song.src" :value="song.src">{{ song.name }}</option>
        </select>
      </div>
        <div class="music-controls">
        </div>
      <div class="music-progress">
        <label>进度：</label>
        <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekMusic" />
        <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
      <button class="close-dropdown" @click="closeDropdown">收起</button>
    </div>
  <audio ref="bgm" :src="currentSong" :loop="loopMode === 'single'" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @ended="onEnded"></audio>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showDropdown: false,
      songs: [
        { name: 'うらかわの存在', src: '/music/うらかわの存在.mp3' },
        { name: 'へたくそ', src: '/music/へたくそ.mp3' },
        { name: 'キヅアト', src: '/music/キヅアト.mp3' },
        { name: 'まるつけ', src: '/music/まるつけ.wma' },
        { name: 'ステージから君に捧ぐ', src: '/music/ステージから君に捧ぐ.wma' },
        { name: 'ストレイト', src: '/music/ストレイト.wma' },
        { name: 'スーパーウルトラーLOVE YOU', src: '/music/スーパーウルトラーLOVE YOU.wma' },
        { name: 'パレイド', src: '/music/パレイド.wma' },
        { name: '僕らだけの主題歌', src: '/music/僕らだけの主題歌.wma' },
        { name: '冬のはなし-Orchestra ver.-', src: '/music/冬のはなし-Orchestra ver.-.wma' },
        { name: '冬のはなし-with 立夏ver.-', src: '/music/冬のはなし-with 立夏ver.-.wma' },
        { name: '冬のはなし', src: '/music/冬のはなし.wma' },
        { name: '夜が明ける', src: '/music/夜が明ける.wma' },
        { name: '海へ', src: '/music/海へ.wma' },
        { name: '結言', src: '/music/結言.wma' },
      ],
      currentSong: '/music/うらかわの存在.mp3',
      currentTime: 0,
      duration: 0,
  isPlaying: false,
  loopMode: 'list', // 'single' or 'list'
    };
  },
  methods: {
    toggleLoop() {
      this.loopMode = this.loopMode === 'single' ? 'list' : 'single';
      this.$refs.bgm.loop = this.loopMode === 'single';
    },
    onEnded() {
      if (this.loopMode === 'list') {
        // 播放下一首
        const idx = this.songs.findIndex(s => s.src === this.currentSong);
        const nextIdx = (idx + 1) % this.songs.length;
        this.currentSong = this.songs[nextIdx].src;
        this.$nextTick(() => {
          this.$refs.bgm.play();
        });
      } // 单曲循环由 audio.loop 自动处理
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    changeSong() {
      const audio = this.$refs.bgm;
      audio.src = this.currentSong;
      audio.currentTime = 0;
      audio.play();
        this.isPlaying = true;
    },
      togglePlay() {
        const audio = this.$refs.bgm;
        if (audio.paused) {
          audio.play();
          this.isPlaying = true;
        } else {
          audio.pause();
          this.isPlaying = false;
        }
      },
    seekMusic(e) {
      const audio = this.$refs.bgm;
      audio.currentTime = Number(this.currentTime);
    },
    onTimeUpdate(e) {
      this.currentTime = Math.floor(this.$refs.bgm.currentTime);
    this.isPlaying = !this.$refs.bgm.paused;
    },
    onLoadedMetadata(e) {
      this.duration = Math.floor(this.$refs.bgm.duration);
    },
    formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    },
  },
  mounted() {
  // 默认不自动播放
  this.isPlaying = false;
  },
}
</script>

<style>
  .music-play-btn {
    background: #fff;
    color: #fd79a8;
    border: none;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 2px 8px #a29bfe22;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
  }
  .music-play-btn:hover {
    background: #fd79a8;
    color: #fff;
  }
  .play-icon {
    font-size: 1.5rem;
    color: #fd79a8;
    display: inline-block;
  }
  .pause-icon {
    font-size: 1.5rem;
    color: #fd79a8;
    display: inline-block;
  }
  .music-loop-btn {
    background: #636e72;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.3rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 2px 8px #a29bfe22;
    transition: background 0.2s;
  }
  .music-loop-btn:hover {
    background: #fd79a8;
  }
  .music-btn {
    position: fixed;
    top: 24px;
    right: 32px;
    z-index: 9999;
    font-size: 2rem;
    background: #fff;
    border-radius: 50%;
    border: none;
    box-shadow: 0 2px 8px #a29bfe44;
    cursor: pointer;
    transition: background 0.2s;
  }
    .music-controls {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 0.5rem;
      gap: 1rem;
    }
      .music-btn {
        position: fixed;
        top: 24px;
        right: 32px;
        z-index: 9999;
        font-size: 2rem;
        background: #fff;
        border-radius: 50%;
        border: none;
        box-shadow: 0 2px 8px #a29bfe44;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .music-btn:hover {
        background: #fd79a8;
        color: #fff;
      }
      .music-icon {
        display: inline-block;
        transition: color 0.2s;
      }
      .music-icon.playing {
        animation: rotateNote 1.2s linear infinite;
        color: #fd79a8;
      }
      @keyframes rotateNote {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  
  .music-dropdown {
    position: fixed;
    top: 70px;
    right: 32px;
    z-index: 9999;
    background: #fffde4;
    border-radius: 16px;
    box-shadow: 0 4px 16px #a29bfe33;
    padding: 1.2rem 1.5rem 1rem 1.5rem;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .music-list label, .music-progress label {
    font-size: 1rem;
    color: #636e72;
    margin-right: 0.5rem;
  }
  .music-list select {
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #a29bfe44;
    padding: 0.2rem 0.5rem;
    background: #fff;
    color: #0984e3;
  }
  .music-progress input[type="range"] {
    width: 120px;
    margin: 0 0.5rem;
  }
  .music-progress span {
    font-size: 0.95rem;
    color: #636e72;
  }
  .close-dropdown {
    align-self: flex-end;
    background: #fd79a8;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.3rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.5rem;
    box-shadow: 0 2px 8px #a29bfe22;
    transition: background 0.2s;
  }
  .close-dropdown:hover {
    background: #e17055;
  }
</style> -->
<template>
  <div id="app">
    <!-- 音乐按钮 -->
    <button class="music-btn" @click="toggleDropdown">
      <span :class="{'music-icon': true, 'playing': isPlaying}">
        <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </span>
    </button>

    <!-- 音乐下拉面板 -->
    <transition name="music-fade">
      <div v-if="showDropdown" class="music-dropdown">
        <div class="music-header">
          <h3>Now Playing</h3>
          <div class="visualizer">
            <span v-for="n in 5" :key="n" :style="visualizerStyle(n)"></span>
          </div>
        </div>

        <div class="song-info">
          <div class="album-art">
            <div class="vinyl">
              <div class="vinyl-inner"></div>
            </div>
          </div>
          <div class="song-details">
            <h4>{{ currentSongName }}</h4>
            <p>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</p>
          </div>
        </div>

        <div class="music-progress">
          <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekMusic" 
                 class="progress-bar" />
        </div>

        <div class="music-controls">
          <button class="control-btn prev-btn" @click="prevSong" title="上一首">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button class="control-btn play-btn" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
            <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button class="control-btn next-btn" @click="nextSong" title="下一首">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
          <button class="control-btn loop-btn" @click="toggleLoop" :title="loopMode === 'single' ? '单曲循环' : '列表循环'">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M17.5 17.5L16 16l-3.5-3.5l-1.5 1.5l-2-2l1.5-1.5L8 7l-1.5 1.5l-2-2L5 4l1.5-1.5l-2-2L2 2l1.5 1.5L2 5l1.5 1.5L2 8l1.5 1.5L4 11l1.5-1.5L8 8l3.5 3.5L12 13l2 2l-1.5 1.5L16 16l3.5 3.5L21 21l1.5-1.5l-2-2l1.5-1.5l-3-3z"/>
              <circle v-if="loopMode === 'single'" cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div class="music-list">
          <select v-model="currentSong" @change="changeSong" class="song-select">
            <option v-for="song in songs" :key="song.src" :value="song.src">{{ song.name }}</option>
          </select>
        </div>

        <button class="close-btn" @click="closeDropdown">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"/>
          </svg>
        </button>
      </div>
    </transition>

    <audio ref="bgm" :src="currentSong" :loop="loopMode === 'single'" 
           @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @ended="onEnded"></audio>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showDropdown: false,
      songs: [
        { name: 'うらかわの存在', src: '/music/うらかわの存在.mp3' },
        { name: 'へたくそ', src: '/music/へたくそ.mp3' },
        { name: 'キヅアト', src: '/music/キヅアト.mp3' },
        { name: 'まるつけ', src: '/music/まるつけ.wma' },
        { name: 'ステージから君に捧ぐ', src: '/music/ステージから君に捧ぐ.wma' },
        { name: 'ストレイト', src: '/music/ストレイト.wma' },
        { name: 'スーパーウルトラーLOVE YOU', src: '/music/スーパーウルトラーLOVE YOU.wma' },
        { name: 'パレイド', src: '/music/パレイド.wma' },
        { name: '僕らだけの主題歌', src: '/music/僕らだけの主題歌.wma' },
        { name: '冬のはなし-Orchestra ver.-', src: '/music/冬のはなし-Orchestra ver.-.wma' },
        { name: '冬のはなし-with 立夏ver.-', src: '/music/冬のはなし-with 立夏ver.-.wma' },
        { name: '冬のはなし', src: '/music/冬のはなし.wma' },
        { name: '夜が明ける', src: '/music/夜が明ける.wma' },
        { name: '海へ', src: '/music/海へ.wma' },
        { name: '結言', src: '/music/結言.wma' },
      ],
      currentSong: '/music/うらかわの存在.mp3',
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      loopMode: 'list',
      visualizerActive: false
    };
  },
  computed: {
    currentSongName() {
      const song = this.songs.find(s => s.src === this.currentSong);
      return song ? song.name : '';
    }
  },
  methods: {
    toggleLoop() {
      this.loopMode = this.loopMode === 'single' ? 'list' : 'single';
      this.$refs.bgm.loop = this.loopMode === 'single';
    },
    onEnded() {
      if (this.loopMode === 'list') {
        this.nextSong();
      }
    },
    prevSong() {
      const idx = this.songs.findIndex(s => s.src === this.currentSong);
      const prevIdx = (idx - 1 + this.songs.length) % this.songs.length;
      this.currentSong = this.songs[prevIdx].src;
      this.$nextTick(() => {
        this.$refs.bgm.play();
        this.isPlaying = true;
      });
    },
    nextSong() {
      const idx = this.songs.findIndex(s => s.src === this.currentSong);
      const nextIdx = (idx + 1) % this.songs.length;
      this.currentSong = this.songs[nextIdx].src;
      this.$nextTick(() => {
        this.$refs.bgm.play();
        this.isPlaying = true;
      });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    changeSong() {
      const audio = this.$refs.bgm;
      audio.src = this.currentSong;
      audio.currentTime = 0;
      audio.play();
      this.isPlaying = true;
    },
    togglePlay() {
      const audio = this.$refs.bgm;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
    seekMusic(e) {
      const audio = this.$refs.bgm;
      audio.currentTime = Number(this.currentTime);
    },
    onTimeUpdate(e) {
      this.currentTime = Math.floor(this.$refs.bgm.currentTime);
      this.isPlaying = !this.$refs.bgm.paused;
    },
    onLoadedMetadata(e) {
      this.duration = Math.floor(this.$refs.bgm.duration);
    },
    formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    },
    visualizerStyle(n) {
      if (!this.isPlaying) return {};
      const height = 2 + Math.random() * 12;
      const delay = n * 0.1;
      return {
        height: `${height}px`,
        animationDelay: `${delay}s`
      };
    }
  },
  mounted() {
    this.isPlaying = false;
  }
}
</script>

<style scoped>
/* 基础样式 */
#app {
  --primary-color: #fd79a8;
  --secondary-color: #a29bfe;
  --text-color: #2d3436;
  --bg-color: #fff;
  --panel-bg: #fff9f9;
  --progress-bg: #e0f7fa;
}

/* 音乐按钮 */
.music-btn {
  position: fixed;
  top: 24px;
  right: 32px;
  z-index: 9999;
  width: 48px;
  height: 48px;
  background: var(--bg-color);
  border-radius: 50%;
  border: none;
  box-shadow: 0 4px 12px rgba(162, 155, 254, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.music-btn:hover {
  transform: scale(1.1);
  background: var(--primary-color);
  color: white;
}

.music-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.music-icon.playing {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 音乐下拉面板 */
.music-fade-enter-active, .music-fade-leave-active {
  transition: all 0.3s ease;
}
.music-fade-enter, .music-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.music-dropdown {
  position: fixed;
  top: 90px;
  right: 32px;
  z-index: 9998;
  background: var(--panel-bg);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(162, 155, 254, 0.2);
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.music-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.music-header h3 {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.visualizer {
  display: flex;
  align-items: flex-end;
  height: 20px;
  gap: 4px;
}

.visualizer span {
  display: inline-block;
  width: 3px;
  background: var(--primary-color);
  border-radius: 3px;
  animation: visualizer 0.8s infinite alternate;
}

@keyframes visualizer {
  0% { height: 2px; }
  100% { height: 14px; }
}

/* 歌曲信息 */
.song-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.album-art {
  position: relative;
  width: 60px;
  height: 60px;
}

.vinyl {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotateVinyl 10s linear infinite;
  animation-play-state: paused;
}

.music-icon.playing + .music-dropdown .vinyl {
  animation-play-state: running;
}

.vinyl-inner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--text-color);
  border: 2px solid #636e72;
}

.song-details {
  flex: 1;
}

.song-details h4 {
  margin: 0;
  color: var(--text-color);
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-details p {
  margin: 4px 0 0;
  color: #636e72;
  font-size: 0.85rem;
}

/* 进度条 */
.music-progress {
  width: 100%;
}

.progress-bar {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--progress-bg);
  outline: none;
  margin: 8px 0;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  transition: all 0.2s;
}

.progress-bar::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* 控制按钮 */
.music-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.control-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  background: rgba(253, 121, 168, 0.1);
  color: var(--primary-color);
}

.play-btn {
  width: 44px;
  height: 44px;
  background: var(--primary-color);
  color: white;
}

.play-btn:hover {
  transform: scale(1.1);
  background: var(--primary-color);
}

/* 歌曲选择 */
.music-list {
  width: 100%;
}

.song-select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(162, 155, 254, 0.3);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
}

.song-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(253, 121, 168, 0.2);
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #636e72;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  color: var(--primary-color);
  transform: rotate(90deg);
}

/* 黑胶旋转动画 */
@keyframes rotateVinyl {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式调整 */
@media (max-width: 480px) {
  .music-btn {
    right: 16px;
    top: 16px;
  }
  
  .music-dropdown {
    right: 16px;
    width: calc(100% - 32px);
    max-width: 280px;
  }
}
</style>
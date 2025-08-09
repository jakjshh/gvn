<template>
  <div id="app">
    <button class="music-btn" @click="toggleDropdown">
  <span :class="{'music-icon': true, 'playing': isPlaying}">🎵</span>
    </button>
    <div v-if="showDropdown" class="music-dropdown">
      <div class="music-controls">
        <button class="music-play-btn" @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
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
    <audio ref="bgm" :src="currentSong" loop @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata"></audio>
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
</style>

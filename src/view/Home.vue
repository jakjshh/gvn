<template>
  <div class="gallery">
    <h1>同人作品馆</h1>
    <div class="grid">
      <div
        v-for="(work, index) in works"
        :key="index"
        class="card"
        @click="openWork(work)"
      >
        <img :src="work.img" alt="作品封面" />
        <p>{{ work.title }}</p>
      </div>
    </div>

    <div v-if="selectedWork" class="modal" @click.self="closeWork">
      <div class="modal-content">
        <h2>{{ selectedWork.title }}</h2>
        <img :src="selectedWork.img" alt="作品图" />
        <p>{{ selectedWork.description }}</p>
        <button @click="closeWork">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 JSON 数据
import worksData from '../data/works.json'

export default {
  data() {
    return {
      works: worksData,
      selectedWork: null
    }
  },
  methods: {
    openWork(work) {
      this.selectedWork = work
    },
    closeWork() {
      this.selectedWork = null
    }
  }
}
</script>

<style scoped>
.gallery {
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.card img {
  width: 100%;
  border-radius: 8px;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: left;
}
.modal-content img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}
.modal-content button {
  display: block;
  margin: 0 auto;
  padding: 8px 20px;
  border: none;
  background: #42b983;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
.modal-content button:hover {
  background: #369870;
}
</style>
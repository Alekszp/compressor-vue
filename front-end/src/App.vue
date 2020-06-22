<template>
  <div id="app">
    <div class="tab-group">
      <button :class="{'active-tab' : isCompression}" name='compression' @click='activeTab'>Compression</button>
      <button :class="{'active-tab' : !isCompression}" name='decompression' @click='activeTab'>Decompression</button>
    </div>
    <CompressionForm :compression='isCompression'/>
    
  </div>
</template>

<script>
import CompressionForm from "./components/CompressionForm.vue";

export default {
  name: "App",
  components: {
    CompressionForm
  },
  data(){
    return {
      isCompression: true
    }
  },
  methods: {
      activeTab(e){
        if(e.target.name === 'compression'){
          this.isCompression = true
        } else {
          this.isCompression = false
        }
      }
    }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b7ccf8;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .tab-group {
    border-top: 2px solid yellow;
    border-bottom: 2px solid yellow;
    padding: 5px;
    .active-tab{
      background-color: #b7ccf8;
      color: #2c3e50;
    }
    button {
      outline: none;
      border: none;
      background: none;
      color: #b7ccf8;
      font-size: 1em;
      font-weight: 700;
      height: 30px;
      cursor: pointer;
      border-radius: 0;
    }
    

  }
}
</style>

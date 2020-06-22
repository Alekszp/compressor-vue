<template>
  <div class="compression-form">
    <div class="inputRow">
      <label for="inputString">Input string</label>
      <input id="inputString" type="text" v-model="inputString" ref="inputString" />
      <span :class="{error : invalidInput}">{{`${invalidInput ? errorMessage : ''}`}}</span>
    </div>
    <div class="inputRow">
      <label for="compressedString">{{`${compression ? 'C' : 'Dec'}ompressed string`}}</label>
      <input id="compressedString" type="text" v-model="result" />
      <div class="loader" v-if="loading">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
    <div class="button-group">
      <button @click="getResult">{{`${compression ? 'C' : 'Dec'}ompress`}}</button>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  regForCompression,
  regForDecompression
} from "../const/regexHelper.js";

export default {
  name: "Compression-Form",
  props: {
    compression: {
      type: Boolean
    }
  },
  data() {
    return {
      inputString: "",
      result: "",
      loading: false,
      decompressErrorInput:
        "enter string with next chars (a,b,c,d,e,f and 0-9 after)",
      compressErrorInput: "enter string with next chars (a,b,c,d,e,f)",
      errorInputMessage: ""
    };
  },
  watch: {
    compression() {
      this.clear();
      this.$refs.inputString.focus();
    }
  },
  computed: {
    invalidInput() {
      if (this.compression) {
        if (this.inputString.match(regForCompression)) {
          return false;
        } else {
          return true;
        }
      } else {
        if (this.inputString.match(regForDecompression)) {
          return false;
        } else {
          return true;
        }
      }
    },
    errorMessage() {
      if (this.compression && this.invalidInput) {
        return "enter string with next chars (a,b,c,d,e,f)";
      } else if (!this.compression && this.invalidInput) {
        return "enter string with next chars (a,b,c,d,e,f and 0-9 after)";
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => this.$refs.inputString.focus());
  },
  methods: {
    clear() {
      this.inputString = "";
      this.result = "";
    },
    getResult() {
      if (this.invalidInput) return;
      this.loading = true;
      let url = this.compression
        ? "http://localhost:7001/compress"
        : "http://localhost:7001/decompress";

      axios
        .post(url, { string: this.inputString })
        .then(res => (this.result = res.data.string))
        .catch(e => alert(e.message))
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped lang="scss">
.compression-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px #1f252b;
  padding: 30px;
  margin: 30px auto;
  .inputRow {
    display: flex;
    margin-bottom: 30px;
    position: relative;
    label {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      white-space: nowrap;
    }
    input {
      width: 250px;
      height: 25px;
      outline: none;
      border-radius: 5px;
      border: none;
    }
    .error {
      position: absolute;
      color: #e64848;
      font-size: 0.7em;
      bottom: -15px;
      right: 0;
    }
    .loader {
      position: absolute;
      right: -10px;
      .lds-spinner {
        display: inline-block;
        position: relative;
        width: 10px;
        height: 10px;
      }
      .lds-spinner div {
        transform-origin: 10px 10px;
        animation: lds-spinner 1.2s linear infinite;
      }
      .lds-spinner div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 3px;
        left: 10px;
        width: 2px;
        height: 8px;
        border-radius: 20%;
        background: #fff;
      }
      .lds-spinner div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
      }
      .lds-spinner div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
      }
      .lds-spinner div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
      }
      .lds-spinner div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
      }
      .lds-spinner div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
      }
      .lds-spinner div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
      }
      .lds-spinner div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
      }
      .lds-spinner div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
      }
      .lds-spinner div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
      }
      .lds-spinner div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
      }
      .lds-spinner div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
      }
      .lds-spinner div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
      }
      @keyframes lds-spinner {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button {
      height: 30px;
      border: none;
      border-radius: 5px;
      background-color: #b7ccf8;
      color: #2c3e50;
      font-size: 1em;
      font-weight: 700;
      cursor: pointer;
    }
    button:first-child {
      margin-right: 10px;
    }
  }
}
</style>

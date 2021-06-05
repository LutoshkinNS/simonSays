<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Simon Says</h1>
      <div class="wrap">
        <div class="game">
          <ul class="items-list">
              <li
                class="item"
                v-for="(item, idx) in list"
                :key="item"
                :id="item"
                :class="[{'active': activeItem === item}, item]"
                @click="matchOrder($event, idx)"
                :disabled="isActive"
              >
                <audio ref="audio" :id="item" preload="auto">
                  <source :src="require(`./assets/sounds/${item}.mp3`)" type="audio/mp3">
                </audio>
              </li>
          </ul>
        </div>
        <div class="control">
          <h3 class="counter">Round:{{ level }}</h3>
          <h4 v-if="gameOver" class="message">Игра окончена, ваш результат:{{ total }}</h4>
          <h3>Game options</h3>
          <ul class="options">
            <li v-for="option in optionList" :key="option.name">
              <input :id="option.name" type="radio" v-model="optionValue" :value="option.value">
              <label :for="option.name">{{ option.name }}</label>
            </li>
          </ul>
          <button class="btn" @click="start" :disabled="order.length !== 0">Start game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      list: ['blue', 'red', 'green', 'yellow'],
      optionList: [
        { name: 'easy', value: 1500 },
        { name: 'normal', value: 1000 },
        { name: 'hard', value: 400 },
      ],
      activeItem: '',
      order: [],
      isActive: true,
      level: 0,
      counter: 0,
      gameOver: false,
      total: '',
      optionValue: '1000',
    };
  },
  methods: {
    start() {
      // eslint-disable-next-line no-plusplus
      this.level++;
      this.gameOver = false;
      this.counter = 0;
      const randomElement = this.list[Math.floor(Math.random() * this.list.length)];
      this.order.push(randomElement);
      this.delay(1000)
        .then(() => {
          this.changeActive();
        });
    },
    audio(name) {
      this.$refs.audio.forEach((item, idx) => {
        if (item.id === name) {
          this.$refs.audio[idx].play();
        }
      });
    },
    delay(ms) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
      });
    },
    changeActive() {
      this.isActive = true;
      this.order.forEach((item, idx) => this.delay(idx * this.optionValue)
        .then(() => {
          this.audio(item);
          this.activeItem = item;
          return this.delay(300);
        })
        .then(() => {
          this.activeItem = '';
          if (idx === this.order.length - 1) {
            this.isActive = false;
          }
        }));
    },
    matchOrder(e) {
      this.audio(e.target.id);
      if (this.order[this.counter] === e.target.id) {
        if (this.counter === this.order.length - 1) {
          this.start();
        } else {
          // eslint-disable-next-line no-plusplus
          this.counter++;
        }
      } else if (!this.isActive) {
        this.gameOver = true;
        this.total = this.level;
        this.level = 0;
        this.order = [];
      }
    },
  },
};
</script>

<style lang="sass">

</style>

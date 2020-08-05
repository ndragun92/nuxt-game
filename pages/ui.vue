<template>
  <div class="battle-ui">
    <div class="battle-ui__background" />
    <div class="battle-ui__map">
      <img src="https://gamepedia.cursecdn.com/cabal_gamepedia/4/45/MapBG01.gif?version=e0e5ffc606b732d78be1b009924866b4" alt="">
    </div>
    <div class="battle-ui__wrapper">
      <div class="battle-ui__container">
        <div class="monster">
          <h2 class="monster__name">
            Nipperlug
          </h2>
          <div class="monster__image">
            <div class="monster__image-container">
              <img src="https://gamepedia.cursecdn.com/cabal_gamepedia/2/2d/Nipper_Lug.gif?version=0d8789b469599e2328555826be865554" alt="">
              <div class="monster__dmg">
                987
              </div>
            </div>
          </div>
          <div class="monster__hp-progress">
            <div class="monster__hp-bar" style="width:65%">
              <p class="monster__hp-percent">
                65%
              </p>
            </div>
          </div>
          <div class="monster__info">
            <div class="monster__info-level">
              25 Level
            </div>
            <div class="monster__info-stats">
              <div class="monster__info-hp">
                <i class="icon-heart"><span class="path1" /><span class="path2" /></i> 2500
              </div>
              <div class="monster__info-attack">
                <i class="icon-sword"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /><span class="path5" /><span class="path6" /><span class="path7" /><span class="path8" /></i> 2500
              </div>
              <div class="monster__info-defense">
                <i class="icon-shield"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /></i> 3000
              </div>
            </div>
          </div>
        </div>
        <div class="logs">
          <h6>Battle logs:</h6>
          <div class="logs__container">
            <p v-for="n in 200" :key="n">
              This is something new
            </p>
          </div>
        </div>
        <div class="battle__start">
          <button type="button">
            Start battle
          </button>
        </div>
      </div>
    </div>
    <div class="character__toolbar">
      <div class="character__toolbar-container">
        <div class="character__toolbar-container-left">
          <div class="character__details">
            <div class="character__details-image" @click="showCharacterInfo = !showCharacterInfo">
              <img src="http://naimg.playthisgame.com/cabal_new/images/classes/blader.jpg" alt="">
              <div class="character__dmg">
                987
              </div>
            </div>
            <div class="character__details-box">
              <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                <div v-if="!showCharacterInfo" class="character__details-stats">
                  <div class="character__details-att-def">
                    <span><i class="icon-sword"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /><span class="path5" /><span class="path6" /><span class="path7" /><span class="path8" /></i><span class="atk-value">200</span></span>
                    <span><i class="icon-shield"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /></i><span class="def-value">350</span></span>
                  </div>
                  <div class="character__details-hp">
                    <span><i class="icon-heart"><span class="path1" /><span class="path2" /></i><span class="hp-value">3500</span></span>
                  </div>
                </div>
              </transition>
              <div class="character__hp-progress">
                <div class="character__hp-bar" style="width:65%">
                  <p class="character__hp-percent">
                    65%
                  </p>
                </div>
              </div>
              <div class="character__details-name">
                <span>LeoTeoD</span>
              </div>
              <div class="character__details-level">
                20 Level
              </div>
            </div>
          </div>
          <div class="character__skills">
            <ul>
              <li v-for="n in 5" :key="n">
                <img src="https://gamepedia.cursecdn.com/cabal_gamepedia/9/94/Stab_and_Slash_icon.png" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div>
          Right
        </div>
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <div v-if="showCharacterInfo" class="character__info">
            <ul>
              <li>
                <span><strong>STR</strong>: 10</span>
                <span>
                  <i class="material-icons">remove</i>
                  <i class="material-icons">add</i>
                </span>
              </li>
              <li>
                <span><strong>DEX</strong>: 10</span>
                <span>
                  <i class="material-icons">remove</i>
                  <i class="material-icons">add</i>
                </span>
              </li>
              <li>
                <span><strong>INT</strong>: 10</span>
                <span>
                  <i class="material-icons">remove</i>
                  <i class="material-icons">add</i>
                </span>
              </li>
              <li>
                <strong>Critical Rate</strong>: 50%
              </li>
              <li>
                <strong>Critical DMG</strong>: 250%
              </li>
            </ul>
          </div>
        </transition>
        <div class="character__exp-bar">
          <div class="character__exp-bar-progress" style="width: 40%" />
          <div class="character__exp-bar-lines">
            <div v-for="n in 10" :key="n" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showCharacterInfo: false
  })
}
</script>

<style lang="scss" scoped>
.battle-ui {
  height: 100vh;
  background-color: var(--dark-primary-color);
  &__background {
    background-image: url("https://cabalph.playpark.com/main/wp-content/uploads/2017/05/BloodyIce3.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.5;
  }
  &__map {
    position: absolute;
    top: 20px;
    left: 20px;
    img {
      display: block;
      width: 400px;
      height: 400px;
    }
  }
  &__wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__container {
    width: 100%;
    max-width: 300px;
    padding: 20px;
    background-color: var(--dark-primary-color);
    color: var(--light-text-primary-color);
    border-radius: var(--radius);
  }
}
.battle__start {
  margin-top: 10px;
  width: 100%;
  button {
    cursor: pointer;
    height: 30px;
    padding: 0 10px;
    width: 100%;
    border: none;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    background-color: rgba(var(--info-color-rgb), 0.75);
    transition: var(--transition);
    &:hover {
      background-color: rgba(var(--info-color-rgb), 1);
    }
  }
}
.logs {
  margin-top: 10px;
  h6 {
    margin: 5px 0;
    text-transform: uppercase;
    font-size: 10px;
  }
  &__container {
    height: 200px;
    overflow-y: auto;
    color: #a7a7a7;
    p {
      margin: 5px 0;
      font-size: 12px;
    }
  }
}
.monster {
  &__name {
    margin: 0 0 10px 0;
    font-size: 18px;
    text-align: center;
  }
  &__image {
    display: flex;
    justify-content: center;
    &-container {
      position: relative;
      display: inline-block;
    }
    img {
      display: block;
      width: 100px;
      height: 100px;
      margin: auto;
    }
  }
  &__dmg {
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(var(--error-color-rgb), 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
    &.criticalHit {
      background-color: rgba(var(--error-color-rgb), 0.8);
      color: var(--dark-text-primary-color);
    }
  }
  &__info {
    background-color: var(--dark-secondary-color);
    border-radius: var(--radius);
    padding: 10px;
    font-size: 12px;
    i {
      margin-right: 5px;
    }
    &-level {
      text-align: center;
      margin-bottom: 10px;
    }
    &-stats {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #a7a7a7;
    }
  }
  &__hp {
    &-progress {
      margin: 10px 0;
      padding: 0;
      width: 100%;
      height: 10px;
      overflow: hidden;
      background: #e5e5e5;
    }
    &-bar {
      position: relative;
      float: left;
      height: 100%;
      background: var(--error-color);
      transition: width var(--transition) linear;
    }
    &-percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      margin: 0;
      font-size: 8px;
      font-weight: 600;
      color: var(--dark-text-primary-color);
      &.offset {
        padding-left: 30px;
      }
    }
  }
}
.character {
  &__toolbar {
    position: fixed;
    right: 0;
    bottom: 5px;
    left: 0;
    z-index: $z-index-fixed;
    &-container {
      position: relative;
      max-width: 1024px;
      margin: auto;
      background-color: var(--dark-primary-color);
      color: var(--light-text-primary-color);
      font-size: 12px;
      padding: 10px 10px 15px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--radius) var(--radius) 0 0;
      &-left {
        display: flex;
      }
    }
  }
  &__exp-bar {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    line-height: 10px;
    background-color: var(--light-primary-color);
    font-weight: 600;
    text-align: center;
    border: 1px solid var(--dark-primary-color);
    &-progress {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      background-color: var(--info-color);
      transition: width var(--transition) linear;
    }
    &-lines {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      & > div {
        width: calc(100% / 10);
        height: 100%;
        &:not(:last-child) {
          border-right: 2px solid var(--dark-primary-color);
        }
        //background-color: purple;
      }
    }
  }
  &__details {
    display: flex;
    &-box {
      padding: 0 10px;
      font-size: 10px;
    }
    &-image {
      position: relative;
      display: inline-block;
      img {
        object-fit: cover;
        object-position: center;
        display: block;
        width: 65px;
        height: 65px;
      }
    }
    &-stats {
      position: absolute;
      bottom: calc(100% + 5px);
      display: flex;
      align-items: center;
      background: #353442;
      padding: 3px 5px;
      border-radius: var(--radius);
      i {
        vertical-align: middle;
      }
    }
    &-att-def {
      .atk-value, .def-value {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    &-hp {
      .hp-value {
        margin-left: 5px;
      }
    }
    &-name {
      display: block;
      span {
        font-size: 12px;
        font-weight: 600;
        margin-right: 10px;
      }
    }
    &-level {
      color: #a7a7a7;
    }
  }
  &__dmg {
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(var(--error-color-rgb), 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
    &.criticalHit {
      background-color: rgba(var(--error-color-rgb), 0.8);
      color: var(--dark-text-primary-color);
    }
  }
  &__skills {
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
      li {
        position: relative;
        border: 1px solid #353442;
        border-radius: var(--radius);
        overflow: hidden;
        margin: 0 2px;
        img {
          display: block;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  &__info {
    position: absolute;
    z-index: -1;
    bottom: 100%;
    left: 10px;
    background-color: var(--dark-secondary-color);
    color: var(--light-text-primary-color);
    border-radius: var(--radius) var(--radius) 0 0;
    padding: 10px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        font-size: 10px;
        text-transform: uppercase;
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          vertical-align: middle;
          font-size: 12px;
        }
        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  &__hp {
    &-progress {
      margin: 0 0 5px 0;
      padding: 0;
      width: 150px;
      height: 10px;
      overflow: hidden;
      background: #e5e5e5;
    }
    &-bar {
      position: relative;
      float: left;
      height: 100%;
      background: var(--error-color);
      transition: width var(--transition) linear;
    }
    &-percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      margin: 0;
      font-size: 8px;
      font-weight: 600;
      color: var(--dark-text-primary-color);
      &.offset {
        padding-left: 30px;
      }
    }
  }
}
</style>

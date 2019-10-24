<template>
  <header>
    <div class="bg"></div>
    <nav class="header-bg">
      <ul>
        <li>
          <router-link to="/home">homo</router-link>
        </li>
        <li>
          <router-link to="/tags">tags</router-link>
        </li>
        <li>
          <router-link to="/about">about</router-link>
        </li>
      </ul>
    </nav>
    <section class="home_title">
      <transition name="fade">
        <h1></h1>
      </transition>
    </section>
  </header>
</template>

<script>
export default {
  data() {
    return {
      finalheadline: "",
      show_headline: true
    };
  }
};
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

header {
  height: 30rem;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
}

.bg {
  z-index: -1;
  position: absolute;
  height: 30rem;
  width: 100%;
  left: 0;
  top: 0;
  background: url('./../../assets/img/bg.jpg') no-repeat fixed center;
  filter: brightness(0.7);
}

nav {
  ul {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    list-style: none;
    margin-right 20px;
  }

  a {
    font-size: 1.6rem;
    display: block;
    padding: 1.2rem 1.8rem;
    color: #fff;
    opacity: 1;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}

.home_title {
  color: #fff;
  display: flex;
  margin: auto;
  max-width: 94%;

  h1 {
    margin: auto;
    font-size: 4rem;
    font-weight: 400;
  }
}

@media screen and (max-width: 768px) {
  .home_title h1 {
    font-size: 2.6rem;
  }

  .bg, header {
    height: 24rem;
  }
}

@media screen and (max-width: 480px) {
  header, .bg {
    height: 25rem;
  }

  nav a {
    font-size: 1.6rem;
  }
}
</style>

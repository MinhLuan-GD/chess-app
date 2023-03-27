<template>
  <PopupLogin />
  <PopupSignup />
  <div :class="$style['left-sidebar-fake']"></div>
  <div :class="$style['left-sidebar']">
    <div :class="$style['nav-logo']" @click="() => $router.push('/')">
      <h1 :class="$style.logo">Chess</h1>
    </div>
    <div
      :class="$style['nav-item']"
      @click="() => $router.push('/game-option')"
    >
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/play.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Chơi </span>
      </a>
    </div>
    <div :class="$style['nav-item']" @click="() => $router.push('listgame')">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/chess-board.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Games </span>
      </a>
    </div>
    <div :class="$style['nav-item']">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/puzzles.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Câu đố </span>
      </a>
    </div>
    <div :class="$style['nav-item']">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/learn.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Học </span>
      </a>
    </div>
    <div :class="$style['nav-item']">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/play.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Theo dõi </span>
      </a>
    </div>
    <div :class="$style['nav-item']">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/new.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Tin tức </span>
      </a>
    </div>
    <div :class="$style['nav-item']">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/social.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Cộng đồng </span>
      </a>
    </div>
    <div :class="$style['nav-item']">
      <a href="#" :class="$style.option">
        <img
          src="@/assets/icon/more.png"
          alt=""
          :class="$style['option-icon']"
        />
        <span> Thêm nữa </span>
      </a>
    </div>
    <div v-if="!$store.state.player">
      <div :class="$style['nav-item-sign']">
        <div @click="signupPopupShow" :class="$style.signup">Đăng ký</div>
      </div>
      <div :class="$style['nav-item-sign']">
        <div @click="loginPopupShow" :class="$style.login">Đăng nhập</div>
      </div>
    </div>
    <div v-else>
      <div :class="$style['nav-item']">
        <a href="#" :class="$style.option">
          <img
            src="@/assets/icon/user.png"
            alt=""
            :class="$style['option-icon']"
          />
          <span> {{ $store.state.player.nickname }} </span>
          <!-- <span>Luan</span> -->
        </a>
      </div>
      <div :class="$style['nav-item']" @click="logout">
        <a href="#" :class="$style.option">
          <img
            src="@/assets/icon/log-out.png"
            alt=""
            :class="$style['option-icon']"
          />
          <span> Đăng xuất </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PopupLogin from "./sign/PopupLogin.vue";
import PopupSignup from "./sign/PopupSignup.vue";
import store from "@/store";

@Options({
  components: {
    PopupLogin,
    PopupSignup,
  },
})
export default class Header extends Vue {
  loginPopup!: HTMLElement;
  signupPopup!: HTMLElement;

  mounted() {
    this.loginPopup = document.getElementById("login-popup") as HTMLElement;
    this.signupPopup = document.getElementById("signup-popup") as HTMLElement;
  }

  signupPopupShow() {
    this.signupPopup.style.display = "flex";
  }

  loginPopupShow() {
    this.loginPopup.style.display = "flex";
  }

  logout() {
    window.location.href = `${process.env.VUE_APP_API_ENDPOINT}/auth/logout`;
    store.dispatch("logout");
    store.dispatch("deleteGameId");
  }
}
</script>

<style lang="scss" module>
.left-sidebar-fake {
  grid-area: header;
  height: 100%;
}
.left-sidebar {
  background-color: #272522;
  grid-area: header;
  height: 100%;
  position: fixed;
  padding: 30px 0px;
  & .nav-logo {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & .logo {
      color: white;
    }
  }
  & .nav-item {
    display: flex;
    height: 46px;
    padding: 0px 20px;
    justify-content: flex-start;
    margin: 3px 0;
    cursor: pointer;
    align-items: center;
    &:hover {
      background-color: #474542;
    }
    & .option {
      text-decoration: none;
      color: white;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      & .option-icon {
        height: 20px;
        width: 20px;
        object-fit: cover;
        margin-right: 10px;
      }
    }
  }
  & .nav-item-sign {
    height: 50px;
    padding: 0px 20px;
    & .signup,
    & .login {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 5px;
      height: 90%;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
    & .signup {
      margin-top: 8px;
      background-color: #615e59;
      &:hover {
        background-color: #868480;
      }
    }
    & .login {
      background-color: #b58863;
      &:hover {
        background-color: #d3b585;
      }
    }
  }
}
</style>

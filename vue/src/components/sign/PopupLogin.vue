<template>
  <div
    ref="loginPopup"
    id="login-popup"
    @click="closePopup"
    :class="$style.container"
  >
    <div @click.stop="" :class="$style.popup">
      <div :class="$style.close" @click="closePopup">x</div>
      <form @submit.prevent="submit">
        <div :class="$style['form-group']">
          <label>Email address</label>
          <input v-model="model.email" type="email" placeholder="Enter email" />
        </div>
        <div :class="$style['form-group']">
          <label>Password</label>
          <input
            v-model="model.password"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" :class="$style.submit">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { login } from "@/api/player";
import { LoginModel } from "@/models/login";
import store from "@/store";
import { ref } from "vue";
import { Vue } from "vue-class-component";

export default class PopupLogin extends Vue {
  loginPopup = ref() as unknown as HTMLElement;
  model = new LoginModel();

  closePopup() {
    this.loginPopup.style.display = "none";
  }

  submit() {
    login(this.model)
      .then((res) => {
        alert("Đăng nhập thành công");
        store.dispatch("setPlayer", res.data);
        this.closePopup();
      })
      .catch((err) => {
        alert("Đăng nhập thất bại");
        console.log(err);
      });
  }
}
</script>

<style lang="scss" module>
.container {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .popup {
    background-color: #fff;
    position: relative;
    width: 400px;
    height: 350px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #272522;
    color: aliceblue;
    padding: 0 30px;
    & form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & .form-group {
        width: 100%;
        margin-bottom: 20px;
        & label {
          display: block;
          margin-bottom: 5px;
        }
        & input {
          width: 100%;
          height: 40px;
          border: none;
          outline: none;
          background-color: #464340;
          color: aliceblue;
          border-radius: 5px;
          padding: 0 10px;
        }
      }
      & .submit {
        width: 100%;
        height: 40px;
        margin-top: 10px;
        border: none;
        border-radius: 5px;
        background-color: #b58863;
        border: 2px solid #b58863;
        color: aliceblue;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          background-color: #272522;
          color: #b58863;
        }
      }
    }
    & .close {
      position: absolute;
      top: 2px;
      right: 8px;
      border: #f00 solid 2px;
      width: 30px;
      font-weight: 600;
      font-size: 18px;
      height: 30px;
      background-color: #f00;
      color: aliceblue;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #272522;
        color: #f00;
      }
    }
  }
}
</style>

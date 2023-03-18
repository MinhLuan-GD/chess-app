<template>
  <div
    ref="signupPopup"
    id="signup-popup"
    :class="$style.container"
    @click="closePopup"
  >
    <div @click.stop="" :class="$style.popup">
      <div :class="$style.close" @click="closePopup">x</div>
      <form @submit.prevent="signup">
        <div :class="$style['form-group']">
          <label>Email address</label>
          <input v-model="model.email" type="email" placeholder="Enter email" />
        </div>
        <div :class="$style['form-group']">
          <label>Name</label>
          <input
            v-model="model.nickname"
            type="text"
            placeholder="Enter nickname"
          />
        </div>
        <div :class="$style['form-group']">
          <label>Password</label>
          <input
            v-model="model.password"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div :class="$style['form-group']">
          <label>Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
          />
        </div>
        <button type="submit" :class="$style.submit">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { login, signup } from "@/api/player";
import { SignupModel } from "@/models/signup";
import store from "@/store";
import { ref } from "vue";
import { Vue } from "vue-class-component";

export default class PopupSignup extends Vue {
  signupPopup = ref() as unknown as HTMLElement;
  model = new SignupModel();
  confirmPassword = "";

  closePopup() {
    this.signupPopup.style.display = "none";
  }

  signup() {
    if (this.model.password !== this.confirmPassword) {
      alert("Password and confirm password not match");
      return;
    }
    signup(this.model)
      .then((_res) => {
        login({ email: this.model.email, password: this.model.password })
          .then((res) => {
            store.dispatch("setPlayer", res.data);
            alert("Đăng ký thành công");
          })
          .catch((_err) => {
            alert("Đăng nhập thất bại");
          });
      })
      .catch((_err) => {
        alert("Đăng ký thất bại");
      });
    this.closePopup();
  }
}
</script>

<style lang="scss" module>
.container {
  position: absolute;
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  .popup {
    background-color: #fff;
    position: relative;
    width: 400px;
    height: 460px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    background-color: #272522;
    color: aliceblue;
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
        margin-top: 10px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #b58863;
        border: 2px solid #b58863;
        color: aliceblue;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          background-color: #464340;
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
      color: #fff;
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

export class SignupModel {
  email: string;
  password: string;
  nickname: string;

  constructor(email = "", password = "", nickname = "") {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}

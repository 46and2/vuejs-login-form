<template>
  <div class="Login Login_error">
    <div class="Login-Logo Logo">
      <img src="../assets/logo.svg" alt class="Logo-Image" />
    </div>
    <form class="Login-Form Form">
      <div class="Form-Row">
        <label class="Input">
          <input
            v-model="form.login"
            @blur="$v.form.login.$touch()"
            placeholder="Логин"
            type="text"
            class="Input-Control"
          />
        </label>
        <div class="Error Login-Error" v-if="$v.form.login.$error">
          <p
            class="Error-Text Error-Text_icon"
            v-if="!$v.form.login.required"
          >Поле логин обязательно</p>
        </div>
      </div>
      <div class="Form-Row">
        <label class="Input">
          <input
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            placeholder="Пароль"
            type="password"
            class="Input-Control"
          />
        </label>
        <div class="Error Login-Error" v-if="$v.form.password.$error">
          <p
            class="Error-Text Error-Text_icon"
            v-if="!$v.form.password.required"
          >Поле пароль обязательно</p>
        </div>
      </div>
      <div class="Form-Row Form-Row_btnWrap">
        <button
          @click.prevent="handleSubmit"
          :disabled="$v.form.$invalid"
          :class="{Btn_theme_wait:form.loading}"
          class="Btn Form-Btn Btn_theme_blue"
        ></button>
      </div>
      <div class="Form-Row" v-show="form.error">
        <div class="Error Login-Error">
          <p class="Error-Text Error-Text_icon">Неверный логин или пароль.</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { bus } from "../main";

export default {
  name: "LoginForm",
  data() {
    return {
      form: { login: "", password: "", error: false, loading: false }
    };
  },
  methods: {
    handleSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.form.loading = true;
      this.axios
        .post("http://api2.denlam.ru/auth", {
          "oko-data": {
            login: this.form.login,
            password: this.form.password,
            device_datetime: "Asia/Yekaterinburg"
          }
        })
        .then(response => {
          this.form.error = false;
          this.form.loading = false;
          bus.$emit("loginAttempted", {
            success: !this.form.error,
            accessToken: response.data.access_token
          });
          /* eslint-disable no-console */
          console.log(response);
          /* eslint-enable no-console */
        })
        .catch(error => {
          /* eslint-disable no-console */
          console.log(error.toJSON());
          /* eslint-enable no-console */
          this.form.error = true;
          this.form.loading = false;
        });
    }
  },
  validations: {
    form: {
      login: {
        required
      },
      password: {
        required
      }
    }
  }
};
</script>

<style>
.Form-Row {
  margin-bottom: 10px;
}
.Form-Row_btnWrap {
  margin-top: 20px;
}
.Login .Form-Btn {
  width: 100%;
  height: 43px;
}
.Btn[disabled="disabled"],
.Btn_disabled {
  background: #c7c7c7 !important;
  cursor: no-drop;
}
.Form-Btn {
  width: 140px;
  height: 30px;
}
.Btn_theme_blue {
  background-color: #008acc;
  color: #fff;
}
.Btn_theme_blue:after {
  content: "Войти";
}
.Btn_theme_wait {
  background: #c7c7c7 !important;
  font-size: 0;
  line-height: 0;
  position: relative;
  cursor: no-drop;
}
.Btn_theme_wait:after {
  content: "\416\434\438\442\435...";
  font-size: 14px;
  line-height: 14px;
  color: #000;
  cursor: default;
}
.Btn {
  font-size: 14px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
}
.Input {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.Input-Control {
  height: 30px;
  padding-left: 15px;
  background-color: #f8f8f8;
  font-size: 14px;
  border: 1px solid hsla(0, 0%, 77.3%, 0.5);
  border-radius: 3px;
  vertical-align: middle;
}
.Login {
  width: 335px;
  max-width: 335px;
  padding: 80px 40px 30px;
  -webkit-box-shadow: 0 0 172px rgba(59, 61, 130, 0.8);
  box-shadow: 0 0 172px rgba(59, 61, 130, 0.8);
  border-radius: 3px;
  position: relative;
}
.Login,
.Login-Logo {
  background-color: #fff;
}
.Login-Logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: -60px;
  left: calc(50% - 60px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.Error {
  width: 100%;
  padding: 7px 10px;
  background-color: #fce8e8;
  border: 1px solid #ff7f7f;
  border-radius: 3px;
}
.Login-Logo .Logo-Image {
  max-width: 70%;
  max-height: 70%;
}
.Logo-Image {
  max-width: 100%;
  display: block;
}
.Error-Text {
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  line-height: 1;
  color: red;
}
.Error-Text_icon {
  padding-left: 28px;
  position: relative;
}
.Error-Text_icon:before {
  content: "!";
  width: 16px;
  height: 16px;
  background-color: red;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  line-height: 16px;
  border-radius: 100%;
  position: absolute;
  top: -2px;
  left: 0;
}
</style>
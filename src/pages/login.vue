<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img
          src="../assets/cucumber_logo.png"
          alt=""
          width="35"
          height="35"
          style="padding-right: 4px"
        />
        <span>Cucumber Test</span>
      </div>
    </div>
    <div class="main">
      <div class="login-header">
        <span class="login-title">Log in</span>
        <el-divider />
      </div>

      <div class="login-body">
        <form>
          <div class="account-field">
            <label for="account">Account</label>
            <div class="login-form">
              <input
                class="login-input"
                type="text"
                id="account"
                v-model="form.username"
                autocomplete="off"
                required
              />
            </div>
          </div>

          <div class="account-field">
            <label for="password">Password</label>
            <div class="login-form">
              <input
                type="password"
                id="password"
                class="login-input"
                v-model="form.password"
                required
              />
            </div>
          </div>
        </form>

        <div class="login-btn" @click="login()">Log in</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../store";
import { user_login } from "../api/login";
import { ElNotification } from "element-plus";
const router = useRouter();
const useCounter = useCounterStore();
const form = reactive({
  username: "",
  password: "",
});

const login = function () {
  user_login(form)
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        useCounter.setToken(res.data);
        router.push("/home");
      }else{
        ElNotification({
          title: "Error",
          message: res.msg,
          type: "error",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  console.log("login mounted");
  document.body.style.backgroundColor = "#fffefc";
});
</script>

<style scoped>
.header {
  height: 50px;
  position: relative;
}
.logo {
  font-weight: 500px;
  font-size: 17px;
  color: #37352f;

  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  height: 100%;
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

label {
  display: block;
  color: rgba(55, 53, 47, 0.65);
  font-weight: bold;
}

.login-form {
  width: 300px;
  font-size: 15px;
  line-height: 26px;
  padding: 4px 10px;

  border-radius: 4px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
  background: rgba(242, 241, 238, 0.6);
  cursor: text;
  margin-top: 4px;
  margin-bottom: 8px;
}

.login-form:focus-within {
  box-shadow: rgba(35, 131, 226, 0.57) 0px 0px 0px 1px inset,
    rgba(35, 131, 226, 0.35) 0px 0px 0px 2px !important;
}

.login-input {
  font-size: inherit;
  border: none;
  background: none;
  width: 100%;
  display: block;
  resize: none;
  color: inherit;
  font: inherit;
  padding: 0px;
}

.login-input:focus {
  outline: 0;
}
.login-btn {
  width: 320px;
  margin-left: 160px;
  margin-top: 20px;
  transform: translateX(-50%);

  color: #37352f;

  transition: background 20ms ease-in 0s;

  cursor: pointer;
  display: inline-flex;
  align-items: center;

  justify-content: center;

  white-space: nowrap;
  border-radius: 4px;

  height: 32px;

  font-size: 14px;
  line-height: 1.2;
  border: 1px solid rgba(55, 53, 47, 0.16);
}

.login-btn:hover {
  background: rgb(225, 225, 225);
}
.login-title {
  color: #37352f;
  font-size: 30px;
  font-weight: bold;
}

.login-header {
  width: 320px;
  text-align: center;
}

.login-body {
  width: 320px;
}

.account-field {
  margin-top: 20px;
  color: #37352f;
}

:deep(.el-divider--horizontal) {
  margin-top: 8px;
  margin-bottom: 15px;
}
</style>
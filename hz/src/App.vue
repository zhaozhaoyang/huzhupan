<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.s_1 {
  width: 100%;
  background: transparent;
  height: .2rem;
}
.s_2 {
  width: 100%;
  background: transparent;
  height: .4rem;
}
.s_3 {
  width: 100%;
  background: transparent;
  height: .6rem;
}
.s_4 {
  width: 100%;
  background: transparent;
  height: .8rem;
}
.s_5 {
  width: 100%;
  background: transparent;
  height: 1rem;
}
.s_6 {
  width: 100%;
  background: transparent;
  height: 1.2rem;
}
.s_7 {
  width: 100%;
  background: transparent;
  height: 1.4rem;
}.s_8 {
  width: 100%;
  background: transparent;
  height: 1.6rem;
}
.s_9{
  width: 100%;
  background: transparent;
  height: 1.8rem;
}
dl,
dd {
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  font-weight: normal;
}
em,
b {
  font-style: normal;
}
input[type="button"],
input[type="reset"],
input[type="submit"],
button,
select {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  padding: 0;
  margin: 0;
  outline: none;
}
button {
  border: none;
}
/* input::-webkit-input-placeholder{white-space:normal;font-size:1.4rem;} */
input[disabled] {
  background-color: transparent;
}
a {
  text-decoration: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  color: #222;
}
button:focus,
input:focus {
  outline: none;
}
body{
  font-size:.28rem;
}
/* .van-overlay{
  background-color:transparent;
} */
.van-dialog{
  border:1px solid #f3f3f3;
  box-shadow:4px 4px 5px 1px rgba(0,0,0,.2)
}
.van-image-preview{
  background-color:rgba(0,0,0,.4)
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

# Saiyan-UI 是什么
一个Mini版的组件库，基于Vite栈。
## Features

- ⚡️ Vue 3, Vite 2, pnpm, ESBuild - born with fastness
- 🦾 TypeScript, of course
- 🗂 File based routing
- ⚙️ Unit Testing with Vitest
- 😃 Eslint + Prittier
- 🎨 UnoCSS - the instant on-demand atomic CSS engine
- 🌍 I18n ready
- 🚘 CI/CD with GithubActions

## 安装
使用 npm 的方式安装
```bash
npm i saiyan-ui
```

## 快速上手
在 main.js 写入以下内容

```js
    import Vue from 'vue'
    import SaiyanUI from 'saiyan-ui'


    createApp(App)
        .use(SaiyanUI)
        .mount("#app");

```
## 开始使用
在 main.js 写入以下内容

```vue
<template>
  <SButton color="blue">主要按钮</SButton>
</template>

```

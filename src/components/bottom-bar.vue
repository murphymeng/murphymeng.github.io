<template>
  <van-tabbar @change="onChange" v-model="active">
    <van-tabbar-item icon="home-o">今天</van-tabbar-item>
    <van-tabbar-item icon="bars">任务</van-tabbar-item>
    <van-tabbar-item icon="clock-o">历史</van-tabbar-item>
    <van-tabbar-item icon="smile-o">奖励</van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import router from '../router';
import { useRoute } from 'vue-router';

const route = useRoute()
const active = ref(0)
if (route.name === 'home') {
  active.value = 0
} else if (route.name === 'habit-list' || route.name === 'add-habit' || route.name === 'edit-habit') {
  active.value = 1
} else if (route.name === 'habit-history') {
  active.value = 2
} else if (route.name === 'reward-list' || route.name === 'add-reward' || route.name === 'edit-reward') {
  active.value = 3
}
const onChange = (value) => {
  active.value = value
  if (value === 0) {
    router.push({
      name: 'home',
    })
  } else if (value === 1) {
    router.push({
      name: 'habit-list',
    })
  } else if (value === 2) {
    router.push({
      name: 'habit-history',
    })
  } else if (value === 3) {
    router.push({
      name: 'reward-list',
    })
  }

}
</script>
<template>
  <van-button block size="small" type="primary" @click="onAddHabit">添加</van-button>
</template>
<script setup lang="ts">
import router from '@/router.ts'

const onAddHabit = () => {
  router.push({
    name: 'add-habit'
  })
}

</script>
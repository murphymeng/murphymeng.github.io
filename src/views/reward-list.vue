<template>
  <van-cell-group>
    <van-cell v-for="reward in rewardList" :title="`${reward.name}(剩余${reward.number}次)`" :value="reward.name">
      <van-space>
        <van-button :disabled="reward.number <= 0" type="primary" size="small" @click="use(reward)">使用</van-button>
        <van-button type="primary" size="small" @click="edit(reward)">编辑</van-button>
        <van-button type="primary"  size="small" @click="remove(reward)">删除</van-button>
      </van-space>
    </van-cell>
  </van-cell-group>
  <div style="padding: 10px">
    <van-button block size="small" type="primary" @click="onAddReward">添加</van-button>
  </div>
  
<bottom-bar />
</template>
<script type="ts" setup>
import BottomBar from '@/components/bottom-bar.vue'
import { useStorage } from '@vueuse/core'
import router from '@/router.ts'

const rewardList = useStorage('rewardList', [])

const remove = (reward) => {
  rewardList.value = rewardList.value.filter((item) => item.name !== reward.name)
}

const use = (reward) => {
  reward.number = reward.number - 1
}

const onAddReward = () => {
  router.push({
    name: 'add-reward'
  })
}

const edit = (reward) => {
  router.push({
    name: 'edit-reward',
    params: {
      name: reward.name 
    }
  })
}
</script>
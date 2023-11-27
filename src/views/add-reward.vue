<template>
  <van-form ref="vanFormRef">
    <van-cell-group inset>
      <van-field :rules="[{required: true, message: '必填'}]" v-model="formData.name" label="奖励名" placeholder="请输入" />
      <van-field type="number" :rules="[{required: true, message: '必填'}]" v-model="formData.number" label="数量" placeholder="请输入" />
      <!-- <van-field :rules="[{required: true, message: '必填'}]" v-model="formData.color" label="颜色" placeholder="请输入" /> -->
    </van-cell-group>
  </van-form>
  <div style="margin: 16px;">
    <van-button @click="savereward" round block type="primary" native-type="submit">
      保存
    </van-button>
  </div>
  <bottom-bar />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { showDialog } from 'vant';
import BottomBar from '@/components/bottom-bar.vue'
import router from '../router';
import { useRoute } from 'vue-router';

const initialFormData = {
  name: '',
  number: 0,
}

const route = useRoute()
const rewardList = useStorage('rewardList', []) // returns Ref<boolean>
const editReward = route.name === 'edit-reward' ? rewardList.value.find(r => r.name === route.params.name) : null
const formData = route.name === 'edit-reward' ? ref({...initialFormData, ...editReward}) : ref(initialFormData)

const vanFormRef = ref(null)
const savereward = async () => {
  await vanFormRef.value.validate()
  
  const found = rewardList.value.find(d => {
    return d.name === formData.value.name
  })
  if (found){
    showDialog({
      message: '奖励名重复',
      theme: 'round-button',
    })
    return
  }
  rewardList.value = rewardList.value.concat({...formData.value})
  router.push({
    name: 'reward-list'
  })
}
</script>
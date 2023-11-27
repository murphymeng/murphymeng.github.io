<template>
  <van-form ref="vanFormRef">
    <van-cell-group inset>
      <van-field :rules="[{required: true, message: '必填'}]" v-model="formData.name" label="习惯名" placeholder="请输入" />
      <!-- <van-field :rules="[{required: true, message: '必填'}]" label="颜色" placeholder="请输入">
        <template #input>
          
        </template>
      </van-field> -->
      <van-field :rules="[{required: true, message: '必填'}]" v-model="formData.color" label="颜色" placeholder="请输入">
      </van-field>

      <van-field name="switch" label="关联奖励">
        <template #input>
          <van-switch v-model="formData.isRelatedToReword" />
        </template>
      </van-field>
      <template v-if="formData.isRelatedToReword">
        <van-field
          :rules="[{required: true, message: '必填'}]"
          v-model="formData.reward"
          is-link
          readonly
          name="picker"
          label="奖励"
          placeholder="点击选择奖励"
          @click="showRewardPicker = true"
        />
        <van-field type="number" :rules="[{required: true, message: '必填'}]" v-model="formData.habitCountForReward" label="需习惯数完成次数" placeholder="请输入" />
        <van-popup v-model:show="showRewardPicker" position="bottom">
          <van-picker
            :columns="columns"
            @confirm="onConfirmReward"
            @cancel="showRewardPicker = false"
          />
        </van-popup>
      </template>
    </van-cell-group>
  </van-form>
  <div style="margin: 16px;">
    <van-button @click="saveHabit" round block type="primary" native-type="submit">
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
import { Twitter } from '@ckpack/vue-color';
const route = useRoute()
const name = route.params.name
let editHabit
const habitList = useStorage('habitList', [])
if (route.name === 'edit-habit') {
  editHabit = habitList.value.find(d => d.name === name)
}
const initialFormData = {
  name: '',
  color: '',
  isRelatedToReword: false,
  reward: '',
  habitCountForReward: 0
}
const formData = editHabit ? ref({...initialFormData,...editHabit}) : ref(initialFormData)
const rewardList = useStorage('rewardList', []) // returns Ref<boolean>

const columns = rewardList.value.map(d => {
  return {
    text: d.name,
    value: d.name
  }
})

const vanFormRef = ref(null)
const showRewardPicker = ref(false)

const onConfirmReward = ({ selectedOptions }) => {
  formData.value.reward = selectedOptions[0]?.text;
  showRewardPicker.value = false;
}

const saveHabit = async () => {
  await vanFormRef.value.validate()
  const habitList = useStorage('habitList', []) // returns Ref<boolean>
  const found = habitList.value.find(d => {
    return d.name === formData.value.name
  })
  if (found && route.name === 'add-habit'){
    showDialog({
      message: '习惯名重复',
      theme: 'round-button',
    })
    return
  }
  if (route.name === 'add-habit') {
    habitList.value = habitList.value.concat({...formData.value})
  } else if (route.name === 'edit-habit') {
    const idx = habitList.value.findIndex(d => d.name === editHabit.name)
    habitList.value[idx] = formData.value
  }
  
  router.push({
    name: 'habit-list'
  })
}

</script>
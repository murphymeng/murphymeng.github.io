<template>
  <!-- <add-habit-button /> -->
  <!-- <van-checkbox-group @change="onChange" style="margin-top: 20px" v-model="checked" shape="square">
    <van-cell :key="habit.name" v-for="habit in habitList">
      <van-checkbox @change="onCheckChange" :name="habit.name">{{ habit.name }}</van-checkbox>
    </van-cell>
  </van-checkbox-group> -->
  <!-- {{ rewardList }} -->
  <van-cell :key="habit.name" v-for="habit in habitList">
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <template #title>
      <div class="flex">
        <div class="color-circle" :style="`background-color: ${habit.color}`"></div>
        <div>{{ habit.name }}</div>
      </div>

    </template>
    <template  #right-icon>
      <van-button size="small" type="primary"   @click="onChange(habit)">
        <template v-if="!checked.includes(habit.name)">打卡</template>
        <template v-else>取消打卡</template>
      </van-button>
    </template>
  </van-cell>
  <bottom-bar />
  <!-- <van-calendar
  title="Calendar"
  :poppable="false"
  :show-confirm="false"
  :style="{ height: '500px' }"
/> -->
</template>
<script setup lang="ts">
import router from '@/router.ts'
import { useStorage } from '@vueuse/core'
import { Calendar } from 'vant';
import {ref} from 'vue'
import dayjs from 'dayjs'
import BottomBar from '@/components/bottom-bar.vue'
import AddHabitButton from './add-habit-button.vue'

const show = ref(true)
const habitList = useStorage('habitList', [])
const dateMapChecked = useStorage('dateMapChecked', {})
const todayStr = dayjs().format('YYYY-MM-DD')
const checked = ref(dateMapChecked.value[todayStr] || [])
const active = ref(null)
const rewardList = useStorage('rewardList', [])
const onConfirm = () => {

}

const onCheckChange = (value) => {
    console.log(value)
}

const onChange = habit => {
  const reward = rewardList.value.find(r => r.name === habit.reward)
  if (checked.value.includes(habit.name)) {
    checked.value = checked.value.filter(item => item !== habit.name)
    if (reward) {
      reward.number = reward.number - 1
    }
  } else {
    checked.value.push(habit.name)
    if (reward) {
      reward.number = reward.number + 1
    }
  }
  dateMapChecked.value[todayStr] = checked.value
}
</script>
<style lang="less">
.flex {
  display: flex;
  align-items: center;
}
.color-circle {
  margin-right: 12px;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  background: red;
}
</style>
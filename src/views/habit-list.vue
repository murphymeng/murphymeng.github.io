<template>
    <van-cell-group>
      <van-cell v-for="habit in habitList" :title="habit.name" :value="habit.name">
        <van-space>
          <van-button type="primary" size="small" @click="edit(habit)">编辑</van-button>
          <van-button type="primary"  size="small" @click="remove(habit)">删除</van-button>
        </van-space>
      </van-cell>
    </van-cell-group>
    <div style="padding: 10px">
      <add-habit-button />
    </div>
    
  <bottom-bar />
</template>
<script type="ts" setup>
import BottomBar from '@/components/bottom-bar.vue'
import { useStorage } from '@vueuse/core'
import AddHabitButton from './add-habit-button.vue'
import router from '@/router.ts'

const habitList = useStorage('habitList', [])

const dateMapChecked = useStorage('dateMapChecked', {})


const remove = (habit) => {
  habitList.value = habitList.value.filter((item) => item.name !== habit.name)
  for (const key in dateMapChecked.value) {
    dateMapChecked.value[key] = dateMapChecked.value[key].filter(item => item !== habit.name)
  }
}

const edit = (habit) => {
  router.push({
    name: 'edit-habit',
    params: {
      name: habit.name 
    }
  })
}
</script>
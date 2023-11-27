<template>
  <VCalendar style="width: 100%" :attributes="attributes" borderless />
  <div></div>
  <bottom-bar />
</template>
<script setup lang="ts">
import BottomBar from '@/components/bottom-bar.vue'
import { useStorage } from '@vueuse/core';
import dayjs from 'dayjs';
import { onMounted } from 'vue';
import {ref} from 'vue'
const minDate = dayjs().add(-2, 'month').toDate()
const maxDate = new Date()
const habitList = useStorage('habitList', [])
const dateMapChecked = useStorage('dateMapChecked', {})
const attributes = ref([])

const getHabitColor = (habitName) => {
  const found = habitList.value.find(d => d.name === habitName)
  return found?.color
}

onMounted(() => {
  Object.keys(dateMapChecked.value).forEach(day => {
    dateMapChecked.value[day].forEach(habit => {
      const found = attributes.value.find(d => d.habit === habit)
      if (found) {
        found.dates.push(new Date(day))
      } else {
        attributes.value.push({
          habit,
          dot: getHabitColor(habit),
          dates: [new Date(day)]
        })
      }
    })
  })
})


</script>
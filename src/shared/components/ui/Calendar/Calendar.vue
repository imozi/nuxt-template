<script setup lang="ts">
import { useCalendar } from './composables/useCalendar';

const { days, daysWeek, selected, months, actions, currentMonth, currentYear, years, isPrev, isNext } = useCalendar();
</script>

<template>
  <div class="my-5 grid grid-cols-25 gap-5">
    <div v-for="year of years" :key="year.value" class="">
      <Button :class="{ 'bg-blue-400': year.selected }" @click="actions.setYear(year)">{{ year.value }}</Button>
    </div>
  </div>
  <div class="flex gap-5">
    <div v-for="month of months" :key="month.value">
      <Button class="month" :class="{ 'bg-blue-400': month.selected }" @click="actions.setMonth(month)">{{ month.label }}</Button>
    </div>
  </div>
  <div class="calendar">
    <div class="my-5 font-medium">{{ selected ? selected : 'Дата не выбрана' }}</div>
    <div class="font-extrabold">{{ currentMonth }} {{ currentYear }}</div>
    <div class="my-5 flex gap-5">
      <Button :disabled="!isPrev" :class="{ 'bg-red-500': !isPrev }" @click="actions.prevMonth">prev</Button>
      <Button :disabled="!isNext" :class="{ 'bg-red-500': !isNext }" @click="actions.nextMonth">next</Button>
    </div>
    <div class="grid grid-cols-7">
      <div v-for="day of daysWeek" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>
    <div class="grid grid-cols-7">
      <Button
        v-for="item in days"
        :key="item.origin.toString()"
        :class="{
          'text-gray-400': item.position !== 'current',
          'text-black': item.position === 'current',
          'text-red-500': item.weekend,
          'bg-purple-100': item.today,
          'bg-purple-600': item.selected,
          'text-slate-200': item.disabled,
        }"
        @click="actions.select(item)"
      >
        {{ item.day }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.weekday,
.month {
  text-transform: capitalize;
}
</style>

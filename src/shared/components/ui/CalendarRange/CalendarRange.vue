<script setup lang="ts">
import { useCreateRangeCalendar } from './composables/useCreateRangeCalendar';

type CalendarProps = {
  minDate?: string;
  maxDate?: string;
};

const date = defineModel<{ from: string | null; to: string | null }>('value', {
  default: { from: null, to: null },
  required: false,
});
const props = defineProps<CalendarProps>();

const {
  days,
  daysWeek,
  selected,
  months,
  actions,
  currentMonth,
  currentYear,
  years,
  isPrevMonth,
  isNextMonth,
  isPrevYear,
  isNextYear,
} = useCreateRangeCalendar({
  minDate: props.minDate,
  maxDate: props.maxDate,
  defaultValue: date.value,
});

watch(
  () => selected.value.to,
  () => {
    date.value.from = (selected.value.from && selected.value.from.toString()) || null;
    date.value.to = (selected.value.to && selected.value.to.toString()) || null;
  },
);
</script>

<template>
  <div class="m-5 border p-5">
    <div class="my-5 grid grid-cols-25 gap-5">
      <div v-for="year of years" :key="year.value" class="">
        <Button :class="{ 'bg-blue-400': year.selected }" @click="actions.setYear(year)">{{ year.value }}</Button>
      </div>
    </div>
    <div class="flex gap-5">
      <div v-for="month of months" :key="month.value">
        <Button
          class="month"
          :class="{ 'bg-blue-400': month.selected, 'bg-red-400': month.disabled }"
          @click="actions.setMonth(month)"
        >
          {{ month.label }}
        </Button>
      </div>
    </div>
    <div class="calendar">
      <div class="my-5 font-medium">
        {{ selected.from ? `${selected.from} - ${selected.to}` : 'Дата не выбрана' }}
      </div>
      <div class="font-extrabold">{{ currentMonth }} {{ currentYear }}</div>
      <div class="my-5 flex gap-5">
        <Button :class="{ 'bg-red-500': !isPrevYear }" @click="actions.prevYear">prev year</Button>
        <Button :class="{ 'bg-red-500': !isPrevMonth }" @click="actions.prevMonth">prev month</Button>
        <Button :class="{ 'bg-red-500': !isNextMonth }" @click="actions.nextMonth">next month</Button>
        <Button :class="{ 'bg-red-500': !isNextYear }" @click="actions.nextYear">prev year</Button>
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
            'bg-purple-600': item.isStart || item.isEnd,
            'bg-purple-200': item.inRange,
            'text-slate-200': item.disabled,
          }"
          @click="actions.select(item)"
        >
          {{ item.day }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weekday,
.month {
  text-transform: capitalize;
}
</style>

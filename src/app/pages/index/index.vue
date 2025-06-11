<script setup lang="ts">
const single = ref('');
const multiple = ref([]);
const range = ref({ from: null, to: null });

const mode = ref('single');
</script>

<template>
  <DialogProvider>
    <DialogTrigger />
    <DialogOverlay />
    <DialogPortal>
      <DialogRoot>
        <DialogContent>
          <DialogHeader>
            <Placeholder class="h-14" />
          </DialogHeader>

          <Placeholder picture />

          <DialogFooter>
            <Placeholder class="h-14" />
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </DialogPortal>
  </DialogProvider>

  <div class="mx-3 flex gap-5">
    <Button @click="() => (mode = 'single')">single</Button>
    <Button @click="() => (mode = 'multiple')">multiple</Button>
    <Button @click="() => (mode = 'range')">range</Button>
  </div>

  <div v-if="mode === 'single'" class="">
    <Calendar v-model:date="single" min-date="2024-01-01" max-date="2027-12-31" mode="single" />
  </div>
  <div v-if="mode === 'multiple'" class="">
    <CalendarMultiple v-model:date="multiple" min-date="2024-01-01" max-date="2027-12-31" mode="multiple" />
  </div>
  <div v-if="mode === 'range'" class="">
    <CalendarRange v-model:date="range" min-date="2024-01-01" max-date="2027-12-31" mode="range" />
  </div>
</template>

<style lang="scss"></style>

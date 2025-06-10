<script setup lang="ts">
const single = ref('');
const multiple = ref([]);
const range = ref({ from: null, to: null });
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

  <Calendar v-model:date="single" min-date="2024-01-01" max-date="2027-12-31" mode="single" />
  <Calendar v-model:date="multiple" min-date="2024-01-01" max-date="2027-12-31" mode="multiple" />
  <Calendar v-model:date="range" min-date="2024-01-01" max-date="2027-12-31" mode="range" />
</template>

<style lang="scss"></style>

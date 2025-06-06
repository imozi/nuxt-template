<script setup lang="ts">
const date = ref('2025-06-04');
</script>

<template>
  <DialogProvider>
    <DialogTrigger>Open - {{ date }}</DialogTrigger>
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

  <Calendar v-model:date="date" min-date="2023-01-01" max-date="2027-12-31" />
</template>

<style lang="scss"></style>

<script setup lang="ts"></script>

<template>
  <DialogProvider>
    <DialogTrigger>Open</DialogTrigger>
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
</template>

<style lang="scss"></style>

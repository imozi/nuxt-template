<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface PlaceholderProps {
  picture?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<PlaceholderProps>();
</script>

<template>
  <div :class="cn('relative w-full overflow-hidden rounded-sm border-black/10 text-black', props.class)">
    <div class="h-full w-full rounded-[inherit] border border-dashed border-inherit">
      <svg class="absolute inset-0 h-full w-full" fill="none" stroke="currentColor">
        <defs>
          <pattern id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)" fill-opacity="0.1" width="100%" height="100%"></rect>
      </svg>
      <svg
        v-if="props.picture"
        class="relative z-10 h-full w-full"
        viewBox="0 0 800 800"
        fill="none"
        fill-opacity="0.2"
        stroke-opacity="0.2"
      >
        <g id="lines" stroke-opacity="inherit" stroke-width="2.5">
          <path d="M551.375 552.739L245.911 247.277" stroke="url(#paint0_linear_696_70)" />
          <path d="M245.91 552.74L551.373 247.277" stroke="url(#paint1_linear_696_70)" />
          <path d="M210.003 399.993L589.999 399.992" stroke="url(#paint2_linear_696_70)" />
          <path d="M399.998 209.998L399.998 589.992" stroke="url(#paint3_linear_696_70)" />
          <path d="M399.998 209.998L399.998 589.992" stroke="url(#paint3_linear_696_70)" />
        </g>

        <g id="circle" fill="white">
          <path
            d="M399.199 505.838C340.318 505.838 292.586 458.106 292.586 399.226C292.586 340.345 340.318 292.613 399.199 292.613C458.079 292.613 505.811 340.345 505.811 399.226C505.811 458.106 458.079 505.838 399.199 505.838Z"
            stroke="currentColor"
            stroke-width="2.5"
            fill="inherit"
            fill-opacity="inherit"
            stroke-opacity="inherit"
          />
          <path
            d="M399.196 443.569C374.706 443.569 354.853 423.716 354.853 399.226C354.853 374.736 374.706 354.883 399.196 354.883C423.686 354.883 443.539 374.736 443.539 399.226C443.539 423.716 423.686 443.569 399.196 443.569Z"
            stroke="currentColor"
            stroke-width="2.5"
            fill="inherit"
            fill-opacity="1"
            stroke-opacity="inherit"
          />
        </g>

        <g id="icon" fill-opacity="0.3" fill="currentColor">
          <path
            d="M409.491 393.682C409.491 394.521 409.158 395.325 408.565 395.918C407.972 396.511 407.168 396.845 406.329 396.845C405.49 396.845 404.685 396.511 404.092 395.918C403.499 395.325 403.166 394.521 403.166 393.682C403.166 392.843 403.499 392.039 404.092 391.446C404.685 390.853 405.49 390.52 406.329 390.52C407.168 390.52 407.972 390.853 408.565 391.446C409.158 392.039 409.491 392.843 409.491 393.682Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M399.911 383.005H400.091C403.743 383.005 406.603 383.005 408.836 383.306C411.12 383.613 412.923 384.255 414.338 385.668C415.753 387.084 416.394 388.886 416.701 391.171C417.001 393.403 417.001 396.263 417.001 399.914V400.054C417.001 403.072 417.001 405.542 416.837 407.554C416.672 409.578 416.335 411.265 415.579 412.669C415.248 413.287 414.834 413.844 414.338 414.341C412.923 415.756 411.12 416.397 408.835 416.703C406.603 417.004 403.743 417.004 400.091 417.004H399.911C396.259 417.004 393.399 417.004 391.166 416.703C388.882 416.397 387.079 415.755 385.664 414.341C384.41 413.087 383.762 411.526 383.418 409.587C383.078 407.685 383.017 405.318 383.004 402.38C383.002 401.631 383.001 400.84 383.001 400.005V399.913C383.001 396.262 383.001 393.401 383.301 391.168C383.608 388.885 384.25 387.082 385.664 385.667C387.079 384.252 388.882 383.611 391.167 383.304C393.399 383.004 396.259 383.004 399.911 383.004M391.482 385.654C389.461 385.926 388.242 386.445 387.342 387.345C386.441 388.246 385.923 389.464 385.651 391.486C385.376 393.542 385.373 396.243 385.373 400.003V401.338L386.956 399.952C387.65 399.345 388.55 399.024 389.472 399.054C390.394 399.085 391.271 399.465 391.923 400.117L398.707 406.901C399.234 407.427 399.929 407.751 400.671 407.815C401.412 407.879 402.153 407.68 402.762 407.252L403.233 406.92C404.112 406.302 405.174 406.001 406.246 406.066C407.319 406.131 408.337 406.557 409.135 407.276L413.61 411.303C414.063 410.358 414.33 409.115 414.472 407.361C414.627 405.455 414.629 403.08 414.629 400.003C414.629 396.243 414.626 393.542 414.351 391.486C414.079 389.464 413.56 388.244 412.66 387.343C411.759 386.443 410.541 385.926 408.518 385.654C406.463 385.379 403.762 385.376 400.001 385.376C396.24 385.376 393.538 385.379 391.482 385.654Z"
          />
        </g>
        <defs>
          <linearGradient id="paint0_linear_696_70" x1="246.359" y1="246.299" x2="552.353" y2="552.29" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor" stop-opacity="0" />
            <stop offset="0.208" stop-color="currentColor" />
            <stop offset="0.792" stop-color="currentColor" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_696_70" x1="552.352" y1="247.725" x2="246.362" y2="553.72" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor" stop-opacity="0" />
            <stop offset="0.208" stop-color="currentColor" />
            <stop offset="0.792" stop-color="currentColor" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint2_linear_696_70" x1="590.329" y1="400.879" x2="209.674" y2="400.882" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor" stop-opacity="0" />
            <stop offset="0.451753" stop-color="currentColor" />
            <stop offset="0.553309" stop-color="currentColor" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint3_linear_696_70" x1="399.111" y1="590.322" x2="399.108" y2="209.669" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor" stop-opacity="0" />
            <stop offset="0.451753" stop-color="currentColor" />
            <stop offset="0.553309" stop-color="currentColor" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<style lang="scss"></style>

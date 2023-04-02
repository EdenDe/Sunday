<template>
  <button id="run">Run</button>
</template>

<script>
import { confetti } from 'https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm'

export default {
  name: 'Confetti',
  data() {
    return {
      count: 200,
      defaults: {
        origin: { y: 0.7 },
      },
    }
  },
  methods: {
    run() {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      })

      fire(0.2, {
        spread: 60,
      })

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      })

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      })

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      })
    },
    fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      )
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>

<style></style>

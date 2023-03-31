import { svgService } from './services/svg.service'

export const icon = {
  mounted: (el, binding) => {
    const icon = svgService.getMainMondaySvg(binding.value)
    el.innerHTML = icon
  },
}

// export const clickOutside = {
// 	mounted(el, { value: cb }) {
// 		el.clickOutside = ev => {
// 			if (!el.contains(ev.target)) {
// 				cb()
// 			}
// 		}
// 		setTimeout(() => {
// 			document.addEventListener('click', el.clickOutside)
// 		}, 0)
// 	},
// 	unmounted(el) {
// 		document.removeEventListener('click', el.clickOutside)
// 	},
// }

export const focus = {
  mounted: (el) => el.focus(),
}

export const clickOutside = {
  mounted(el, { value: cb }) {
    el.clickOutside = ({ clientX, clientY }) => {
      console.log(cb)
      const { left, top, width, height } = el.getBoundingClientRect()
      if (
        !(
          clientX > left &&
          clientX < left + width &&
          clientY > top &&
          clientY < top + height
        )
      ) {
        cb()
        // console.log('outside')
        // console.log(el)
      } else {
        // console.log('inside')
      }
    }
    setTimeout(() => {
      document.addEventListener('click', el.clickOutside)
    }, 0)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutside)
  },
}

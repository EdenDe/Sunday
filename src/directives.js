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

export const clickOutside = {
<<<<<<< HEAD
	mounted(el, { value: cb }) {
		el.clickOutside = ({ clientX, clientY }) => {
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
=======
  mounted(el, { value: cb }) {
    el.clickOutside = (ev) => {
      if (!el.contains(ev.target)) {
        cb()
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

export const focus = {
  mounted: (el) => {
    el.focus()
  },
>>>>>>> 7cd3c77ff66984467e8e576661055e952c36e2b9
}

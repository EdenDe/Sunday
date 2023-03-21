import { svgService } from './services/svg.service'

export const icon = {
	mounted: (el, binding) => {
		const icon = svgService.getMainMondaySvg(binding.value)
		el.innerHTML = icon
	},
}

export const utilService = {
	makeId,
	makeLorem,
	getRandomIntInclusive,
	debounce,
	randomPastTime,
	saveToStorage,
	loadFromStorage,
	formatDateRange,
	getDaysBetween,
	getRandomColor,
	getDaysBetweenNumber,
}

function makeId(length = 6) {
	var txt = ''
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(
			Math.floor(Math.random() * possible.length)
		)
	}

	return txt
}

function getRandomColor() {
	var letters = '0123456789ABCDEF'
	var color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 14)]
	}
	return color
}

function makeLorem(size = 100) {
	var words = [
		'The sky',
		'above',
		'the port',
		'was',
		'the color of television',
		'tuned',
		'to',
		'a dead channel',
		'.',
		'All',
		'this happened',
		'more or less',
		'.',
		'I',
		'had',
		'the story',
		'bit by bit',
		'from various people',
		'and',
		'as generally',
		'happens',
		'in such cases',
		'each time',
		'it',
		'was',
		'a different story',
		'.',
		'It',
		'was',
		'a pleasure',
		'to',
		'burn',
	]
	var txt = ''
	while (size > 0) {
		size--
		txt += words[Math.floor(Math.random() * words.length)] + ' '
	}
	return txt
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function getDaysBetween(timestamps) {
	const [startTimestamp, endTimestamp] = timestamps
	const diffTime = Math.abs(endTimestamp - startTimestamp)
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	return `${diffDays}d`
}

function getDaysBetweenNumber(timestamps) {
	const [startTimestamp, endTimestamp] = timestamps
	const diffTime = endTimestamp - startTimestamp
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	return diffDays
}

function randomPastTime() {
	const HOUR = 1000 * 60 * 60
	const DAY = 1000 * 60 * 60 * 24
	const WEEK = 1000 * 60 * 60 * 24 * 7

	const pastTime = getRandomIntInclusive(HOUR, WEEK)
	return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}
function formatDateRange(timestamps) {
	const [startTimestamp, endTimestamp] = timestamps

	const startDate = new Date(startTimestamp)
	const endDate = new Date(endTimestamp)

	const startMonth = startDate.toLocaleString('en', {
		month: 'short',
	})
	const endMonth = endDate.toLocaleString('en', { month: 'short' })

	const startYear = startDate.getFullYear().toString().substr(-2)
	const endYear = endDate.getFullYear().toString().substr(-2)

	let formattedRange = ''

	if (startYear !== endYear) {
		// Dates span across multiple years
		formattedRange = `${startMonth} ${startDate.getDate()} '${startYear} - ${endMonth} ${endDate.getDate()} '${endYear}`
	} else if (
		startYear !== new Date().getFullYear().toString().substr(-2)
	) {
		// Dates are in the same year but not the current year
		formattedRange = `${startMonth} ${startDate.getDate()}-${endDate.getDate()} '${startYear}`
	} else if (startMonth === endMonth) {
		// Dates are in the same month and year
		formattedRange = `${startMonth} ${startDate.getDate()}-${endDate.getDate()}`
	} else {
		// Dates are in different months in the same year
		formattedRange = `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}`
	}

	return formattedRange
}

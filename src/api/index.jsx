import * as EV from './base'


const MATRIX_BASE_URL = EV.MATRIX_BASE_URL

function showHelp() {
	return {
		type: EV.DYNO_SHOW_HELP
		, data: {}
	}
}

function hideHelp() {
	return {
		type: EV.DYNO_HIDE_HELP
		, data: {}
	}
}


export default {
}

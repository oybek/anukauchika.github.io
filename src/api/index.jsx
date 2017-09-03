import * as EV from './base'

import ga from 'react-ga'
ga.initialize('UA-105707541-1')

const stat = {
	main: function () { ga.pageview("main"); }
	, quiz: function (id) { ga.pageview(id); }
}

export default {
	stat: stat
}

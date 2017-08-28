import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import Start from './view/start.jsx'
import Quiz from './view/quiz.jsx'

export default (
	<Router history={hashHistory} >
		<Route path="/" component={Start} />
		<Route path=":id" component={Quiz} />
	</Router>
)

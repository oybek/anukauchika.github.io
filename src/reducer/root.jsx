import { combineReducers } from 'redux'
import * as EV from '../api/base'

import quizmap from '../quizmap.json'


const app = {
	quizList: Object.keys(quizmap).map(k => ({ ...quizmap[k], id: k }))
	, quizMap: quizmap
}

function quizListReducer(state = app.quizList, action) {
	switch (action.type) {
	}
	return state
}

function quizMapReducer(state = app.quizMap, action) {
	switch (action.type) {
	}
	return state
}

export default combineReducers({
	quizList: quizListReducer
	, quizMap: quizMapReducer
})

import React from 'react'
import {
	Label, Table, Input, Accordion, Icon, Feed
	, List, Card, Container, Grid 
	, Image, Button, Dropdown, Segment, Header, Checkbox
	, Message, Dimmer, Sidebar, Menu, Divider
} from 'semantic-ui-react'
import { Link } from 'react-router';
import { connect } from 'react-redux'

import api from '../api'
import QuizList from './quizlist'


class Start extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		api.stat.main()
	}

	render() {
		return (
			<Container fluid >
				<QuizList />
			</Container>
		)
	}

}

export default Start

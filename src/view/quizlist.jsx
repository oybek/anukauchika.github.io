import React from 'react'
import {
	Label, Table, Input, Accordion, Icon, Feed
	, List, Card, Container, Grid 
	, Image, Button, Dropdown, Segment, Header, Checkbox
	, Message, Dimmer, Sidebar, Menu, Divider
} from 'semantic-ui-react'
import { Link } from 'react-router';
import { connect } from 'react-redux'

import styles from './quizlist.scss'

const COLOR_OK = 'blue'
const COLOR_NO = 'orange'
const HEADER_COLOR = 'blue'


function randWidth() {
	return Math.floor(Math.random() * 4) + 2;
}


class QuizList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		}
	}

	go(id) {
		window.location = "#" + id
	}

	render() {
		const list = this.props.quizList
		return (
			<Container fluid >

				<Segment inverted secondary color={HEADER_COLOR} textAlign="center" >
					<Header as="h1">ANUKA UCHIKA</Header>
				</Segment>

				<Divider hidden />
				<Divider hidden />

				<Grid padded stackable >
				{ list.map( (q, idx) =>
					<Grid.Column key={idx} width={2} >
						<Segment textAlign="center" className="quiz-card" onClick={this.go.bind(this, q.id)} >
							<Header as="h2" icon>
								{q.desc}
							</Header>
							<Divider />
							<Container fluid textAlign="left">
							{q.tags.map(t => 
								<Label key={t} size="medium" color="green" >{t}</Label>
							)}
							</Container>
						</Segment>
					</Grid.Column>
				)}
				</Grid>
			</Container>
		)
	}

}

function mapper(state, props) {
	return {
		quizList: state.quizList
	}
}

export default connect(mapper)(QuizList)

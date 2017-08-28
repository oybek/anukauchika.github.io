import React from 'react'
import {
	Label, Table, Input, Accordion, Icon, Feed
	, List, Card, Container, Grid 
	, Image, Button, Dropdown, Segment, Header, Checkbox
	, Message, Dimmer, Sidebar, Menu, Divider, Statistic, Progress
} from 'semantic-ui-react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './quiz.scss'


const TWITTER = "https://twitter.com/intent/tweet?text=Anuka%20Uchika!%20https%3A%2F%2Fanukauchika.github.com"
const FACEBOOK = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fanukauchika.github.com"
const GOOGLEPLUS = "https://plus.google.com/share?url=https%3A%2F%2Fanukauchika.github.com"

const COLOR_OK = 'blue'
const COLOR_NO = 'orange'
const HEADER_COLOR = 'blue'

function color(time) {
	if (time <= 5000) return "red"
	if (time <= 10000) return "orange"
	if (time <= 20000) return "pink"
	if (time <= 25000) return "yellow"
	if (time <= 30000) return "olive"
	if (time <= 35000) return "green"
	if (time <= 40000) return "teal"
	if (time <= 45000) return "blue"
	if (time <= 50000) return "purple"
	if (time <= 55000) return "violet"
	if (time <= 60000) return "brown"
	if (time <= 65000) return "grey"
}

function makeQuiz(q) {
	const words = {}
	q.items.forEach(w => {
		if (typeof w === "string") {
			words[w] = { name: w, state: 1 }
		} else {
			words[w.name] = { ...w, state: 1 }
		}
	})
	return {
		word: ""
		, name: q.name
		, desc: q.desc
		, time: q.time * 1000
		, items: []
		, remaining: words
		, count: q.items.length
		, over: false
		, win: false
		, learn: q.learn
	}
}


class Quiz extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			word: ""
			, items: []
			, over: false
			, win: false
			, time: 0
			, count: 0
		}
	}

	componentDidMount() {
		const id = this.props.params.id
		const qz = this.props.quizMap[id]
		this.setState(makeQuiz(qz))
		const self = this
		const tid = setInterval(function () {
			const newTime = self.state.time - 1000
			if (newTime <= 0) {
				self.loose()
			} else {
				self.setState({ time: newTime })
			}
		}, 1000)
		this.setState({ tid: tid })
	}

	componentWillUnmount() {
		this.loose()
	}

	handleChange(ev) {
		const word = ev.target.value
		this.setState({ word: word })
		const st = this.state
		console.log(st.remaining)
		if (st.remaining.hasOwnProperty(word) && st.remaining[word].state === 1) {
			const w = { ...st.remaining[word], state: 0 }
			this.setState({
				word: ""
				, items: st.items.concat([ { ...w, color: COLOR_OK } ])
				, remaining: { ...st.remaining, [word]: w }
			})
			if ((this.state.items.length + 1) === this.state.count) {
				this.win()
			}
		}
	}

	loose() {
		clearInterval(this.state.tid)
		const st = this.state
		const rm = Object.keys(st.remaining)
			.filter(k => st.remaining[k].state === 1)
			.map(k => ({ ...st.remaining[k], color: COLOR_NO }))
		this.setState({
			time: 0
			, win: false
			, over: true
			, items: this.state.items.concat(rm)
		})
	}

	win() {
		clearInterval(this.state.tid)
		const st = this.state
		this.setState({
			win: true
			, over: true
		})
	}

	named() {
		return this.state.items.filter(i => (i.color === COLOR_OK)).length
	}

	render() {
		const st = this.state
		const time = moment.utc(moment.duration(st.time).asMilliseconds()).format("mm:ss")
		const named = this.named()
		return (
			<Container fluid >

				<Segment inverted secondary color={HEADER_COLOR} textAlign="center" >
					<Header as="h1">ANUKA UCHIKA</Header>
					<Divider hidden />
					<Header as="h2">Try to name all {st.desc}</Header>
				</Segment>

				<Grid padded centered stackable >
					<Grid.Row>
						<Grid.Column width={5} textAlign="center" >
							<Statistic size='small' label='named'		value={named} />
							{ st.time !== 0 && <Statistic size='large' label='boom after' value={time} /> }
							{ st.time === 0 && <Statistic size='large' value={time} /> }
							<Statistic size='small' label='left'		value={st.count - named} />
							<Progress total={st.count} value={named} size="tiny" color={COLOR_OK} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={5}>
							{st.win && st.over &&
							<Segment color={COLOR_OK} >
								<Button color={COLOR_OK} fluid href={st.learn} target="_blank" >WELL DONE!</Button>
								<Divider hidden />
								<Container fluid textAlign="center" >
									<Button color='facebook'	icon='facebook'		href={FACEBOOK} />
									<Button color='twitter'		icon='twitter'		href={TWITTER} />
									<Button color='google plus'	icon='google plus'	href={GOOGLEPLUS} />
								</Container>
								<Divider hidden />
								<Button fluid basic as={Link} href={ "/quiz/" + this.props.params.id }>Restart</Button>
								<Divider hidden fitted />
								<Button fluid basic as={Link} href="/">Go to quizzez</Button>
							</Segment>
							}
							{!st.win && st.over &&
							<Segment color={COLOR_NO} >
								<Button color={COLOR_NO} fluid href={st.learn} target="_blank" >LEARN</Button>
								<Divider hidden />
								<Container fluid textAlign="center" >
									<Button color='facebook'	icon='facebook'		href={FACEBOOK} />
									<Button color='twitter'		icon='twitter'		href={TWITTER} />
									<Button color='google plus'	icon='google plus'	href={GOOGLEPLUS} />
								</Container>
								<Divider hidden />
								<Button fluid basic as={Link} href={ "/quiz/" + this.props.params.id }>Restart</Button>
								<Divider hidden fitted />
								<Button fluid basic as={Link} href="/">Go to quizzez</Button>
							</Segment>
							}
							{!st.over &&
							<Segment>
								<Input id="cmd" disabled={st.over} value={st.word} onChange={::this.handleChange} size='massive' fluid />
							</Segment>
							}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={14}>
							<Grid padded centered stackable >
								{ st.items.map((w, idx) =>
									<Grid.Column width={4} mobile={4} tablet={3} computer={3} widescreen={2} key={idx}>
										<Button fluid size="large" color={w.color} href={w.learn} target="_blank" >{w.name}</Button>
									</Grid.Column>
								)}
							</Grid>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		)
	}

}

function mapper(state, props) {
	return {
		quizMap: state.quizMap
	}
}

export default connect(mapper)(Quiz)

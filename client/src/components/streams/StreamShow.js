import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions'
import flv from 'flv.js';	

class StreamShow extends React.Component {
	constructor(props){
		super();

		this.videoRef = React.createRef();
	}
	
	componentDidMount(){
		this.props.fetchStream(this.props.match.params.id);
		this.buildPlayer();
	}

	componentDidUpdate(){
		//written because compDidMount is called only once and player will not be setup if stream access is not available
		this.buildPlayer();
	}

	componentWillUnmount(){
		// Used for cleanup
		this.player.destroy();
	}

	buildPlayer(){
		if(this.player || !this.props.stream){
			return;
		}
		this.player = flv.createPlayer({
			type:'flv',
			url:`http://localhost:8000/live/${this.props.match.params.id}.flv`
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	render(){
		if(!this.props.stream){
			return <div>Loading...</div>
		}
		return (
			<div>
				<video ref={this.videoRef} style={{width:'100%'}} controls/>
				<h1>{this.props.stream.title}</h1>
				<h5>{this.props.stream.description}</h5>
			</div>
		);
	}
};

const mapStateToProps = (state,ownProps) => {
	return {stream:state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStream})(StreamShow);
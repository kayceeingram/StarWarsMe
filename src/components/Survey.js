import React, { Component } from 'react';
import Questions from './Questions';
import axios from 'axios';

class Survey extends Component {
  constructor() {
    super()

    this.state = {
      savedPeople: [],
      peopleInput: ''
    }
  }


  savePeople() {
    let promise = axios.post('/api/people', {name: this.props.character})
    promise.then((res) => {
      this.setState({
        savedPeople: [...res.data]
      })
    })
  }

  deletePeople() {
    axios.delete('/api/people', {name: this.props.character}).then((res) => {
      this.setState({
        savedPeople: [...res.data],
        peopleInput: ''
      })
    })
  }

  updatePeople() {
    let promise = axios.put(`api/people/${this.props.character}`, {name: this.state.peopleInput});
    promise.then((res) => {
      this.setState({
        savedPeople: [...res.data],
        peopleInput: ''
      })
    })
  }

  handlePeopleInput(event) {
    this.setState({
      peopleInput: event.target.value
    })
  }

  render() {

    const mapPeople = this.state.savedPeople.map((e, i) => {
      return <div className="savedPeople" key={i}>{e}</div>
    })

    return (
      <div>
        <Questions 
        characterImg={this.props.characterImg}
        questions={this.props.questions} 
        answerChoices={this.props.answerChoices} 
        character={this.props.character} 
        personInfo={this.props.personInfo} count={this.props.count}/>
        <button className="saveCharacter" onClick={()=> this.savePeople()}>Save Character</button>
        <input 
        className="input" 
        value={this.props.userInput} 
        placeholder="Answer goes here" 
        onChange={(e) => this.props.handleUserInput(e)}>
        </input>
        <button className="button" onClick={this.props.updateAnswers}>Submit</button>
        <br /><div className="modifyCharacters">
          <button className="deleteCharacter" onClick={()=> this.deletePeople()}>Delete Character</button>
          <input className="new-input" placeholder="New name goes here" onChange={(e)=> this.handlePeopleInput(e)}></input>
          <button className="updatePeople" onClick={()=> this.updatePeople()}>Update Character</button>
          </div>
        {mapPeople}
      </div>
    )
  }
}

export default Survey
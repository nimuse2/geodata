import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

import './App.css';
import db from './firebase.js';
import pic from './img/interface-1.png';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      nameinput: "default",
      sLat: 0.0,
      sLong:0.0,
      error: false,
      errortxt: " ",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.writeDataBase = this.writeDataBase.bind(this);
    this.setPos = this.setPos.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.writeDataBase = this.writeDataBase.bind(this);
  } 

  handleSubmit(event) {
    this.writeDataBase();
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({nameinput: event.target.value});
  }
  
  setPos(position) {

    this.setState({errortxt:" "});
    this.setState({error:true});
    this.setState({
      sLat: position.coords.latitude,
      sLong: position.coords.longitude,
      errottxt:"",
    })
  }

  prepareData(){
    this.setState({errortxt:"getting from local browser..."});
    if (!navigator.geolocation) {
      alert("navigator.geolocation is not available");
    }
    navigator.geolocation.getCurrentPosition(this.setPos);
  }
  
  writeDataBase(){

    var context = this;

    db.collection("users").add({
      first: this.state.nameinput,
      last: "gitform",
      lat: this.state.sLat,
      long: this.state.sLong
    })
    .then(function(docRef) {
      context.setState({errortxt : "Successfully added to database"});
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      context.setState({errortxt: "Error adding document"});
      console.error("Error adding document: ", error);
    });

  }
  //
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>geo synth data collection</title>
        </Helmet>
        <Container className="p-3 text-left">
          <Jumbotron >
            <div className="bodyNoBoot">
              <h1 className="font-weight-light">
                geo.synth v.1.0
              </h1>
              <h3 className="font-weight-light">
                A synthesiser that uses location data to create sounds.
              </h3>
              <h4>
                <a href="https://www.nickwalters.co.uk">Link to geo data map</a>
              </h4>
              <p>
                <strong>About</strong>
                <br/>
                The geo.synth is a networked synthesiser that uses peoples location data relative to me, Nick Walters.  I am using these distances to drive different parameters in the synth. 
                <br/><br/>
                <strong>Perpetual Choir</strong>
                <br/>
                It is bourne from my various research threads but is very similar to this idea from around 1000 years ago: 
                <a href="https://sacred.numbersciences.org/2018/12/27/john-michells-perpetual-choirs/"> John Michells Perpetual Choir</a>
                <br/><br/>
                <div>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/K6ZmkOH4Qng" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                It will be available soon as an m4l device that you can download and use in Ableton. This is a development screenshot 12/ 01/ 2021. 
                <br/><br/>
                <strong>Data Collection</strong>
                <br/>
                With this form I am attempting to collect data of users I know personally so I can develop a 'geo cluster' relative to me whilst in 'beta' development.  I would like to develop the idea further to include various different user 'clusters' and possibly work with the API's of other geo data apps.
                <br/><br/>
                If you would like to add your current lat/ long and a word to the synth please enter some text in the box and click 'submit', the data will be held in a firebase database.  No other data is being collected or kept. It will not be used or seen by any third parties. If you want to preserve anonymity please use a nickname.
                <br/><br/>
                Please <a href="mailto: nick@nickwalters.co.uk">email me</a> if you would like to remove it, or if you have any concerns about the data, or if you want to get involved!.
                <br/><br/>
                
              </p>
            </div>
            <div>
              <Form
                onSubmit={this.handleSubmit}
              >
                <Form.Group 
                  controlId="formBasicTextInput"
                  > 
                    <div className="bodyNoBoot border m-2 p-2">
                      <div>
                        Get the Lat Long Co-ordinates of this browser - only works in Chrome
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <button
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={this.prepareData}
                          >
                            Get Co-ordinates 
                          </button>
                        </div>
                        <div>
                          {this.state.sLat} {this.state.sLong} 
                        </div>
                      </div>
                    </div>
                    <div className="bodyNoBoot border m-2 p-2">
                      <Form.Label
                        >Nick Name
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        aria-label="name-input"
                        size="lg"
                        className="mb-4"
                        name="name1input"
                        value={this.state.nameinput}
                        onChange={this.handleChange}
                      />
                      <input 
                        type="submit" 
                        value="Submit"
                        disabled={!this.state.error}
                      />
                    </div>
                    <div className="bodyNoBoot border m-2 p-2">
                        {this.state.errortxt}
                    </div>
                    <div className="bodyNoBoot border m-2 p-2">
                        &copy;NSW 2021
                        <br/><br/>
                    </div>
                </Form.Group>
              </Form>
            </div>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;
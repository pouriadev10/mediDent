import React, { Component } from 'react'
import DentistRadioGroup from './DentistRadioGroup'
import './style.css';

class ChooseDentist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      action: true
    }
  }

  handleSelectedButton = (value) => {
    let nextVal = value
    this.setState({ value });
    this.props.onSelect(nextVal)
  }

  render () {
    return (
      <div className='muiCardBody demo_mb25'>
        <div className='muiCard'>
          <DentistRadioGroup onSelect={this.handleSelectedButton}/>
        </div>
      </div>
    )
  }
}

export default ChooseDentist

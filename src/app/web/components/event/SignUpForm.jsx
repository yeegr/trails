'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import InputItem from '../shared/InputItem'

import {
  LANG
} from '../../../../common/__'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this._updateState = this._updateState.bind(this)
    this._nameChangeHandler = this._nameChangeHandler.bind(this)
    this._mobileChangeHandler = this._mobileChangeHandler.bind(this)
    this._pidChangeHandler = this._pidChangeHandler.bind(this)
    this._genderChangeHandler = this._genderChangeHandler.bind(this)
    this._levelChangeHandler = this._levelChangeHandler.bind(this)

    let signUp = this.props.signUp

    this.state = {
      name: signUp.name,
      mobile: signUp.mobile,
      pid: signUp.pid,
      gender: signUp.gender,
      level: signUp.level
    }
  }

  _updateState(kv) {
    this.setState(kv)

    setTimeout(() => {
      this.props.updateInfo(this.props.index, this.state)
    }, 0)
  }

  _nameChangeHandler(evt) {
    let name = evt.target.value
    this._updateState({name})
  }

  _mobileChangeHandler(evt) {
    let mobile = evt.target.value
    this._updateState({mobile})
  }

  _pidChangeHandler(evt) {
    let pid = evt.target.value
    this._updateState({pid})
  }

  _genderChangeHandler(evt) {
    let gender = parseInt(evt.target.value)
    this._updateState({gender})
  }

  _levelChangeHandler(evt) {
    let level = evt.target.value
    this._updateState({level})
  }

  render() {
    const minusBtn = (this.props.index > 0) ? (
        <button onClick={this.props.removeSignUp}>
          <pictogram
            type="glyph"
            data-glyph="minus"
          />
        </button>
      ) : null,
      plusBtn = (this.props.isLast) ? (
        <button onClick={this.props.addSignUp}>
          <pictogram
            type="glyph"
            data-glyph="plus"
          />
        </button>
      ) : null

    return (
      <fieldset>
        <group>
          <InputItem
            label={LANG.t('order.RealName')}
            input={
              <input
                onChange={this._nameChangeHandler}
                className={'textInput'}
                type="text"
                value={this.state.name}
              />
            }
          />
          <InputItem
            label={LANG.t('order.MobileNumber')}
            input={
              <input
                maxLength={11}
                onChange={this._mobileChangeHandler}
                className={'textInput'}
                type="tel"
                value={this.state.mobile}
              />
            }
          />
          <InputItem
            label={LANG.t('order.PersonalId')}
            input={
              <input
                maxLength={18}
                onChange={this._pidChangeHandler}
                className={'textInput'}
                type="number"
                value={this.state.pid}
              />
            }
          />
          <InputItem
            label={LANG.t('order.Gender')}
            input={
              <span>
                <input-set>
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value={'0'}
                    onChange={this._genderChangeHandler}
                    checked={this.state.gender === 0}
                  />
                  <label htmlFor="female">
                    {LANG.t('genders.Female')}
                  </label>
                </input-set>
                <input-set>
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    value={'1'}
                    onChange={this._genderChangeHandler}
                    checked={this.state.gender === 1}
                  />
                  <label htmlFor="male">
                    {LANG.t('genders.Male')}
                  </label>
                </input-set>
              </span>
            }
          />
          <InputItem
            label={LANG.t('order.OutdoorLevel')}
            input={
              <input-set>
                <input
                  onChange={this._levelChangeHandler}
                  min={0}
                  max={4}
                  type="range"
                  value={this.state.level}
                />
                <label>
                  {LANG.t('user.levels.' + this.state.level)}
                </label>
              </input-set>
            }
          />
        </group>
        <action>
          {plusBtn}
          {minusBtn}
        </action>
      </fieldset>
    )
  }
}

SignUpForm.propTypes = {
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  signUp: PropTypes.object.isRequired,
  updateInfo: PropTypes.func,
  addSignUp: PropTypes.func,
  removeSignUp: PropTypes.func
}

export default SignUpForm
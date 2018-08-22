import React from 'react'
import { Loading } from './components/common'

const liff = window.liff;

export default class LIFFProvider extends React.Component {
  state = {
    loading: true,
    userId: '',
    error: false
  }

  constructor(props) {
    super(props);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  getProfileHandler = async () => {
    let profile = await liff.getProfile();
    this.setState({
      loading: false,
      displayName : profile.displayName,
      userId : profile.userId,
      pictureUrl : profile.pictureUrl,
      statusMessage : profile.statusMessage
    });
  }

  errorHandler = (err) => {
    console.error(err)
    this.setState({
      loading: false,
      error: true,
      errorMessage: err
    })
  }

  initialize = () => {
    liff.init(async (data) => {
      this.getProfileHandler()
    }, (err) => {
      this.errorHandler(err)
    });
  }

  renderContent = () => {
    return this.state.error
      ? this.props.error(this.state.errorMessage)
      : this.props.render(this.state.userId)
  }

  render () {
    return this.state.loading === false ?
      this.renderContent() : <Loading />
  }
}
import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ header, message }) => (
  <Message negative>
    <Message.Header>{header}</Message.Header>
    <p>{message}</p>
  </Message>
)

export default ErrorMessage
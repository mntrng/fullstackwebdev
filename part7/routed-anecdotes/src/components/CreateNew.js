import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ( {addNew} ) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()
    
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push('/')
    }

    const resetAll = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }

    const Input = ({reset, ...others}) => {
      return <input {...others} />
    }
  
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form>
          <div>
            Content
            <Input name='content' {...content} />
          </div>
          <div>
            Author
            <Input name='author' {...author} />
          </div>
          <div>
            URL for more info
            <Input name='info' {...info} />
          </div>
          <button type='submit' onClick={handleSubmit}>Create</button> &nbsp;
          <button onClick={resetAll}>Reset</button>
        </form>
      </div>
    )
}

export default CreateNew
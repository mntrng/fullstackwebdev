import React from 'react'

const EditYear = ({editAuthor, authors}) => {
    const submit = async (event) => {
        event.preventDefault()

        let author = event.target.name.value
        let born = parseInt(event.target.born.value)

        await editAuthor({ variables: { 'name': author, 'setBornTo': born } })
    }

    return (
        <div>  
            <h2>Set Birthyear</h2>
            <form onSubmit={submit}>
                <div>
                Author Name &nbsp;
                <select name='name'>
                    <option>Select an author</option>
                    {authors.map(a => {
                    return (
                        <option key={a.name} >
                        {a.name}
                        </option>
                    )
                    })}
                </select>
                </div>
                <div>
                Born &nbsp;
                <input type='number' name='born' />
                </div>
                <button type='submit'>Update Author</button>
            </form>
        </div>      
    )
}

export default EditYear

export const Filter = ({ findName, filter }) => {

    return (
        <>

            <p>Find contacts by name</p>
            <label htmlFor="filter" className="form-label">Name</label>
            <input
                onChange={findName}
                value={filter}
                id="filter"
                type="text"
                name="filter"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />

        </>

    )
}
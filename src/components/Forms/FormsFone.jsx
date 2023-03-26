import { useState } from "react";
import css from './Forms.module.css'
export const ContactForm = (props) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const handleInput = e => {
        if (e.target.name === 'name') setName(e.target.value)
        else if (e.target.name === 'number') setNumber(e.target.value)
    }
    const handBtnSubmit = e => {
        e.preventDefault()
        props.handleSubmit(name, number)
        reset()
    }
    const reset = () => {
        setName('');
        setNumber('');

    }
    return (
        <form onSubmit={handBtnSubmit}>
            <div className={css.mb} >
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    onChange={handleInput}
                    value={name}
                    id="name"
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                <label htmlFor="number" className="form-label">Phone number</label>
                <input
                    onChange={handleInput}
                    value={number}
                    id="number"
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary"  >Submit</button>
        </form >
    )
}
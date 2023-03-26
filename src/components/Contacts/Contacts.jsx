import css from './Contacts.module.css'
export const Contacts = ({ newContact, contactDelet }) => {

    const listItems = newContact.map((contact) => {

        return (< li className={css.item} key={contact.id}>{contact.name}: {contact.number}<button className={css.btn} onClick={() => {
            contactDelet(contact.id)

        }}>
            Delete
        </button></li>)
    });

    return (
        <ul>
            {listItems}
        </ul>
    )
}
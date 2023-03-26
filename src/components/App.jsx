import { useEffect, useState } from "react"
import { ContactForm } from "./Forms/FormsFone";
import { nanoid } from 'nanoid'
import { Filter } from "./Filter/Filter";
import { Contacts } from "./Contacts/Contacts"
import Notiflix from 'notiflix';
import { load, save } from './Utilities/localStorage'
const KEY = 'contacts';
const INITIAL_STATE = load(KEY) || [];
export const App = () => {
  const [contacts, setContacts] = useState(INITIAL_STATE);
  const [filter, setFilter] = useState('');
  useEffect(() => {

    const localContacts = load(KEY);
    if (localContacts) setContacts(localContacts)
  }, [])
  useEffect(() => {
    save(KEY, contacts)
  }, [contacts])
  const handleInput = e => {
    setFilter(e.target.value)
  };
  const foundedName = (name, contacts) => {
    return contacts.filter(contact => contact.name.toLowerCase().replace(" ", '')
      .includes(name))
  };
  const contactDelet = id => {
    setContacts(contacts.filter(contact => contact.id !== id))
  };

  const handleSubmit = (name, number) => {
    const userId = nanoid()
    const isNamePresent = contacts.find(el => el.name === name);
    if (isNamePresent) {
      return alert(name)
    } else {
      setContacts((prev) => {

        return [...prev, { id: userId, name: name, number: number }]
      })

    }

  };
  const alert = (name) => {
    return Notiflix.Notify.failure(`${name} is alredy in contacts`)
  }
  return (
    <div
      style={{
        flexDirection: "column",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <h2>Phonebook</h2>
      <ContactForm handleSubmit={handleSubmit}

      />
      <Filter
        findName={handleInput}
        filter={filter}
      />
      <Contacts
        newContact={foundedName(filter,
          contacts)}
        contactDelet={contactDelet}
      />
    </div>
  )
}



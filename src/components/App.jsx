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
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   }
//   componentDidMount() {
//     const localContacts = load(KEY);
//     if (localContacts) {
//       this.setState({ contacts: localContacts })
//     }

//   }
//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts.length !== prevState.contacts.length) {
//       save(KEY, this.state.contacts)
//     }
//   }

//   handleSubmit = ({ name, number }) => {
//     const userId = nanoid()
//     const isNamePresent = this.state.contacts.find(el => el.name === name);
//     if (isNamePresent) {
//       return this.alert(name)
//     } else {
//       this.setState(({ contacts }) => ({ contacts: [...contacts, { id: userId, name, number }] }))
//     }
//   };
//   alert = (name) => {
//     return Notiflix.Notify.failure(`${name} is alredy in contacts`)
//   }
//   contactDelet = id => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
//   };
//   handleInput = e => {
//     this.setState(
//       { [e.target.name]: e.target.value }
//     )
//   }
//   foundedName = (name, contacts) => {
//     return contacts.filter(contact => contact.name.toLowerCase().replace(" ", '').includes(name))
//   }
//   render() {
//     return (
//       <div
//         style={{
//           flexDirection: "column",
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 40,
//           color: '#010101'
//         }}
//       >
//         <h2>Phonebook</h2>
//         <ContactForm handleSubmit={this.handleSubmit}
//           atate={this.state}
//         />
//         <Filter
//           findName={this.handleInput}
//           filter={this.state.filter}
//         />
//         <Contacts
//           newContact={this.foundedName(this.state.filter,
//             this.state.contacts)}
//           contactDelet={this.contactDelet}
//         />
//       </div>
//     );
//   }
// };



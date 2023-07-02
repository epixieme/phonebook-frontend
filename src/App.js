import { useState, useEffect } from "react";

import SearchPerson from "./components/SearchPerson";
import Header from "./components/Header";
import FormDetails from "./components/FormDetails";
import DisplayPeople from "./components/DisplayPeople";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialResponse) => {
      console.log("fulfilled");
      setPersons(initialResponse);
    });
  }, []);

  const handlePersonFilter = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (name) => {
    const confirmed = window.confirm(`Delete ${name.name}?`);

    if (confirmed) {
      const person = persons.find((p) => p.id === name.id);
      const deletePerson = { ...person };

      personService
        .deleteObj(person.id, deletePerson)
        .then((returnedPerson) => {
          setPersons(persons.filter((p) => p.id !== name.id));
        });
    } else {
      console.log("cannot delete");
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicateName = persons.filter((item) => item.name === newName);

    if (duplicateName.length > 0 && newNumber.length > 0) {
      window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );

      if (window.confirm) {
        const id = duplicateName[0].id;
        const person = persons.find((p) => p.id === id);
        const changedPerson = {
          ...person,
          number: newNumber,
        };

        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Person '${duplicateName[0].name}' was already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== id));
          });
      }
    } else if (duplicateName.length > 0) {
      alert(`${newName} is already added to the phonebook.`);
    } else if (duplicateName.length === 0 && newName.length > 0) {
      personService.create(newPerson).then((returnedPerson) => {
        setSuccessMessage(`Successfully added`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      }).catch((error) =>{
        setErrorMessage(error.response.data.error)
         setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
      })
      
    }
    
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleMsgMotifications = () => {
    if (errorMessage && successMessage) {
      return (
        <section>
          <Notification successMessage={successMessage} />
          <Notification errorMessage={errorMessage} />
        </section>
      );
    } else if (errorMessage) {
      return <Notification errorMessage={errorMessage} />;
    } else {
      return <Notification successMessage={successMessage} />;
    }
  };

  return (
    <div>
      <SearchPerson onChange={handlePersonFilter} />
      <Header text="Phone Book" />
      {handleMsgMotifications()}
 
      <FormDetails
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <Header text="Numbers" />
      <DisplayPeople
        persons={persons}
        search={search}
        onClick={(persons) => handleDelete(persons)}
        key={persons}
      />
    </div>
  );
};

export default App;
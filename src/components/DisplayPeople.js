const DisplayPeople = ({ persons, search, onClick }) => {
  const people = persons.map((person, ind) =>
    person.name.toLowerCase().includes(search.toLowerCase()) ? (
      <section key={person.id}>
        <p>
          {person.name} {person.number}
        </p>
        <button onClick={() => onClick(person)}>Delete</button>
      </section>
    ) : null
  );
  return <section>{people}</section>;
};

export default DisplayPeople;

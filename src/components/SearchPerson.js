const SearchPerson = ({ onChange, search }) => {
  return (
    <section>
      <p>Filter Shown with</p> <input value={search} onChange={onChange} />
    </section>
  );
};

export default SearchPerson;

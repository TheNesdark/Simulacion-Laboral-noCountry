import { FilterIcon } from "@/components/icons";
export default function SearchBar() {
  return (
    <form className="search-bar">
      <input
        id="search-input"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
      />
      <button type="button">
        <FilterIcon />
      </button>
    </form>
  );
}

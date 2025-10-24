import Image from "next/image";

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
        <Image
          src="/assets/icons/filter-icon.svg"
          alt="filter"
          width={24}
          height={24}
          priority
        />
      </button>
    </form>
  );
}

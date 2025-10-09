import Image from "next/image"
import "@styles/pages/Home.css"
export default function Index(){
    return (
        <>
        <header>
            <Image src="/assets/icons/logo-icon.svg" alt="Logo" width={40} height={40} priority/>
            <h1>Medical Salud</h1>
        </header>
        <main>
            <form>
                <input
                    id="search-input"
                    className="search-input"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                />
                <button>
                    <Image src="/assets/icons/filter-icon.svg" alt="filter" width={24} height={24}
                    priority/>
                </button>
            </form>
        </main>
        </>
    )
}
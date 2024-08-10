import { CirclePlus, Search } from "lucide-react";

import { useState } from "react";
import { LinkContainer, SearchBarContainer, SearchContainer } from "./styles";

interface SearchBarProps {
  onSearch: (value: string) => void;
  clientId: any
}

export default function SearchBarOrder({ onSearch, clientId }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: any) => {
    setSearchValue(e.currentTarget.value);
    onSearch(e.currentTarget.value);
  }

  return (
    <SearchContainer>
      <LinkContainer href={`/customer-registration/registerOrder/${clientId}`}>
        <span>
          <CirclePlus size={16} />
          <p>Cadastrar pedido</p>
        </span>
      </LinkContainer>
      <SearchBarContainer>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Buscar pedido"
        />
        <button>
          <Search size={16} />
        </button>
      </SearchBarContainer>
    </SearchContainer>
  )
}

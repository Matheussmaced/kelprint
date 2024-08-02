import { CirclePlus, Search } from "lucide-react";
import { LinkContainer, SearchBarContainer, SearchContainer } from "./styles";
import { useState } from "react";

export default function SearchBar( {onSearch}:any ){
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: any) => {
    setSearchValue(e.currentTarget.value);
    onSearch(e.currentTarget.value);
  }

  return(
    <SearchContainer>
          <LinkContainer href="/customer-registration/register">
            <span>
              <CirclePlus size={16} />
              <p>Cadastrar</p>
            </span>
          </LinkContainer>
          <SearchBarContainer>
            <input type="text"
                    value={searchValue}
                    onChange={handleSearch} />
            <button>
              <Search size={16} />
            </button>
          </SearchBarContainer>
        </SearchContainer>
  )
}
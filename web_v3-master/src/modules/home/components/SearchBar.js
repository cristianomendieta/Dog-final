import React from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SearchBar.css'

const SearchBar = props =>{
    return(
        <div className="searchForm">
        <search>
            <input className="searchBar" type="text" placeholder="Pesquise um doguinho"/>
            <button className="searchButton" type="submit">
                <span> <FontAwesomeIcon icon={faSearch} /></span>
            </button>
        </search>
      </div>
    )
    
}

export default SearchBar
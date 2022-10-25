import React from 'react';

const SearchBar = ({ data, searchResults }) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return searchResults(data)
        const resultsArray = data.filter(post => post.username.includes(e.target.value) )
        searchResults(resultsArray)
    }

    return (
        <header>
            <form className="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="search"
                    onChange={(e) =>handleSearchChange(e)}
                    // aria-label="Search"
                    class=" form-control" 
                />
            </form>
        </header>
    )
}
export default SearchBar
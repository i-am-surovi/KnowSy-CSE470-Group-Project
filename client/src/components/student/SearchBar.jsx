import React from 'react'
import { assets } from '../../assets/assets'

const SearchBar = () => {
  return (
    <div>
      <form>
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3'/>
        <input type="text" placeholder='Search for ' />
      </form>
    </div>
  )
}

export default SearchBar

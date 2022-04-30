import React from 'react'
import Coinboard from '../components/Coinboard'
import CoinsTable from '../components/CoinsTable'
import Newsboard from '../components/Newsboard'
import UserSidebar from '../components/UserSidebar'
import Banner from '../components/Banner/Banner'
const CryptoPage = () => {
  return (
    <div>
      <Banner />
        <Coinboard />
        <CoinsTable />
        <Newsboard />
        {/* <UserSidebar /> */}
    </div>
  )
}

export default CryptoPage
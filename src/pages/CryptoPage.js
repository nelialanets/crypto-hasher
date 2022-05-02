import React from 'react'
import Coinboard from '../components/Coinboard'
import CoinsTable from '../components/CoinsTable'
import Newsboard from '../components/Newsboard'
import UserSidebar from '../components/UserSidebar'
const CryptoPage = () => {
  return (
    <div>
        <Coinboard />
        <CoinsTable />
        <Newsboard />
        {/* <UserSidebar /> */}
    </div>
  )
}

export default CryptoPage
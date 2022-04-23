import React from 'react'
import Coinboard from '../components/Coinboard'
import CoinsTable from '../components/CoinsTable'
import UserSidebar from '../components/UserSidebar'

const CryptoPage = () => {
  return (
    <div>
        <Coinboard />
        <CoinsTable />
        {/* <UserSidebar /> */}
    </div>
  )
}

export default CryptoPage
import React from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'

export default function Dashboard() {
    return (
        <div> 
			<div className=''>
				<h1 className="text-left p-3 text-lg font-medium">Hello, Admin</h1>
			</div>
            <div className="container flex flex-col gap-4">
                <DashboardStatsGrid />
                <div className="flex flex-row gap-4 w-full">
                    <TransactionChart />
                </div>
            </div>
        </div>
    )
}

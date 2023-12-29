import React from 'react'
import { IoPieChart, IoPeople } from 'react-icons/io5'

export default function DashboardStatsGrid() {
    return (
        <div className="container flex gap-4">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Influencer Request</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">123</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Contactus Request</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">3423</strong>
                       
                    </div>
                </div>
            </BoxWrapper>
            
            
        </div>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

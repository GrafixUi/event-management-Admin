import {HiUsers,HiClipboardList,HiOutlineBriefcase,HiOutlineShoppingCart } from 'react-icons/hi'
import { IoLocationOutline } from "react-icons/io5";
import { MdPayment, MdOutlineReviews } from "react-icons/md";

// export const DASHBOARD_SIDEBAR_LINKS = [
//     {
//         key: 'dashboard',
//         label: 'Home',
//         path: '/dashboard',
        
//     }
// ]

export const EVENTS_SIDEBAR_LINKS = [
    {
        key: 'Events',
        label: 'Events',
        path: '/events',
        icon: <HiOutlineBriefcase color='#B2B2B2' />
    },
    {
        key: 'Add Events',
        label: 'Add Events',
        path: '/addevents',
        icon: <HiOutlineBriefcase color='#B2B2B2'/>
    },
    {
        key: 'Ecoupons',
        label: 'Ecoupons',
        path: '/ecoupons',
        icon: <HiOutlineBriefcase color='#B2B2B2'/>
    }
]

export const MOVIES_SIDEBAR_LINKS = [
    {
        key: 'Movies',
        label: 'Movies',
        path: '/movies',
        icon: <HiOutlineBriefcase color='#B2B2B2' />
    },
    {
        key: 'Add Movies',
        label: 'Add Movies',
        path: '/addmovies',
        icon: <HiOutlineBriefcase color='#B2B2B2'/>
    },
    {
        key: 'Mcoupons',
        label: 'Mcoupons',
        path: '/mcoupons',
        icon: <HiOutlineBriefcase color='#B2B2B2'/>
    }
]

export const ORDERS_SIDEBAR_LINKS = [
    {
        key: 'Orders',
        label: 'Orders',
        path: '/order',
        icon: <HiOutlineShoppingCart color='#B2B2B2' />
    },
    {
        key: 'Payout Requests',
        label: 'Payout Requests',
        path: '/payoutrequest',
        icon: <MdPayment color='#B2B2B2'/>
    },
    {
        key: 'Venues',
        label: 'Venues',
        path: '/Venues',
        icon: <IoLocationOutline color='#B2B2B2'/>
    }
]

export const CAMPAIGN_SIDEBAR_LINKS = [
    {
        key: 'Reviews',
        label: 'Reviews',
        path: '/reviews',
        icon: <MdOutlineReviews color='#B2B2B2'/>
    },
    {
        key: 'Report',
        label: 'Report',
        path: '/reports',
        icon: <HiClipboardList color='#B2B2B2'/>
    }
]


export const CONTACTUS_SIDEBAR_LINKS = [
    {
        key: 'User',
        label: 'User',
        path: '/users',
        icon: <HiUsers color='#B2B2B2'/>
    }
]

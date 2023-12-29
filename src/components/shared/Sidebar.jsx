import React from 'react'
import classNames from 'classnames'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS, EVENTS_SIDEBAR_LINKS, CONTACTUS_SIDEBAR_LINKS,ORDERS_SIDEBAR_LINKS,CAMPAIGN_SIDEBAR_LINKS } from './sidebar/sidebarlist'
import { HiOutlineLogout } from 'react-icons/hi'
import Logo from "../../assets/logo.svg";

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:no-underline  rounded text-base'

export default function Sidebar() {
    return (
        <div className=" bg-white  w-[220px] p-2 flex flex-col">
            <div className="flex justify-center items-center gap-2 px-1 py-3 ">
                <img src={Logo} alt="logo" className=''/>
            </div>
            <div className="py-6 flex flex-1 flex-col gap-2">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className="mt-2">
                    <h1 className="text-[12px] font-medium text-gray-500 mt-2 p-2">Events Managemant</h1>
                    {EVENTS_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink className="pt-2 text" key={link.key} link={link} />
                    ))}
                </div>
                <div className="mt-2">
                    <h1 className="text-[12px] font-medium text-gray-500 mt-2 p-2">Orders Managemant</h1>
                    {ORDERS_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink className="pt-2" key={link.key} link={link} />
                    ))}
                </div> 
                <div className="mt-2">
                    <h1 className="text-[12px] font-medium text-gray-500 mt-2 p-2">Review Managemant</h1>
                    {CAMPAIGN_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink className="pt-2" key={link.key} link={link} />
                    ))}
                </div>

                <div className="mt-2">
                    {CONTACTUS_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink className="pt-2" key={link.key} link={link} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-0.5 pt-2 ">
                <Link to="/">
                    <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                        <span className="text-xl">
                            <HiOutlineLogout />
                        </span>
                        Logout
                    </div>
                </Link>
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()
    const matchRoot = useMatch(link.path)

    return (
        <div className="pt-2">
            <Link
                to={link.path}
                className={classNames(
                    pathname === link.path || (matchRoot && pathname === '/')
                        ? 'bg-[#0A075FE0] text-white text-sm hover:text-white'
                        : 'text-[#B2B2B2] text-sm hover:bg-[#0A075FE0] hover:text-white ',
                    linkClass
                )}
            >
                <span className="text-xl">{link.icon}</span>
                {link.label}
            </Link>

            {link.submenu && (pathname.startsWith(link.path) || matchRoot) && (
                <div className="ml-6 text-sm">
                    {link.submenu.map((submenuLink) => (
                        <Link
                            key={submenuLink.key}
                            to={submenuLink.path}
                            className={classNames(
                                pathname === submenuLink.path ? 'bg-red-500 text-white text-sm' : 'text-white text-sm',
                                linkClass
                            )}
                        >
                            <span className="text-xl">{submenuLink.icon}</span>
                            {submenuLink.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

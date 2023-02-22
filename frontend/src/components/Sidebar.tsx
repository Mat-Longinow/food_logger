import react, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import { format } from 'date-fns'

interface SidebarProps {
    setActiveDates: any,

}

const Sidebar = ({ setActiveDates }: SidebarProps) => {
    const [weekDates, setWeekDates] = useState<any>()

    useEffect(() => {
        axios.post('http://localhost:5010/getWeekDates', {
            name: 'Mat Longinow',
        }).then((res) => {
            setWeekDates(res.data)

            // set first item as the default one shown
            setActiveDates(res.data[0])
        })
    }, [])

    const handleClick = (week: any) => {
        setActiveDates(week)
    }

    return (
        <div className="flex items-start mt-12">
            <ul className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 w-full" id="tabs-tabVertical"
                role="tablist">
                {weekDates && weekDates.map((week: any) => (
                    <li className="nav-item flex-grow text-center" role="presentation" onClick={() => handleClick(week)}>
                        <a
                            href="#tabs-homeVertical"
                            className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0
                            border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:text-gray-400
                            focus:border-transparent active active:bg-gray-50"
                            id="tabs-home-tabVertical"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-homeVertical"
                            role="tab"
                            aria-controls="tabs-homeVertical"
                            aria-selected="true"
                        >{format(new Date(week.beginning), 'MM/dd/yy')} - {format(new Date(week.end), 'MM/dd/yy')}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
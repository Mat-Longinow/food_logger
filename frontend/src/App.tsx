import React, { useEffect, useState } from 'react';
import './App.css';
import Timeline from "./components/Timeline";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { add, format } from "date-fns";

function App() {
  const defaultActiveDates = {
    beginning: '02/17/2023',
    end: '02/23/2023'
  }

  const [activeDates, setActiveDates] = useState<any>(defaultActiveDates)
  const [weekData, setWeekData] = useState<any>()
  const [userId, setUserId] = useState()

  const formatDate = (date: any) => format(new Date(date), 'MM/dd/yy')

  const addToDate = (date: any, daysToAdd: number) => {
    let newDate = add(new Date(date), {days: daysToAdd})

    return formatDate(newDate)
  }

  const getWeekInfo = () => {
    axios.post('http://localhost:5010/getWeekInfo', {
      name: 'Mat Longinow',
      week: {
        beginning: activeDates.beginning,
        end: activeDates.end
      }
    }).then((res) => {
      setWeekData(res.data.weekData)
      setUserId(res.data)
    })
  }

  useEffect(() => {
    getWeekInfo()
  }, [])

  useEffect(() => {
    getWeekInfo()
  }, [activeDates])

  const generateTimelines = (activeDates: any) => {
    let timelines: any = []
    let days = [
      {
        day: "Friday",
        date: formatDate(activeDates.beginning)
      },
      {
        day: "Saturday",
        date: addToDate(activeDates.beginning, 1)
      },
      {
        day: "Sunday",
        date: addToDate(activeDates.beginning, 2)
      },
      {
        day: "Monday",
        date: addToDate(activeDates.beginning, 3)
      },
      {
        day: "Tuesday",
        date: addToDate(activeDates.beginning, 4)
      },
      {
        day: "Wednesday",
        date: addToDate(activeDates.beginning, 5)
      },
      {
        day: "Thursday",
        date: addToDate(activeDates.beginning, 6)
      },
    ]

    if(weekData) {
      days.forEach((day: any) => {
        const dayData = weekData[0].dayRecords.filter((dayRecord: any) => dayRecord.date === day.date)

        if (day.day === 'Thursday') {
          timelines.push(
              <Timeline className="pr-20" day={day} dayData={dayData}/>
          )
        } else {
          timelines.push(
              <Timeline className="" day={day} dayData={dayData}/>
          )
        }
      })
    }

    return timelines
  }

  return (
    <div id="App" className="flex">
      <aside className="h-screen sticky top-0 left-0 basis-1/6">
        <Sidebar setActiveDates={setActiveDates}/>
      </aside>

      <main className="overflow-x-scroll overflow-y-auto flex basis-5/6">
        {generateTimelines(activeDates)}
      </main>

    </div>
  );
}

export default App;

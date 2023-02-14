import React, { useEffect, useState } from 'react';
import './App.css';
import Timeline from "./components/Timeline";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { add, format } from "date-fns";

function App() {
  const defaultActiveDates = {
    beginning: '02/03/2023',
    end: '02/09/2023'
  }

  const [activeDates, setActiveDates] = useState<any>(defaultActiveDates)
  const [weekData, setWeekData] = useState<any>()
  const [userId, setUserId] = useState()

  const formatDate = (date: any) => format(new Date(date), 'MM/dd/yy')

  const addToDate = (date: any, daysToAdd: number) => add(new Date(date), {days: daysToAdd})

  const getWeekInfo = () => {
    axios.post('http://localhost:5010/getWeekInfo', {
      name: 'Mat Longinow',
      week: {
        beginning: activeDates.beginning,
        end: activeDates.end
      }
    }).then((res) => {
      console.log('here is the full getWeekInfo --> ', res)
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
        date: addToDate(activeDates, 1)
      },
      {
        day: "Sunday",
        date: addToDate(activeDates, 2)
      },
      {
        day: "Monday",
        date: addToDate(activeDates, 3)
      },
      {
        day: "Tuesday",
        date: addToDate(activeDates, 4)
      },
      {
        day: "Wednesday",
        date: addToDate(activeDates, 5)
      },
      {
        day: "Thursday",
        date: addToDate(activeDates, 6)
      },
    ]

    if(weekData) {
      for (let i = 0; i < 7; i++) {
        if (i === 6) {
          timelines.push(
              <Timeline className="pr-20" day={days[i]} weekData={weekData}/>
          )
        } else {
          timelines.push(
              <Timeline className="" day={days[i]} weekData={weekData}/>
          )
        }
      }
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

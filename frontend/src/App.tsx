import React from 'react';
import './App.css';
import Timeline from "./components/Timeline";

function App() {

  const generateTimelines = () => {
    let timelines: any = []
    let days: string[] = [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday"
    ]

    for(let i = 0; i < 7; i++) {
      if(i === 6) {
        timelines.push(
          <Timeline className="pr-20" day={days[i]} />
        )
      }else {
        timelines.push(
          <Timeline className="" day={days[i]} />
        )
      }
    }

    return timelines
  }

  return (
    <div id="App" className="flex">
      <aside className="h-screen sticky top-0 left-0 basis-1/6">
        1/4
      </aside>

      <main className="overflow-x-scroll overflow-y-auto flex basis-5/6">
        {generateTimelines()}
      </main>

    </div>
  );
}

export default App;

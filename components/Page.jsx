import React, { useEffect, useState } from 'react'

function Page({user}) {
    const [pages,setPages]=useState([])
    const [time, setTime] = useState(0);
    const [selectedPage,setSelectedPage]=useState({
        id:'1234',
        name:'Dummy Page',
        category:'Dummy Category',
        access_token:"page_access_token",

        total_followers:[0,0,0],
        total_engagement:[0,0,0],
        total_impressions:[0,0,0],
        total_reactions:[0,0,0],
    })
    const fetchData=async()=>{
        //Dummy API calls
        console.log(`Fetching Pages:`)
        var pages=[];
        await FB.api(
            `${user.id}/accounts`,
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                pages=response.data;
                console.log(`Pages Array:`,pages)
              }
            }
        );

        console.log(`Fetching Page Likes...`)
        await FB.api(
            `393394083847414/insights/likes`,
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                // pages=response.data;
                console.log(`Likes`,response)
              }
            }
        );




    }



   
    useEffect(()=>{
        const pages=[{
            id:'1234',
            name:'Page Name1',
            category:'PAge Category1',
            access_token:"page_access_token",

            total_followers:[1,2,3],
        total_engagement:[1,2,3],
        total_impressions:[1,2,3],
        total_reactions:[1,2,3],

        },
        {
            id:'5678',
            name:'Page Name2',
            category:'PAge Category2',
            access_token:"page_access_token",

            total_followers:[4,5,6],
        total_engagement:[4,5,6],
        total_impressions:[4,5,6],
        total_reactions:[4,5,6],

        }]
        setPages(pages)
        fetchData()
    
    },[])

    const handleSelection=async(event)=>{
        const id=event.target.value
        const Newpage=pages.filter((page)=>{
            return page.id==id

        })
        console.log(Newpage)

        await setSelectedPage(Newpage[0])
    }

    const handleRadioSelection = (event) => {
        const selectedTime = parseInt(event.target.value, 10);
        setTime(selectedTime);
        console.log('Selected time:', selectedTime);
      };
  return (
    <div className='login-container flex-col page-container'>
        <h1>Page Metrics</h1>

        <div>

        <select name="cars" id="cars" onChange={handleSelection}>
        <option value="1234">Dummy</option>
        {pages.map((page)=>{
            return <option value={page.id}>{page.name}</option>
        })}
        </select>

        <h2>{selectedPage.name}:</h2>
        <div class='flex'>
        <div>
        <label>
          <input
            type="radio"
            name="time"
            value="0"
            onChange={handleRadioSelection}
          />
          Day
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="time"
            value="1"
            onChange={handleRadioSelection}
          />
          Week
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="time"
            value="2"
            onChange={handleRadioSelection}
          />
          28 Days
        </label>
      </div>
</div>

        <div>
            <ul>
                <li>Total Followers: <span class='metric_span'>{selectedPage.total_followers[time]}</span></li>
                <li>Total Engagements: <span class='metric_span'>{selectedPage.total_engagement[time]}</span></li>
                <li>Total Impressions: <span class='metric_span'>{selectedPage.total_impressions[time]}</span></li>
                <li>Total Reactions: <span class='metric_span'>{selectedPage.total_reactions[time]}</span></li>
            </ul>
        </div>


        </div>
    </div>

  )
}

export default Page
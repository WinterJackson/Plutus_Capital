import React,{ useRef,useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart} from 'chart.js/auto'

const AttemptBarChart=({questionData})=>{

    const chartRef = useRef(null);

    // const chartData = {
    //     labels: TestingQuestions.map((each)=> each.question),
    //     datasets: [
    //       {
    //         label: 'Data Set 1',
    //         data: TestingQuestions.map((each)=> each.score),
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
    //         borderColor: 'rgba(75, 192, 192, 1)', // Border color
    //         borderWidth: 1,
    //       },
    //     ], 
    //   };

    const chartOptions = {
        maintainAspectRatio: false, // To prevent the chart from shrinking in a small container
        scales: {
          x: {
            ticks: {
              font: {
                size: 14, // Set the font size for the x-axis labels
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 14, // Set the font size for the y-axis labels
              },
            },
          },
        },
      };

      
      


      // useEffect(() => {
      //   // Create the chart when the component mounts
      //   const chart = new Chart(chartRef.current, {
      //     type: 'bar',
      //     data: chartData,
      //     options: chartOptions,
      //   });
    
      //   // Return a function to destroy the chart when the component unmounts
      //   return () => {
      //     chart.destroy();
      //   };
      // }, []);

    return(
        <div className="h-[35rem] bg-slightWhiteBg">
            <Bar data={questionData} options={chartOptions} ref={chartRef}/>
        </div>
    )
}

export default AttemptBarChart
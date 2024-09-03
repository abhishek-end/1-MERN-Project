import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement } from "chart.js/auto";
import Labels from "./../components/Labels.jsx";

Chartjs.register(ArcElement);

const Graph = () => {
  const config = {
    data: {
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      cutout: 107,
      borderRadius: 10,
    },
  };

  return (
    <div className='flex justify-center flex-col max-w-xs mx-auto'>
      <div className='item '>
        <div className='chart relative'>
          <Doughnut {...config}></Doughnut>
          <h3 className='mb-4 font-bold absolute left-0 right-0 top-1/2 '>
            Total
            <span className='block text-3xl text-emerald-400 '>${0}</span>
          </h3>
        </div>
      </div>
      <div className='flex flex-col py-10 gap-4 '>
        <Labels />
      </div>
    </div>
  );
};

export default Graph;

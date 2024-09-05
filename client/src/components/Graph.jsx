import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement } from "chart.js/auto";
import Labels from "./../components/Labels.jsx";
import { default as api } from "../store/apiSlice";
import { chart_Data, getTotal } from "../helpers/helper.js";
import { get } from "lodash";

Chartjs.register(ArcElement);

const Graph = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let graphData;
  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chart_Data(data)} />;
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  return (
    <div className='flex justify-center flex-col max-w-xs mx-auto'>
      <div className='item '>
        <div className='chart relative'>
          {graphData}
          <h3 className='mb-4 font-bold absolute left-0 right-0 top-1/2 '>
            Total
            <span className='block text-3xl text-emerald-400 '>
              ₹{getTotal(data)}
            </span>
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

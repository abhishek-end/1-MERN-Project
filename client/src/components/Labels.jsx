import React from "react";
import { default as api } from "../store/apiSlice";
import { getLabels } from "../helpers/helper";

export default function Labels() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let Transaction;

  if (isFetching) {
    Transaction = <div>Fetching</div>;
  } else if (isSuccess) {
    Transaction = (
      <>
        {getLabels(data).map((value, index) => (
          <LabelComponent key={index} data={value}></LabelComponent>
        ))}
      </>
    );
  } else if (isError) {
    Transaction = <div>Error</div>;
  }

  return <>{Transaction}</>;
}
function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div
          className='w-2 h-2 rounded py-3'
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h3>{data.type ?? ""}</h3>
      </div>
      <h3>{Math.round(data.percent ?? 0)}%</h3>
    </div>
  );
}

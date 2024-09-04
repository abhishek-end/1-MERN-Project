import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { default as api } from "../store/apiSlice";
const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();

  const handleDelete = (e) => {
    deleteTransaction(e.target.dataset.id);
  };
  let transaction;

  if (isFetching) {
    transaction = <div>Fetching</div>;
  } else if (isSuccess) {
    transaction = (
      <>
        {data.map((value, index) => (
          <Transaction
            key={index}
            category={value}
            handler={handleDelete}
          ></Transaction>
        ))}
      </>
    );
  } else if (isError) {
    transaction = <div>Error</div>;
  }
  return (
    <div className='flex flex-col py-6 gap-3 '>
      <h1 className='p-4 text-xl font-bold '>History</h1>
      {transaction}
    </div>
  );
};

export default List;

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className='item flex justify-center bg-gray-50 py-2 rounded-r '
      style={{ borderRight: `8px solid ${category.color ?? "#333"}` }}
    >
      <button
        className='px-2'
        style={{ color: `${category.color ?? "#333"}` }}
        onClick={handler}
        data-id={category._id}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <span className='block w-full '>{category.name ?? ""}</span>
    </div>
  );
}

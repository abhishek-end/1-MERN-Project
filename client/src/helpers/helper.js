import _ from "lodash";

export function getSum(transaction) {
  let sum = _(transaction)
    .groupBy("type") // Group by the 'type' key
    .map((objs, key) => {
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();

  return sum;
}

export function getLabels(transaction) {
  // Get the summed transactions grouped by type
  let amountSum = getSum(transaction);

  // Calculate the total of all amounts
  let total = _.sumBy(transaction, "amount");

  // Calculate the percentage for each type
  let percentage = _(amountSum)
    .map((objs) =>
      _.assign(objs, {
        percent: (100 * objs.total) / total,
      })
    )
    .value();

  return percentage;
}
export function chart_Data(transaction, custom) {
  let summedData = getSum(transaction); // Get the summed data grouped by type

  let dataValue = _.map(summedData, "total");

  let bgColor = _.map(summedData, "color"); // ['#008000', '#FCBE44']

  // console.log("Data values:", dataValue);
  // console.log("Background colors:", bgColor);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue, // Pass sums to the chart
          backgroundColor: bgColor, // Pass colors to the chart
          hoverOffset: 4,
          borderRadius: 20,
          spacing: 5,
        },
      ],
    },
    options: {
      cutout: 110,
    },
  };

  return custom ?? config;
}

export function getTotal(transaction) {
  return _.sumBy(getSum(transaction), "total"); // Use sumBy with 'total'
}

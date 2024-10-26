interface DataItem {
  data: {
    date?: string | Date;
    weight?: number;
  };
}

// sort by date
export const sortByDate = (array: DataItem[]) => {
  const sortedArray = array.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: DataItem[]) => {
  const withWeight = array.filter((item) => item.data.weight);
  const withoutWeight = array.filter((item) => !item.data.weight);

  const sortedWeightedArray = withWeight.sort(
    (a, b) => (a.data.weight || 0) - (b.data.weight || 0)
  );

  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};
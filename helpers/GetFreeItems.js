exports.getFreeItems = (noFree, free, type, idParam) => {
  let noFreeIds = [];
  let newItems = [];

  noFree.map((nf) => {
    nf[type].map((item) => {
      if (nf._id.toString() === idParam) newItems.push(item.toString());
      noFreeIds.push(item.toString());
    });
  });

  let containedItems = [];
  let freeItems = [];

  free.map((item) => {
    if (!noFreeIds.includes(item._id.toString())) {
      freeItems.push(item);
    } else if (newItems.includes(item._id.toString())) {
      containedItems.push(item);
    }
  });

  return { freeItems, containedItems };
};

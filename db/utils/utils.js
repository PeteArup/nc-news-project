exports.formatDates = list => {
  const convertedDates = list.map((obj) => {
    const newObj = {
      ...obj
    }
    const newDate = new Date(newObj.created_at)
    newObj.created_at = newDate
    return newObj
  })
  return convertedDates
};

exports.makeRefObj = list => {
  const newObj = {}
  list.forEach((articles) => {
    newObj[articles.title] = articles.article_id;
  })
  return newObj
};

exports.formatComments = (comments, articleRef) => {
  const outputArr = comments.map((obj) => {
    const newObj = {
      ...obj
    }
    newObj.author = newObj.created_by;
    newObj.article_id = articleRef[newObj.belongs_to];
    newObj.created_at = new Date(newObj.created_at)
    delete newObj.created_by
    delete newObj.belongs_to
    return newObj
  })
  return outputArr
};
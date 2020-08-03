exports.formatDates = list => {
  const copyList = list.map((item) => {
    return {
      ...item
    }
  })
  const convertedDates = copyList.map((obj) => {
    const newDate = new Date(obj.created_at)
    obj.created_at = newDate
    return obj
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
  const copyComments = comments.map((comment) => {
    return {
      ...comment
    }
  })

  const outputArr = copyComments.map((obj) => {
    obj.author = obj.created_by;
    obj.article_id = obj.belongs_to;
    obj.created_at = new Date(obj.created_at)
    delete obj.created_by
    delete obj.belongs_to
    return obj
  })
  return outputArr

};
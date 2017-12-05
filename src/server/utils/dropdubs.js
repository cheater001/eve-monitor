let duplicates = [];

db.runCommand({
  aggregate: "killmails",
  pipeline: [
    { $group: { _id: { killmail_id: "$killmail_id" }, dups: { "$addToSet": "$_id" }, count: { "$sum": 1 } } },
    { $match: { count: { "$gt": 1 } } }
  ],
  allowDiskUse: true
}).result.forEach(function (doc) {
    doc.dups.shift();
    doc.dups.forEach(function (dupId) {
      duplicates.push(dupId);
    })
  });

console.log(duplicates);

// db.YOURCOLLECTION.remove({_id:{$in:duplicates}});

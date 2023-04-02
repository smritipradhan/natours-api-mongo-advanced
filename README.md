# Natours API Mongo Advanced

Author: Smriti Pradhan
Credits: Jonas

This is continuation of natours-api-mongo (https://github.com/smritipradhan/natours-api-mongo) with Filtering , Sorting , Aliasing , Pagination , Aggregation and Document , Query and Aggregation Middlewares

## Making the API Better - FILTERING

Allow the user to filter the data using Query string

getAllTours gives all the data . and we will implement filtering here based on the query string.In the postman we can turn the query string on and off.

```
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    ......
};
```

OUTPUT:

```
{ duration: '5', difficulty: 'easy' }
```

There are two ways to write database queries.The first one is to use Filter object and the second one is to use special mongoose methods.

1.

```
const tours = await Tour.find({ duration: 5, difficulty: "easy" });
```

Now we can only two results with duration of 5 and difficulty of easy.

2.
const Tour = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

---

Final Code

```
console.log(req.query);
const tours = await Tour.find(req.query);
```

But there is a problem with this implementation. Later on we will have more query parametes like Sort for sorting functionality and page for pagination.We need to make sure we are not querying for it in the database.So, we need to exclude these before we actually do filtering.

```
exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let excludedFields = ["sort", "page", "limit", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj);
     const tours = await Tour.find(queryObj);
    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err,
    });
  }
};

```

Here, we made a hard copy of req.query deleted the excluded fields to make the query object .
OUTPUT

```
{ duration: '5', difficulty: 'easy', page: '2' }
{ duration: '5', difficulty: 'easy' }
```

But as soon as we await the Tour.find() it returns us the query and after that we cant perform the sort,filter page etc functionality.So, we make a query and at the end we await the results after performing the functionalties.

```
exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let excludedFields = ["sort", "page", "limit", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj);
    const query = Tour.find(queryObj);
    const tours = await query;
    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err,
    });
  }
};
```

## Making the API Better : Advanced Filtering

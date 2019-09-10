class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) filltering and ignoring our key words from the query
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // console.log(req.query, queryObj);

    // ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // {difficulty: 'easy',duration:{ $gte: 5 }}
    //{ duration: { gte: '5' }, difficulty: 'easy' }
    // gte, gt, lte, lt

    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr)); //returns a query

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(fields);
      // ~ query = query.select('name duration price');
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 4) pagination
    const page = this.queryString.page * 1 || 1; // String to number trick
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=2&limit=10 , 1-10 - page 1, 11-20 - page 2
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;

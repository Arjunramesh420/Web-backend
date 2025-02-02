// module.exports = mongoose => {
//   var schema = mongoose.Schema(
//     {
//       employeeId: String,
//       firstName: String,
//       lastName: String,
//       department: String,
//       email: String,
//       salary: Number, 
//       hireDate: Date,
//       // query: String,
//       // published: Boolean
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Upload = mongoose.model("Upload", schema);
//   return Upload;
// };


module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      employeeId: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      department: { type: String, required: false },  // Optional field
      email: { type: String, required: true },
      salary: { type: Number, required: true }, 
      hireDate: { 
        type: Date, 
        required: true,
        validate: {
          validator: function(v) {
            return !isNaN(new Date(v).getTime());  // Check if hireDate is a valid Date
          },
          message: props => `${props.value} is not a valid hireDate!`
        }
      },
    },
    { timestamps: true }
  );

  // Custom toJSON method to remove sensitive fields
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Upload = mongoose.model("Upload", schema);
  return Upload;
};

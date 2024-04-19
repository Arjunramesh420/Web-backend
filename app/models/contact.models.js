module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        email: String,
        phoneNumber: String,
        queryTitle: String,
        // {
        //   type: String,
        //   enum: ["Classes/Package Enquiry", "Tournament Registration", "Job Opportunities"]
        // },
        query: String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const ContactUs = mongoose.model("ContactUs", schema);
    return ContactUs;
  };
  
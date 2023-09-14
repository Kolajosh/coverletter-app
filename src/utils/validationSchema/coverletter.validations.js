import * as Yup from "yup";

export const coverLetterValidationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  contactEmail: Yup.string()
    .email("Invalid email address")
    .required("Contact Email is required"),
  jobRole: Yup.string().required("Job Role is required"),
  company: Yup.string().required("Company is required"),
  experience: Yup.string().required("Experience is required"),
  skills: Yup.string(), // Skills is not required, so no additional validation
});

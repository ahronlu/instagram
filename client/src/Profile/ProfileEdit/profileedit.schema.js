import * as Yup from "yup";

export const ProfileEditSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Full Name is required")
    .matches(
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
      "Please enter your full name."
    ),
  avatar: Yup.string(),
  bio: Yup.string().max(30, "Bio should contain no more than 30 characters"),
});

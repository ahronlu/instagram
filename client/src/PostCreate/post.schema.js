import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required"),
  description: Yup.string().max(2000, "Description is too long"),
});

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/img/bgbgbg.jpg";
import { ReactComponent as Logo } from "../../assets/svg/logos.svg";
import { CustomButton } from "../../components/buttons/CustomButton";
import CenterModal from "../../components/Modal/CenterModal";
import { TextInput } from "../../components/reusables/TextInput";
import { useFormik } from "formik/dist";
import { coverLetterValidationSchema } from "../../utils/validationSchema/coverletter.validations";
import useOpenApiRequest from "../../utils/hooks/useOpenApiRequest";
import parse from "html-react-parser";
import { copyToClipboard } from "../../utils/libs";
import PageLoader from "../../components/PageLoader";

const Landing = () => {
  const { handleCoverLetterRequest, apiResponse, loading } =
    useOpenApiRequest();

  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      contactEmail: "",
      jobRole: "",
      company: "",
      experience: "",
      skills: "",
    },

    onSubmit: async () => {
      const payload = `
      Hi, Please i need you to help me create a cover letter.
      Details below:
      Full name: ${values?.fullname},
      My Contact Email: ${values?.contactEmail},
      The Role i am Applying for: ${values?.jobRole},
      I have ${values?.experience} years of experience as a ${values?.jobRole},
      The Company i am applying to: ${values?.company},
      ${
        values?.skills !== "" && `These are the skills i have ${values?.skills}`
      }

      PS: Make it to be atleast two paragraph long
      `;

      await handleCoverLetterRequest(payload);
    },

    validationSchema: coverLetterValidationSchema,
  });

  const {
    handleChange,
    handleBlur,
    errors,
    values,
    handleSubmit,
    dirty,
    isValid,
  } = formik;

  useEffect(() => {
    // disconnectMetaMask();
    localStorage.clear();
  }, []);

  return (
    <>
      {loading && <PageLoader message="Generating" />}
      <div className="relative bg-black text-black font-jarkata w-full h-screen">
        <img src={Hero} className="w-full h-screen object-cover" alt="hero" />
        <div className="absolute mt-10 ml-10 md:ml-20 top-0">
          <div className="flex gap-2 items-center">
            <Logo style={{ width: "50px", height: "50px" }}/>
            <span className="font-semibold text-xl font-poppins">CoverJobs</span>
          </div>
          <div className="mt-40 text-2xl md:text-6xl font-bold">
            Get your COVER LETTER <br />
            in seconds.
          </div>
          <div className="mt-10 font-semibold">Simple, Safe, Secure 😉.</div>
          <div className="mt-5">
            <CustomButton
              handleClick={() => setOpenModal(true)}
              labelText="Get Started"
              containerVariant="py-5 px-10 rounded-full flex justify-center"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full text-center pb-5">
          <p className="text-black text-sm">Developed by Kolawole Ayoola</p>
        </div>
      </div>

      {/* simple modal for cover letter request */}
      {openModal && (
        <div className="w-full mx-10 md:mx-20 ">
          <CenterModal
            title="Set your keywords"
            handleClose={() => setOpenModal(false)}
            background={Hero}
            buttonVariant="primary"
          >
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="w-full col-span-1 space-y-4">
                <div>
                  <TextInput
                    label="Full Name"
                    name="fullname"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values?.fullname}
                    error={errors?.fullname}
                  />
                </div>
                <div>
                  <TextInput
                    label="Contact Email"
                    name="contactEmail"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values?.contactEmail}
                    error={errors?.contactEmail}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <TextInput
                    label="Company"
                    name="company"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values?.company}
                    error={errors?.company}
                  />
                  <TextInput
                    label="Job Role"
                    name="jobRole"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values?.jobRole}
                    error={errors?.jobRole}
                  />
                </div>
                <div>
                  <TextInput
                    label="Relevant Experience for the Position (Years)"
                    name="experience"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values?.experience}
                    error={errors?.experience}
                  />
                </div>
                <div>
                  <TextInput
                    label="Skills (Optional)"
                    name="skills"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values?.skills}
                    error={errors?.skills}
                  />
                </div>
                <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2">
                  <CustomButton
                    handleClick={handleSubmit}
                    labelText="Generate"
                    isDisabled={!(dirty && isValid)}
                  />
                  <CustomButton labelText="Cancel" buttonVariant="secondary" />
                </div>
              </div>

              <div className="col-span-2">
                <div className="w-full p-5 h-[71vh] overflow-scroll border-2 border-black border-dashed rounded-3xl">
                  {apiResponse !== "" && (
                    <div className="flex justify-end">
                      <CustomButton
                        containerVariant="px-3 rounded-full flex justify-center"
                        labelText="Copy"
                        buttonVariant="secondary"
                        handleClick={() => copyToClipboard(apiResponse)}
                      />
                    </div>
                  )}
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {parse(apiResponse?.toString())}
                  </pre>
                </div>
              </div>
            </div>
          </CenterModal>
        </div>
      )}
    </>
  );
};

export default Landing;

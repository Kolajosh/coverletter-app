import { useEffect, useState } from "react";
import Hero from "../../assets/img/bg1.jpg";
import LogoIcon from "../../assets/svg/logos.svg?react";
import { CustomButton } from "../../components/buttons/CustomButton";
import CenterModal from "../../components/Modal/CenterModal";
import { TextInput } from "../../components/reusables/TextInput";
import { useFormik } from "formik";
import { coverLetterValidationSchema } from "../../utils/validationSchema/coverletter.validations";
import useOpenApiRequest from "../../utils/hooks/useOpenApiRequest";
import parse from "html-react-parser";
import { copyToClipboard } from "../../utils/libs";
import PageLoader from "../../components/PageLoader";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";

interface FormValues {
  fullname: string;
  contactEmail: string;
  jobRole: string;
  company: string;
  experience: string;
  skills: string;
}

const Landing: React.FC = () => {
  const { handleCoverLetterRequest, apiResponse, loading } =
    useOpenApiRequest();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      fullname: "",
      contactEmail: "",
      jobRole: "",
      company: "",
      experience: "",
      skills: "",
    },
    validationSchema: coverLetterValidationSchema,
    onSubmit: async (values) => {
      await handleCoverLetterRequest(values);
    },
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Helmet>
        <title>CoverJobs</title>
        <meta
          name="description"
          content="Generate your cover letter for any job role in seconds. Simple, safe and secure"
        />
        <link rel="canonical" href="https://coverjobs.vercel.app/" />
      </Helmet>
      {loading && <PageLoader message="Generating" />}
      <div className="relative bg-black text-white font-jakarta w-full h-screen">
        <div className="absolute w-full mt-10 px-10 text-left top-0">
          <div className="flex gap-2 items-center">
            <LogoIcon style={{ width: "30px", height: "30px" }} />
            <span className="font-normal text-xs font-poppins">
              Simple Cover Letter Generator
            </span>
          </div>
          <div className="w-full sm:w-[600px] m-auto space-y-5">
            <div className="mt-20 text-3xl md:text-5xl font-bold">
              Cover Letters in seconds.
            </div>
            <p className="text-xl">
              <Typewriter
                words={[
                  "Still not getting interview invites?",
                  "Might be your cover letter, just saying 👀",
                  "Recruiters aren’t mind readers — give them something to work with",
                  "No more excuses. Generate one now. ✨",
                  "No more excuses. Generate one now. ✨",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </p>
            <div className="pt-10">
              <CustomButton
                handleClick={() => setOpenModal(true)}
                labelText="Get Started"
                buttonVariant="secondary"
                containerVariant="py-3 px-7 rounded-md flex justify-center"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full text-center pb-5">
          <p className="text-white text-xs">
            A Simple Project by{" "}
            <span className="underline">
              <a
                href="https://kolawolejosh.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Kolawole Ayoola
              </a>
            </span>
          </p>
          <p className="text-white text-xs">~ Building things that matter ~</p>
        </div>
      </div>

      {openModal && (
        <div className="w-full mx-10 md:mx-20">
          <CenterModal
            title="Set your keywords"
            handleClose={() => setOpenModal(false)}
            // background={Hero}
          >
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="w-full col-span-1 space-y-4">
                {apiResponse && (
                  <span className="md:hidden block text-xs text-red-500">
                    Scroll down to view cover letter
                  </span>
                )}
                <TextInput
                  label="Full Name"
                  name="fullname"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  error={formik.errors.fullname}
                />
                <TextInput
                  label="Contact Email"
                  name="contactEmail"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.contactEmail}
                  error={formik.errors.contactEmail}
                />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <TextInput
                    label="Company"
                    name="company"
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.company}
                    error={formik.errors.company}
                  />
                  <TextInput
                    label="Job Role"
                    name="jobRole"
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.jobRole}
                    error={formik.errors.jobRole}
                  />
                </div>
                <TextInput
                  label="Relevant Experience (Years)"
                  name="experience"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.experience}
                  error={formik.errors.experience}
                />
                <TextInput
                  label="Skills (Optional)"
                  name="skills"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.skills}
                  error={formik.errors.skills}
                />
                <div className="w-full pt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <CustomButton
                    handleClick={formik.handleSubmit}
                    labelText="Generate"
                    isDisabled={!formik.dirty || !formik.isValid}
                    containerVariant="py-3 px-7 rounded-full flex justify-center"
                    buttonVariant="primary"
                  />
                  <CustomButton
                    labelText="Cancel"
                    buttonVariant="secondary"
                    handleClick={() => setOpenModal(false)}
                    containerVariant="py-3 px-7 rounded-full flex justify-center"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <div className="w-full p-5 h-[71vh] text-sm overflow-scroll rounded-md">
                  {apiResponse && (
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
                    {parse(apiResponse?.toString() || "")}
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

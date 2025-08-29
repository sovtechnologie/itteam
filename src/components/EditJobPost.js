import React from "react";
import "../stylesheets/JobPost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUpdateSingleJob } from "../hook/JobPost/useUpdateSingleJob";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleJob } from "../hook/JobPost/useGetSInglejob";
import { useDeleteJob } from "../hook/JobPost/useDeletejob";

const EditJobPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const addJobMutation = useUpdateSingleJob();
    const deleteJobMutation = useDeleteJob();
    const { data, isLoading } = useGetSingleJob(id);

    // Prepare initialValues based on fetched data or default empty
    const jobData = data?.result?.[0];
    const initialValues = {
        JobProfile: jobData?.JobProfile || "",
        experience: jobData?.experience || "",
        salary: jobData?.salary ? String(jobData.salary) : "",
        Job_type: jobData?.Job_type || "",
        Shift: jobData?.Shift || "",
        qualifications: jobData?.qualifications || "",
        jobDescription: jobData?.jobDescription || "",
        location: jobData?.location || "",
        skillInput: jobData?.skill?.join(", ") || "",
        skill: jobData?.skill || [],
        days: jobData?.days || "",
        state: jobData?.state || "",
        contractDurations: jobData?.contractDurations || "",
        mode: jobData?.mode || "",
    };

    const validationSchema = Yup.object({
        JobProfile: Yup.string().required("Job Profile is required"),
        experience: Yup.number().min(0, "Minimum 0 years").required("Experience is required"),
        salary: Yup.string().required("Salary is required"),
        Job_type: Yup.string().required("Job Type is required"),
        Shift: Yup.string().required("Shift is required"),
        qualifications: Yup.string().required("Qualifications are required"),
        jobDescription: Yup.string().min(30, "At least 30 characters").required("Job Description is required"),
        location: Yup.string().required("Location is required"),
        skillInput: Yup.string()
            .required("Please enter at least one skill"),
        skill: Yup.array()
            .of(Yup.string())
            .min(1, "At least one skill is required"),
        days: Yup.number().min(1, "Must be at least 1").required("Days are required"),
        state: Yup.string().required("State is required"),
        contractDurations: Yup.string().required("Contract Duration is required"),
        mode: Yup.string().required("Mode is required"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const skillArray = values.skillInput
            .split(",")
            .map(s => s.trim())
            .filter(s => s.length > 0);
        const dataToSubmit = { ...values, skill: skillArray, userId: id };

        addJobMutation.mutate(dataToSubmit, {
            onSuccess: (data) => {
                console.log("Job posted successfully!");
            },
            onError: (error) => {
                console.log(error || "Failed to post job");
            },
            onSettled: () => {
                setSubmitting(false);
            },
        });
    };


    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            deleteJobMutation.mutate(id, {
                onSuccess: () => {

                    // Redirect or update UI after deletion
                    // For example, navigate to jobs list page:
                    navigate('/employer');
                },
                onError: (error) => {
                    alert(error || "Failed to delete job");
                },
            });
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
            {({ isSubmitting, setFieldValue, values }) => (
                <Form className="jobpost-form">
                    <div className="form-row">
                        <div className="form-col">
                            <label>Job Profile</label>
                            <Field name="JobProfile" type="text" />
                            <ErrorMessage name="JobProfile" component="div" className="error" />
                        </div>

                        <div className="form-col">
                            <label>Experience</label>
                            {/* <Field name="experience" type="number" min="0" /> */}
                            <Field as="select" name="experience">
                                <option value="">Select experience</option>
                                <option value={1}>Fresher-Level</option>
                                <option value={2}>Mid-Level</option>
                                <option value={3}>Senior-Level</option>
                                <option value={4}>Director-Level</option>
                            </Field>
                            <ErrorMessage name="experience" component="div" className="error" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            <label>Salary</label>
                            <Field name="salary" type="text" />
                            <ErrorMessage name="salary" component="div" className="error" />
                        </div>

                        <div className="form-col">
                            <label>Job Type</label>
                            <Field as="select" name="Job_type">
                                <option value="">Select job type</option>
                                <option value={1}>Full-time</option>
                                <option value={2}>Part-time</option>
                                <option value={3}>Remote</option>
                                <option value={4}>Internship</option>
                                <option value={5}>Hybrid</option>
                                <option value={6}>Contract</option>

                            </Field>
                            <ErrorMessage name="Job_type" component="div" className="error" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            <label>Shift</label>
                            <Field as="select" name="Shift">
                                <option value="">Select shift</option>
                                <option value={1}>General</option>
                                <option value={2}>US</option>
                                <option value={3}>UK</option>
                            </Field>
                            <ErrorMessage name="Shift" component="div" className="error" />
                        </div>
                        <div className="form-col">
                            <label>Qualifications</label>
                            <Field name="qualifications" type="text" />
                            <ErrorMessage name="qualifications" component="div" className="error" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            {/* <label>Skill</label>
                            <Field name="skill" type="text" />
                            <ErrorMessage name="skill" component="div" className="error" /> */}
                            <label>Skills</label>
                            <Field
                                name="skillInput"
                                type="text"
                                placeholder="e.g. JavaScript, React, Node.js"
                                value={values.skillInput}
                                onChange={(e) => {
                                    setFieldValue("skillInput", e.target.value);
                                    // Optionally, update skill array live (not required)
                                    const arr = e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter((s) => s.length > 0);
                                    setFieldValue("skill", arr);
                                }}
                            />
                            <ErrorMessage name="skillInput" component="div" className="error" />

                        </div>
                        <div className="form-col">
                            <label>Location</label>
                            <Field name="location" type="text" />
                            <ErrorMessage name="location" component="div" className="error" />
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-col">
                            <label>Days</label>
                            <Field name="days" type="number" min="1" />
                            <ErrorMessage name="days" component="div" className="error" />
                        </div>
                        <div className="form-col">
                            <label>State</label>
                            <Field name="state" type="text" />
                            <ErrorMessage name="state" component="div" className="error" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            <label>Contract Duration</label>
                            <Field name="contractDurations" type="text" />
                            <ErrorMessage name="contractDurations" component="div" className="error" />
                        </div>
                        <div className="form-col">
                            <label>Mode</label>
                            <Field as="select" name="mode">
                                <option value="">Select mode</option>
                                <option value={1}>Onsite</option>
                                <option value={2}>Remote</option>
                                <option value={3}>Hybrid</option>
                            </Field>
                            <ErrorMessage name="mode" component="div" className="error" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col-full" >
                            <label>Job Description</label>
                            <Field name="jobDescription" as="textarea" />
                            <ErrorMessage name="jobDescription" component="div" className="error" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col-full" >
                            <button type="submit" className="jobpost-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? "Posting..." : "Update Job"}</button>
                        </div>
                        <div className="form-col-full" >
                            <button className="jobpost-submit-btn" onClick={handleDelete}>
                                Delete</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik >
    );
};

export default EditJobPost;

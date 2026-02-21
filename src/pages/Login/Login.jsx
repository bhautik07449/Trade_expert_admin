import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { CommonTextField } from "../../components/widgets/common_textField";
import CommonButton from "../../components/widgets/common_button";
import { AppImages } from "../../common/ImagePath";
import { login, setLoggedIn } from "../../store/slice/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "../../components/ui/use-toast";

const Login = () => {
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().required(t("messages.emailRequired")),
        password: Yup.string()
            .min(8, t("messages.password"))
            .matches(/[A-Z]/, t("messages.passwordUppercase"))
            .matches(/[a-z]/, t("messages.passwordLowercase"))
            .matches(/[0-9]/, t("messages.passwordNumber"))
            .matches(/[!@#$%^&*_,]/, t("messages.passwordSpecialChar"))
            .required(t("messages.passwordRequired")),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            // const response = await dispatch(login(values)).unwrap();
            const response = true; // Mocking successful login response
            if (response) {
                localStorage.setItem("isLoggedIn", "true");
                dispatch(setLoggedIn(true));
                toast({
                    variant: "success",
                    title: "Login Successful",
                    description: "You have successfully logged in.",
                });
                navigate("/");
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Login Failed",
                description: error.message || "An error occurred during login.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-[#0f0f0f] dark:via-[#1a1a1a] dark:to-[#0f0f0f] p-4">

            <div className="w-full max-w-md bg-white dark:bg-[#141414] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 animate-fadeIn">

                <div className="flex flex-col items-center">
                    <div className="w-24 mb-6">
                        <img src={AppImages.logoIconDark} alt="logo" className="block dark:hidden w-full" />
                        <img src={AppImages.logoIcon} alt="logoDark" className="hidden dark:block w-full" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                        Sign in to continue to your dashboard
                    </p>
                </div>

                <form className="mt-10 space-y-6" onSubmit={formik.handleSubmit}>
                    <CommonTextField
                        label={t("email")}
                        type="text"
                        name="email"
                        placeholder={t("emailPlaceholder")}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                    />

                    <CommonTextField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        isPassword
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                    />

                    <CommonButton
                        type="submit"
                        className="w-full py-3 text-lg rounded-xl"
                        isLoading={formik.isSubmitting}
                    >
                        Sign In
                    </CommonButton>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
import { useEffect, useState } from "react";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import Settingservice from "../../../../service/setting.service";

const SOCIALS = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/username" },
  { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/username" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
  { key: "google", label: "Google+", placeholder: "https://google.com" },
  { key: "linkedIn", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/channel" },
  { key: "pinterest", label: "Pinterest", placeholder: "https://pinterest.com/username" },
];

export default function SocialSetting() {
  const [enabledSocials, setEnabledSocials] = useState({});
  const [data, setData] = useState({});

  const initialValues = {
    facebook: data?.facebook || "",
    twitter: data?.twitter || "",
    instagram: data?.instagram || "",
    google: data?.google || "",
    linkedIn: data?.linkedIn || "",
    youtube: data?.youtube || "",
    pinterest: data?.pinterest || ""
  };

  const validationSchema = Yup.object({
    facebook: Yup.string().url("Enter valid URL"),
    twitter: Yup.string().url("Enter valid URL"),
    instagram: Yup.string().url("Enter valid URL"),
    google: Yup.string().url("Enter valid URL"),
    linkedIn: Yup.string().url("Enter valid URL"),
    youtube: Yup.string().url("Enter valid URL"),
    pinterest: Yup.string().url("Enter valid URL")
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        const res = await Settingservice.updateSocial(values);

        if (res) {
          getData();
        }

      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const getData = async () => {
    try {

      const res = await Settingservice.getSocial();

      if (res) {
        const socialData = res?.data;

        setData(socialData);

        const enabled = {};
        SOCIALS.forEach(({ key }) => {
          enabled[key] = !!socialData?.[key];
        });

        setEnabledSocials(enabled);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSwitchChange = (key, checked) => {

    setEnabledSocials((prev) => ({
      ...prev,
      [key]: checked
    }));

    if (!checked) {
      formik.setFieldValue(key, "");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <BackPath />
        <h3 className="h5-bold">Social Settings</h3>
      </div>

      <Card className="p-6">
        <form className="grid gap-6" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOCIALS.map(({ key, label, placeholder }) => {
              const enabled = enabledSocials[key] || false;

              return (
                <div
                  key={key}
                  className={`rounded-lg border p-4 ${enabled ? "bg-background" : "bg-muted/40"}`}
                >
                  <div className="flex items-center justify-between">
                    <Label>{label}</Label>

                    <Switch
                      checked={enabled}
                      onCheckedChange={(val) => handleSwitchChange(key, val)}
                    />
                  </div>

                  {enabled && (
                    <div className="mt-4">
                      <CommonTextField
                        label={`${label} Link`}
                        placeholder={placeholder}
                        name={key}
                        value={formik.values[key]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[key] && formik.errors[key]}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end pt-4 border-t">
            <CommonButton type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </CommonButton>
          </div>

        </form>
      </Card>
    </div>
  );
}
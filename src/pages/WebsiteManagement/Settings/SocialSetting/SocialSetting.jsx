import { useState } from "react";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";

const SOCIALS = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/username" },
  { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/username" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
  { key: "google", label: "Google+", placeholder: "https://linkedin.com/in/username" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { key: "youTube", label: "YouTube", placeholder: "https://twitter.com/username" },
  { key: "pinterest", label: "Pinterest", placeholder: "https://instagram.com/username" },
];

export default function SocialSetting() {
  const [socials, setSocials] = useState({
    facebook: { enabled: true, link: "http://www.facebook.com/sourceseas" },
    twitter: { enabled: true, link: "http://www.twitter.com/sourceseas" },
    instagram: { enabled: true, link: "http://www.instagram.com/sourceseas" },
    google: { enabled: true, link: "http://www.google.com/sourceseas" },
    linkedin: { enabled: true, link: "http://www.inkedin.com/sourceseas" },
    youTube: { enabled: true, link: "http://www.youtube.com/sourceseas" },
    pinterest: { enabled: true, link: "http://www.pinterest.com/sourceseas" },
  });

  const toggleSocial = (key, value) => {
    setSocials(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: value,
        link: value ? prev[key].link : "",
      },
    }));
  };

  const updateLink = (key, value) => {
    setSocials(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        link: value,
      },
    }));
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <BackPath />
        <h3 className="h5-bold">Social Settings</h3>
      </div>

      <Card className="p-6">
        <form className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOCIALS.map(({ key, label, placeholder }) => {
              const isEnabled = socials[key].enabled;

              return (
                <div
                  key={key}
                  className={`rounded-lg border p-4 transition ${isEnabled ? "bg-background" : "bg-muted/40"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{label}</Label>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={(val) => toggleSocial(key, val)}
                    />
                  </div>

                  {isEnabled && (
                    <div className="mt-4">
                      <CommonTextField
                        label={`${label} Link`}
                        placeholder={placeholder}
                        value={socials[key].link}
                        onChange={(e) => updateLink(key, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <CommonButton type="submit">Save Changes</CommonButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
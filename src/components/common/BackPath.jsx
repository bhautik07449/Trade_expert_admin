import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import CommonButton from "../widgets/common_button";

const BackPath = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <CommonButton variant="outline" className="w-fit" onClick={handleBack}>
      <span className="flex items-center gap-2 w-fit">
        <ArrowLeft className="size-5" /> back
      </span>
    </CommonButton>
  );
};

export default BackPath;

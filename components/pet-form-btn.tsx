import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const PetFormBtn = ({ actionType }) => {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-5 self-end " disabled={pending} type="submit">
      {actionType === "add" ? "Add a new Pet" : "Edit Pet"}
    </Button>
  );
};

export default PetFormBtn;

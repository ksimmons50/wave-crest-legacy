import React from "react";
import { FileText } from "lucide-react";
import { RENTSPREE_APPLY_URL } from "@/professionalConstants";

interface ApplyButtonProps {
  label?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Routes applicants to the RentSpree ApplyLink, where they complete the
 * application, authorize a credit/background check, and submit income
 * verification securely on RentSpree's platform (FCRA-compliant).
 */
export default function ApplyButton({
  label = "Apply Now",
  className = "",
  showIcon = true,
}: ApplyButtonProps) {
  return (
    <a
      href={RENTSPREE_APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {showIcon && <FileText className="h-5 w-5" aria-hidden="true" />}
      <span>{label}</span>
    </a>
  );
}

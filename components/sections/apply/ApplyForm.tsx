"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Degree } from "@/lib/types/degree";
import { Faculty } from "@/lib/types/faculty";
import ApplicantTypeSelector from "./ApplicantTypeSelector";
import DegreeSelector from "./DegreeSelector";
import FacultySelector, { TeachingLanguage } from "./FacultySelector";
import StudentApplicationForm from "./StudentApplicationForm";
import AgencyApplicationForm from "./AgencyApplicationForm";
import TransferApplicationForm from "./TransferApplicationForm";
import { cn } from "@/lib/utils";

type ApplicantType = "student" | "agency" | "transfer";
type Step = "type" | "degree" | "faculty" | "form";

const STORAGE_KEY = "apply_form_state";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const STEPS: { id: Step; label: string }[] = [
  { id: "type", label: "Type" },
  { id: "degree", label: "Degree" },
  { id: "faculty", label: "Faculty" },
  { id: "form", label: "Application" },
];

export default function ApplyForm() {
  const t = useTranslations("apply");
  const [currentStep, setCurrentStep] = useState<Step>("type");
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<TeachingLanguage | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const {
          currentStep: savedStep,
          applicantType: savedType,
          selectedDegree: savedDegree,
          selectedFaculty: savedFaculty,
          selectedLanguage: savedLanguage,
          timestamp,
        } = JSON.parse(saved);

        const isExpired = timestamp && Date.now() - timestamp > SESSION_TIMEOUT;

        if (!isExpired) {
          if (savedStep) setCurrentStep(savedStep);
          if (savedType) setApplicantType(savedType);
          if (savedDegree) setSelectedDegree(savedDegree);
          if (savedFaculty) setSelectedFaculty(savedFaculty);
          if (savedLanguage) setSelectedLanguage(savedLanguage);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading apply form state:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            currentStep,
            applicantType,
            selectedDegree,
            selectedFaculty,
            selectedLanguage,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Error saving apply form state:", error);
      }
    }
  }, [currentStep, applicantType, selectedDegree, selectedFaculty, selectedLanguage, isLoaded]);

  const handleApplicantTypeSelect = (type: ApplicantType) => {
    setApplicantType(type);
  };

  const handleDegreeSelect = (degree: Degree) => {
    setSelectedDegree(degree);
    setSelectedFaculty(null);
  };

  const handleFacultySelect = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setSelectedLanguage(null);
  };

  const handleLanguageSelect = (language: TeachingLanguage) => {
    setSelectedLanguage(language);
  };

  const handleNext = () => {
    if (currentStep === "type" && applicantType) {
      setCurrentStep("degree");
    } else if (currentStep === "degree" && selectedDegree) {
      setCurrentStep("faculty");
    } else if (currentStep === "faculty" && selectedFaculty) {
      setCurrentStep("form");
    }
  };

  const handleBack = () => {
    if (currentStep === "degree") setCurrentStep("type");
    else if (currentStep === "faculty") setCurrentStep("degree");
    else if (currentStep === "form") setCurrentStep("faculty");
  };

  const canProceed = () => {
    if (currentStep === "type") return applicantType !== null;
    if (currentStep === "degree") return selectedDegree !== null;
    if (currentStep === "faculty") return selectedFaculty !== null && selectedLanguage !== null;
    return false;
  };

  const getStepIndex = (step: Step): number => {
    const steps: Step[] = ["type", "degree", "faculty", "form"];
    return steps.indexOf(step);
  };

  const isStepCompleted = (step: Step): boolean => {
    if (step === "type") return applicantType !== null;
    if (step === "degree") return selectedDegree !== null;
    if (step === "faculty") return selectedFaculty !== null && selectedLanguage !== null;
    return false;
  };

  const isStepAccessible = (step: Step): boolean => {
    const stepIndex = getStepIndex(step);
    const currentIndex = getStepIndex(currentStep);
    if (stepIndex < currentIndex) return true;
    if (stepIndex === currentIndex) return true;
    if (stepIndex === currentIndex + 1) return isStepCompleted(currentStep);
    return false;
  };

  const handleStepClick = (step: Step) => {
    if (isStepAccessible(step)) setCurrentStep(step);
  };

  const clearState = () => {
    setCurrentStep("type");
    setApplicantType(null);
    setSelectedDegree(null);
    setSelectedFaculty(null);
    setSelectedLanguage(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  if (!isLoaded) return null;

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="max-w-6xl mx-auto">

      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-center">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = isStepCompleted(step.id) && currentStepIndex > index;
            const isAccessible = isStepAccessible(step.id);

            return (
              <div key={step.id} className="flex items-center">
                {/* Step circle */}
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isAccessible}
                  className={cn(
                    "relative flex flex-col items-center group",
                    !isAccessible && "cursor-not-allowed opacity-40"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2",
                      isActive
                        ? "bg-[#059669] text-white border-[#059669]"
                        : isCompleted
                        ? "bg-[#059669] text-white border-[#059669]"
                        : "bg-white text-slate-400 border-slate-300"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium hidden sm:block",
                      isActive
                        ? "text-[#059669]"
                        : isCompleted
                        ? "text-[#059669]"
                        : "text-slate-400"
                    )}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-16 md:w-28 h-0.5 mx-2",
                      currentStepIndex > index ? "bg-[#059669]" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div>
        {currentStep === "type" && (
          <ApplicantTypeSelector
            selectedType={applicantType}
            onSelect={handleApplicantTypeSelect}
          />
        )}

        {currentStep === "degree" && (
          <DegreeSelector
            onSelect={handleDegreeSelect}
            selectedDegreeId={selectedDegree?.id}
          />
        )}

        {currentStep === "faculty" && selectedDegree && (
          <FacultySelector
            faculties={selectedDegree.faculties}
            selectedFacultyId={selectedFaculty?.id || null}
            onSelect={handleFacultySelect}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        )}

        {currentStep === "form" &&
          selectedFaculty &&
          applicantType === "student" && (
            <StudentApplicationForm
              facultyId={selectedFaculty.id}
              facultyName={selectedFaculty.name}
              degreeId={selectedDegree?.id || 0}
              degreeName={selectedDegree?.name || ""}
              teachingLanguage={selectedLanguage || "EN"}
              onSubmitSuccess={clearState}
            />
          )}

        {currentStep === "form" &&
          selectedFaculty &&
          applicantType === "agency" && (
            <AgencyApplicationForm
              facultyId={selectedFaculty.id}
              facultyName={selectedFaculty.name}
              degreeId={selectedDegree?.id || 0}
              degreeName={selectedDegree?.name || ""}
              teachingLanguage={selectedLanguage || "EN"}
              onSubmitSuccess={clearState}
            />
          )}

        {currentStep === "form" &&
          selectedFaculty &&
          applicantType === "transfer" && (
            <TransferApplicationForm
              facultyId={selectedFaculty.id}
              facultyName={selectedFaculty.name}
              degreeId={selectedDegree?.id || 0}
              degreeName={selectedDegree?.name || ""}
              teachingLanguage={selectedLanguage || "EN"}
              onSubmitSuccess={clearState}
            />
          )}
      </div>

      {/* Navigation Buttons */}
      {currentStep !== "form" && (
        <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === "type"}
            className="flex items-center gap-2 border-slate-300 text-slate-600 hover:border-[#059669] hover:text-[#059669] disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("navigation.back")}
          </Button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {t("navigation.continue")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

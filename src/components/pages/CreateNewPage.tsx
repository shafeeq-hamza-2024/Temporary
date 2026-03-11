import React, { useState } from "react";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import {
  PageCategory,
  CreatePageFormData,
  CreatePageFormErrors,
  CreatePagePayload,
} from "@/types/pages/basic.types";
import { useCreatePage } from "@/hooks/pages/useCreatePage";

const CreateNewPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const defaultState: CreatePageFormData = {
    name: "",
    category: "",
    bio: "",
    website: "",
    state: "",
    zip: "",
    country: "",
    companyName: "",
    officialWebsite: "",
    companyBio: "",
    cin: "",
    eventName: "",
    description: "",
    tags: "",
    communityDetails: "",
  };

  const [formData, setFormData] = useState<CreatePageFormData>(defaultState);
  const [errors, setErrors] = useState<CreatePageFormErrors>({});
  const createPageMutation = useCreatePage();
  const isSubmitting = createPageMutation.isPending;

  const validateForm = (): boolean => {
    const newErrors: CreatePageFormErrors = {};
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/i;

    // Base field validations
    if (!formData.name.trim()) {
      newErrors.name = "Page name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Page name must be at least 3 characters";
    }

    if (!formData.category) newErrors.category = "Category is required";

    // Optional base fields format validation
    if (formData.website?.trim() && !urlRegex.test(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    // Conditional category validations
    if (formData.category === PageCategory.COMPANY) {
      if (!formData.companyName?.trim()) {
        newErrors.companyName = "Company name is required";
      } else if (formData.companyName.trim().length < 2) {
        newErrors.companyName = "Company name is too short";
      }

      if (!formData.officialWebsite?.trim()) {
        newErrors.officialWebsite = "Official website is required";
      } else if (!urlRegex.test(formData.officialWebsite)) {
        newErrors.officialWebsite = "Please enter a valid URL";
      }

      if (!formData.companyBio?.trim()) {
        newErrors.companyBio = "Company bio is required";
      } else if (formData.companyBio.trim().length < 10) {
        newErrors.companyBio = "Company bio must be at least 10 characters";
      }

      const cinTrimmed = formData.cin?.trim();
      if (
        cinTrimmed &&
        (!/^[a-zA-Z0-9]+$/.test(cinTrimmed) || cinTrimmed.length < 5)
      ) {
        newErrors.cin = "CIN must be valid alphanumeric (min 5 chars)";
      }
    }

    if (formData.category === PageCategory.EVENT) {
      if (!formData.eventName?.trim()) {
        newErrors.eventName = "Event name is required";
      } else if (formData.eventName.trim().length < 3) {
        newErrors.eventName = "Event name must be at least 3 characters";
      }

      if (!formData.description?.trim()) {
        newErrors.description = "Event description is required";
      } else if (formData.description.trim().length < 10) {
        newErrors.description =
          "Event description must be at least 10 characters";
      }

      if (!formData.tags?.trim()) newErrors.tags = "Event tags are required";
    }

    if (formData.category === PageCategory.COMMUNITY) {
      if (!formData.communityDetails?.trim()) {
        newErrors.communityDetails = "Community details are required";
      } else if (formData.communityDetails.trim().length < 10) {
        newErrors.communityDetails =
          "Community details must be at least 10 characters";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly.");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreatePageFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: null }));
    }
  };

  const mapFormToPayload = (data: CreatePageFormData): CreatePagePayload => {
    const payload: CreatePagePayload = {
      page_name: data.name.trim(),
      category: data.category as PageCategory,
    };

    if (data.bio?.trim()) payload.bio = data.bio.trim();
    if (data.website?.trim()) payload.website = data.website.trim();
    if (data.state?.trim()) payload.state = data.state.trim();
    if (data.zip?.trim()) payload.zip = data.zip.trim();
    if (data.country?.trim()) payload.country = data.country.trim();

    if (data.category === PageCategory.COMPANY) {
      if (data.companyName?.trim()) payload.company_name = data.companyName.trim();
      if (data.officialWebsite?.trim()) payload.official_website = data.officialWebsite.trim();
      if (data.companyBio?.trim()) payload.company_bio = data.companyBio.trim();
      if (data.cin?.trim()) payload.cin = data.cin.trim();
    }

    if (data.category === PageCategory.EVENT) {
      if (data.eventName?.trim()) payload.event_name = data.eventName.trim();
      if (data.description?.trim()) payload.event_description = data.description.trim();
      if (data.tags?.trim()) payload.tags = data.tags.trim();
    }

    if (data.category === PageCategory.COMMUNITY) {
      if (data.communityDetails?.trim()) payload.community_details = data.communityDetails.trim();
    }

    return payload;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = mapFormToPayload(formData);

    toast.promise(
      createPageMutation.mutateAsync(payload),
      {
        loading: "Creating page...",
        success: (data) => `Successfully created page "${data.page_name}"!`,
        error: (err: Error) => getApiErrorMessage(err, "Failed to create page"),
      },
    ).then(() => {
      setOpen(false);
      setFormData(defaultState);
    }).catch((error) => {
      console.error("Error creating page:", error);
    });
  };

  const renderInput = (
    name: keyof CreatePageFormData,
    label: string,
    type = "text",
    placeholder = "",
    required = false,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={(formData[name] as string) || ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full p-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-primary"
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={(formData[name] as string) || ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full p-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-primary"
          }`}
        />
      )}
      {errors[name] && (
        <span className="text-xs text-red-500 mt-0.5">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent className="min-w-6xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Create New Page</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-4 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 transition-colors"
        >
          {/* Base Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("name", "Page Name", "text", "Enter page name", true)}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full p-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                  errors.category
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value={PageCategory.COMPANY}>Company / Org</option>
                <option value={PageCategory.EVENT}>Event</option>
                <option value={PageCategory.COMMUNITY}>Community</option>
                <option value={PageCategory.GENERAL}>General</option>
              </select>
              {errors.category && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.category}
                </span>
              )}
            </div>
          </div>

          {renderInput("bio", "Page Bio", "textarea", "Write a short bio")}

          {/* Conditional Fields Based on Category */}
          {formData.category && formData.category !== PageCategory.GENERAL && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-4">
              <h4 className="font-semibold text-gray-800 border-b pb-2">
                {formData.category === PageCategory.COMPANY &&
                  "Company Details"}
                {formData.category === PageCategory.EVENT && "Event Details"}
                {formData.category === PageCategory.COMMUNITY &&
                  "Community Details"}
              </h4>

              {formData.category === PageCategory.COMPANY && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderInput(
                      "companyName",
                      "Company Name",
                      "text",
                      "e.g. Acme Corp",
                      true,
                    )}
                    {renderInput(
                      "officialWebsite",
                      "Official Website",
                      "url",
                      "https://...",
                      true,
                    )}
                  </div>
                  {renderInput(
                    "companyBio",
                    "Company Bio",
                    "textarea",
                    "Detailed company bio",
                    true,
                  )}
                  {renderInput("cin", "CIN (Optional)", "text", "Enter CIN")}
                </>
              )}

              {formData.category === PageCategory.EVENT && (
                <>
                  {renderInput(
                    "eventName",
                    "Event Name",
                    "text",
                    "Enter event name",
                    true,
                  )}
                  {renderInput(
                    "description",
                    "Event Description",
                    "textarea",
                    "Describe the event",
                    true,
                  )}
                  {renderInput(
                    "tags",
                    "Tags",
                    "text",
                    "Comma separated tags",
                    true,
                  )}
                </>
              )}

              {formData.category === PageCategory.COMMUNITY && (
                <>
                  {renderInput(
                    "communityDetails",
                    "Community Details",
                    "textarea",
                    "Who is this community for?",
                    true,
                  )}
                </>
              )}
            </div>
          )}

          {/* Media Fields with Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cover Image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Cover Image (Optional)
              </label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              {formData.coverImage && (
                <div className="mt-2 w-full h-32 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-50 flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white bg-black/50 px-3 py-1 text-xs rounded-full backdrop-blur-sm">
                      Cover Preview
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Profile Image (Optional)
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              {formData.profileImage && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md relative bg-gray-50 flex items-center justify-center shrink-0">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-500 italic">
                    Profile preview
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Optional Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("website", "Website (Optional)", "url")}
            {renderInput("country", "Country (Optional)")}
            {renderInput("state", "State (Optional)")}
            {renderInput("zip", "Zip Code (Optional)")}
          </div>
        </form>

        {/* Sticky Form Actions */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-10">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit} // Added onClick here since button is outside form
            disabled={isSubmitting}
            className={`px-5 py-2.5 rounded-xl font-medium text-white transition-all flex items-center justify-center min-w-[120px] ${
              isSubmitting
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 shadow-sm hover:shadow"
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Page"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPage;

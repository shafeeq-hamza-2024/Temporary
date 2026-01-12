import { useState, useEffect, useRef } from "react";
import { getQRcode } from "../../api/qrApi";

import {
    useUserProfile,
    useUpdateUserProfile,
} from "../../hooks/profile/useUserProfile";

import { usePersonalDetail, useUpdatePersonalDetail } from "../../hooks/profile/usePersonalDetail";

import { useProfessionalDetail, useUpdateProfessionalDetail } from "../../hooks/profile/useProfessionalDetail";

import { useScientificInterest, useUpdateScientificInterest } from "../../hooks/profile/useScientificInterest";

export default function GATCRegistration() {


    // FETCH
    const { data: userData, isLoading: loadingUser } = useUserProfile();
    const { data: personalData } = usePersonalDetail();
    const { data: professionalData } = useProfessionalDetail();
    const { data: scientificData } = useScientificInterest();

    // UPDATE

    const updateUser = useUpdateUserProfile();
    const updatePersonal = useUpdatePersonalDetail();
    const updateProfessional = useUpdateProfessionalDetail();
    const updateScientific = useUpdateScientificInterest();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchText, setSearchText] = useState({
        ra: "",
        mf: "",
        sr: "",
        os: "",
        ar: "",
    });


    const [step, setStep] = useState(1);

    // STEP 1 DATA
    const [country, setCountry] = useState("");

    // STEP 2 DATA
    const [selectedPlan, setSelectedPlan] = useState(null);

    // STEP 3 DATA
    const [qrData, setQrData] = useState(null);
    const [loadingQR, setLoadingQR] = useState(false);

    // ---------------- HELPER ----------------
    const filterOptions = (options, key) =>
        options.filter((opt) =>
            opt.toLowerCase().includes(searchText[key].toLowerCase())
        );


    const isStep1Valid = () => {
        return (
            basic.title &&
            basic.first_name &&
            basic.last_name &&
            personal.gender &&
            personal.dob &&
            personal.city &&
            personal.country &&
            professional.current_organization &&
            professional.current_role &&
            professional.current_department &&
            professional.contact_number &&
            professional.work_address &&
            scientific.research_area_of_expertise &&
            scientific.major_focus.length > 0 &&
            scientific.specific_research_areas.length > 0 &&
            scientific.organ_sites.length > 0
        );
    };




    /* 1️⃣ Research Area of Expertise (single) */
    const RESEARCH_AREA_OPTIONS = [
        "Aging and Cancer",
        "Behavioral and Implementation Science",
        "Biochemistry and Biophysics",
        "Bioengineering and Biomaterials",
        "Bioinformatics, Computational Biology, and Systems Biology",
        "Biostatistics",
        "Cancer Disparities Research",
        "Cancer Evolution",
        "Cancer Metabolism",
        "Cancer Modeling",
        "Cancer Prevention Research",
        "Cell Biology",
        "Chemistry and Chemical Biology",
        "Clinical Research",
        "Clinical Trials",
        "Convergence Cancer Science",
        "Data Science and Artificial Intelligence",
        "Developmental Biology",
        "Diagnostics and Biomarkers",
        "Drug Discovery and Development",
        "Early Detection and Interception",
        "Endocrinology",
        "Epigenetics",
        "Experimental and Molecular Therapeutics",
        "Genetics",
        "Genomics",
        "Immunology",
        "Microenvironment",
        "Molecular Biology",
        "Pathology",
        "Pharmacology and Toxicology",
        "Population Sciences",
        "Radiation Science and Medicine",
        "Surgical Oncology",
        "Survivorship Research",
        "Translational Research",
        "Tumor Biology / Tumor Microenvironment",
        "Other",
    ];


    /* 2️⃣ Major Focus */
    const MAJOR_FOCUS_OPTIONS = [
        "Advocacy",
        "Basic Science",
        "Business Development",
        "Clinical Practice",
        "Clinical Research",
        "Population Science",
        "Regulatory Science and Health Policy",
        "Research Administration",
        "Science Education",
        "Science Education and Training",
        "Translational Research",
    ];

    /* 3️⃣ Specific Research Areas (LARGE – searchable) */
    const SPECIFIC_RESEARCH_AREA_OPTIONS = [
        "Aging",
        "AIDS and Cancer",
        "Angiogenesis",
        "Animal Models",
        "Apoptosis",
        "Biochemical Modulators of Therapy and Toxicity",
        "Biological Response Modifiers",
        "Biomarkers",
        "Bone Marrow Transplantation",
        "Cachexia",
        "Cancer Control and Screening",
        "Cancer Disparities",
        "Cancer Epidemiology",
        "Cancer Genetics",
        "Cancer Immunology",
        "Cancer Metabolism",
        "Cancer Stem Cells",
        "Cancer Vaccines",
        "Carcinogenesis",
        "Cell Adhesion Molecules",
        "Cell and Tissue Culture",
        "Cell Cycle Regulation",
        "Cell Death (Apoptosis)",
        "Chemoprevention",
        "Chemotherapy",
        "Chromatin Structure and Function",
        "Clinical Trials",
        "Combined Modalities of Therapy",
        "Computational Biology",
        "DNA Damage and Repair",
        "DNA Methylation",
        "Drug Delivery Systems",
        "Drug Metabolism",
        "Drug Resistance",
        "Early Detection",
        "Epigenetics and Epigenomics",
        "Experimental Immunotherapy",
        "Extracellular Matrix",
        "Flow Cytometry",
        "Gene Expression",
        "Gene Therapy",
        "Genetic Predisposition and Cancer Risk",
        "Imaging",
        "Immunobiology",
        "Immunotherapy (Clinical)",
        "Immunotherapy (Experimental)",
        "Inflammation",
        "Invasion and Metastasis",
        "Microbiome Research",
        "MicroRNAs",
        "Molecular Carcinogenesis",
        "Nanotechnology",
        "Oncogenes",
        "Population-Based Studies",
        "Precision Medicine",
        "Radiation Biology",
        "Radiation Therapy",
        "Signal Transduction",
        "Single-Cell Analysis",
        "Stem Cells",
        "Systems Biology",
        "Tumor Angiogenesis",
        "Tumor Heterogeneity",
        "Tumor Immunology",
        "Tumor Microenvironment",
        "Tumor Progression",
        "Tumor Suppressor Genes",
        "Viral Carcinogenesis",
        "Other",
    ];


    /* 4️⃣ Organ Sites */
    const ORGAN_SITE_OPTIONS = [
        "Bone",
        "Brain and Central Nervous System",
        "Breast",
        "Colon and Rectum",
        "Esophagus",
        "Eye",
        "Gastrointestinal",
        "Head and Neck",
        "Kidney",
        "Larynx",
        "Leukemia",
        "Liver",
        "Lung and Bronchus",
        "Lymphoma",
        "Melanoma",
        "Multiple Myeloma",
        "Neuroblastoma",
        "Ovary",
        "Pancreas",
        "Pediatric",
        "Prostate",
        "Sarcoma and Soft Tissue",
        "Skin",
        "Stomach",
        "Testis",
        "Thyroid",
        "Urinary Bladder",
        "Uterine Cervix",
        "Uterine Corpus",
    ];


    /* 5️⃣ Additional Research Areas */
    const ADDITIONAL_RESEARCH_AREA_OPTIONS = [
        "Aging and Cancer",
        "Behavioral and Implementation Science",
        "Biochemistry and Biophysics",
        "Bioengineering and Biomaterials",
        "Bioinformatics, Computational Biology, and Systems Biology",
        "Biostatistics",
        "Cancer Disparities Research",
        "Cancer Evolution",
        "Cancer Metabolism",
        "Cancer Modeling",
        "Cancer Prevention Research",
        "Cell Biology",
        "Chemistry and Chemical Biology",
        "Clinical Research",
        "Clinical Trials",
        "Convergence Cancer Science",
        "Data Science and Artificial Intelligence",
        "Developmental Biology",
        "Diagnostics and Biomarkers",
        "Drug Discovery and Development",
        "Early Detection and Interception",
        "Endocrinology",
        "Epigenetics",
        "Experimental and Molecular Therapeutics",
        "Genetics",
        "Genomics",
        "Immunology",
        "Microenvironment",
        "Molecular Biology",
        "Pathology",
        "Pharmacology and Toxicology",
        "Population Sciences",
        "Radiation Science and Medicine",
        "Surgical Oncology",
        "Survivorship Research",
        "Translational Research",
        "Tumor Biology / Tumor Microenvironment",
        "Other",
    ];

    const dropdownWrapperRef = useRef(null);

    // --------------------- STATE ---------------------
    const [basic, setBasic] = useState({
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        profile_title: "",
    });

    const [personal, setPersonal] = useState({
        city: "",
        country: "",
        gender: "",
        dob: "",
    });


    const [professional, setProfessional] = useState({
        current_role: "",
        current_organization: "",
        current_department: "",
        contact_number: "",
        website: "",
        work_address: "",

    });


    const [scientific, setScientific] = useState({
        research_area_of_expertise: "",
        major_focus: [],
        specific_research_areas: [],
        organ_sites: [],
        additional_research_areas: [],
    });






    // ---------------- PRICE LOGIC ----------------
    const prices = {
        India: {
            "Students (MSc/PhD)": { label: "₹3,500", value: 3500 },
            "Faculty / Academic / Clinicians": { label: "₹5,500", value: 5500 },
            "Industry Professionals": { label: "₹6,500", value: 6500 },
        },
        International: {
            "Students (MSc/PhD)": { label: "$200", value: 18000 },
            "Faculty / Academic / Clinicians": { label: "$350", value: 31500 },
            "Industry Professionals": { label: "$600", value: 54000 },
        },
    };

    const priceTable =
        country === "India" ? prices.India : prices.International;

    // ---------------- STEP 2 SELECT PLAN ----------------
    const handleSelectPlan = (category, price) => {
        setSelectedPlan({ category, price });
    };

    // ---------------- STEP 2 → STEP 3 ----------------
    const handleProceedToPayment = async () => {
        if (!selectedPlan) return;

        setLoadingQR(true);
        setQrData(null);

        try {
            const upiUrl =
                "upi://pay?pa=8779065961.eazypay@icici&pn=M/S.BENCOS RESEARCH SOLUTIONS PRIVATE LTD &tr=EZYS8779065961&cu=INR&mc=7392" +
                `&am=${selectedPlan.price.value}`;

            const res = await getQRcode(upiUrl);
            setQrData(res);
            setStep(3);
        } catch (err) {
            console.error("QR generation failed", err);
        } finally {
            setLoadingQR(false);
        }
    };

    useEffect(() => {
        if (personal.country) {
            setCountry(personal.country);
        }
    }, [personal.country]);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownWrapperRef.current &&
                !dropdownWrapperRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
                setSearchText({
                    ra: "",
                    mf: "",
                    sr: "",
                    os: "",
                    ar: "",
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);





    // --------------------- LOAD DATA INTO STATE ---------------------
    useEffect(() => {
        if (userData) {
            setBasic({
                title: userData.title || "",
                first_name: userData.first_name || "",
                middle_name: userData.middle_name || "",
                last_name: userData.last_name || "",
                profile_title: userData.profile_title || "",
            });
        }

        if (personalData) {
            setPersonal({
                city: personalData.city || "",
                country: personalData.country || "",
                gender: personalData.gender || "",
                dob: personalData.dob || "",
            });
        }

        if (professionalData) {
            setProfessional({
                current_role: professionalData.current_role || "",
                current_organization: professionalData.current_organization || "",
                current_department: professionalData.current_department || "",
                work_email: professionalData.work_email || "",
                contact_number: professionalData.contact_number || "",
                work_address: professionalData.work_address || "",

            });
        }


    }, [userData, personalData, professionalData]);


    useEffect(() => {
        if (scientificData) {
            setScientific({
                research_area_of_expertise:
                    scientificData.research_area_of_expertise || "",
                major_focus: scientificData.major_focus || [],
                specific_research_areas:
                    scientificData.specific_research_areas || [],
                organ_sites:
                    scientificData.organ_sites || [],
                additional_research_areas:
                    scientificData.additional_research_areas || [],
            });
        }
    }, [scientificData]);

    const handleSaveAndProceed = async (e) => {
        e.preventDefault();

        if (!isStep1Valid()) {
            alert("Please complete all required fields to continue.");
            return;
        }

        try {
            await updateUser.mutateAsync(basic);
            await updatePersonal.mutateAsync(personal);
            await updateProfessional.mutateAsync(professional);
            await updateScientific.mutateAsync(scientific);

            setStep(2); // ✅ MOVE FORWARD
        } catch (err) {
            console.error("Step 1 save failed:", err);
            alert("Failed to save profile. Please try again.");
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpenDropdown(null);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);






    return (
        <>
            {/* ================= HEADER ================= */}
            <section className="bg-primary text-white text-center py-5">
                <h2 className="fw-bold mb-1">GATC 2026 Registration</h2>
                <p className="mb-0">
                    International Genomics Advancements Through Convergence
                </p>
            </section>

            <section className="bg-light py-5">
                <div className="container">
                    <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">

                        {/* STEP INDICATOR */}
                        <div className="d-flex justify-content-between mb-5 small text-muted">
                            <span className={step === 1 ? "fw-bold text-primary" : ""}>
                                <i className="ri-user-line me-1"></i> Details
                            </span>
                            <span className={step === 2 ? "fw-bold text-primary" : ""}>
                                <i className="ri-bookmark-line me-1"></i> Category
                            </span>
                            <span className={step === 3 ? "fw-bold text-primary" : ""}>
                                <i className="ri-secure-payment-line me-1"></i> Payment
                            </span>
                        </div>

                        {/* ================= STEP 1 ================= */}
                        {step === 1 && (
                            <form onSubmit={handleSaveAndProceed}>

                                {/* ================= PERSONAL DETAILS ================= */}
                                <h4 className="text-primary mb-4">
                                    <i className="ri-user-3-line me-2"></i>
                                    Personal Details
                                </h4>

                                <div className="row g-4">

                                    {/* TITLE */}
                                    <div className="col-md-2">
                                        <label className="form-label">Title *</label>
                                        <select
                                            className="form-select"
                                            value={basic.title}
                                            onChange={(e) => setBasic({ ...basic, title: e.target.value })}
                                            required
                                        >

                                            <option value="">—</option>
                                            <option>Prof</option>
                                            <option>Dr</option>
                                            <option>Mr</option>
                                            <option>Ms</option>
                                        </select>
                                    </div>

                                    {/* FIRST NAME */}
                                    <div className="col-md-4">
                                        <label className="form-label">First Name *</label>
                                        <input
                                            className="form-control"
                                            value={basic.first_name}
                                            onChange={(e) =>
                                                setBasic({ ...basic, first_name: e.target.value })
                                            }
                                            required
                                        />

                                    </div>

                                    {/* MIDDLE NAME */}
                                    <div className="col-md-3">
                                        <label className="form-label">Middle Name</label>
                                        <input
                                            className="form-control"
                                            value={basic.middle_name}
                                            onChange={(e) =>
                                                setBasic({ ...basic, middle_name: e.target.value })
                                            }
                                        />

                                    </div>

                                    {/* LAST NAME */}
                                    <div className="col-md-3">
                                        <label className="form-label">Last Name *</label>
                                        <input
                                            className="form-control"
                                            value={basic.last_name}
                                            onChange={(e) =>
                                                setBasic({ ...basic, last_name: e.target.value })
                                            }
                                            required
                                        />

                                    </div>

                                    {/* GENDER */}
                                    <div className="col-md-6">
                                        <label className="form-label">Gender *</label>
                                        <select
                                            className="form-select"
                                            value={personal.gender}
                                            onChange={(e) =>
                                                setPersonal({ ...personal, gender: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    {/* DOB */}
                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth *</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={personal.dob}
                                            onChange={(e) =>
                                                setPersonal({ ...personal, dob: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                    {/* CITY */}
                                    <div className="col-md-6">
                                        <label className="form-label">City *</label>
                                        <input
                                            className="form-control"
                                            value={personal.city}
                                            onChange={(e) =>
                                                setPersonal({ ...personal, city: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                    {/* COUNTRY */}
                                    <div className="col-md-6">
                                        <label className="form-label">Country *</label>
                                        <input
                                            className="form-control"
                                            value={personal.country}
                                            onChange={(e) =>
                                                setPersonal({ ...personal, country: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                </div>

                                {/* ================= PROFESSIONAL ================= */}
                                <h5 className="text-primary mt-5 mb-3">
                                    <i className="ri-briefcase-line me-2"></i>
                                    Professional Details
                                </h5>

                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <label className="form-label">Organization *</label>
                                        <input
                                            className="form-control"
                                            value={professional.current_organization}
                                            onChange={(e) =>
                                                setProfessional({
                                                    ...professional,
                                                    current_organization: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Role *</label>
                                        <input
                                            className="form-control"
                                            value={professional.current_role}
                                            onChange={(e) =>
                                                setProfessional({
                                                    ...professional,
                                                    current_role: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Department *</label>
                                        <input
                                            className="form-control"
                                            value={professional.current_department}
                                            onChange={(e) =>
                                                setProfessional({
                                                    ...professional,
                                                    current_department: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                {/* ================= SCIENTIFIC ================= */}
                                <h5 className="text-primary mt-5 mb-3">
                                    <i className="ri-flask-line me-2"></i>
                                    Scientific Interests
                                </h5>
                                <div ref={dropdownWrapperRef}>
                                    <div className="row g-4">

                                        {/* RESEARCH AREA */}
                                        <div className="col-md-6">
                                            <label className="form-label">Research Area *</label>
                                            <input
                                                className="form-control"
                                                value={
                                                    openDropdown === "ra"
                                                        ? searchText.ra
                                                        : scientific.research_area_of_expertise
                                                }
                                                placeholder="Select research area"
                                                onClick={() => setOpenDropdown("ra")}
                                                onChange={(e) =>
                                                    setSearchText({ ...searchText, ra: e.target.value })
                                                }
                                                readOnly={false}
                                                required
                                            />

                                            {openDropdown === "ra" && (
                                                <div className="dropdown-menu show w-100" style={{ maxHeight: 250, overflowY: "auto" }}>
                                                    {filterOptions(RESEARCH_AREA_OPTIONS, "ra").map((opt) => (
                                                        <button
                                                            key={opt}
                                                            className="dropdown-item"
                                                            type="button"
                                                            onClick={() => {
                                                                setScientific({ ...scientific, research_area_of_expertise: opt });
                                                                setOpenDropdown(null);
                                                                setSearchText({ ...searchText, ra: "" });
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6 position-relative">
                                            <label className="form-label">Major Focus *</label>
                                            <input
                                                className="form-control"
                                                value={
                                                    openDropdown === "mf"
                                                        ? searchText.mf
                                                        : scientific.major_focus.join(", ")
                                                }
                                                placeholder="Select major focus"
                                                onClick={() => setOpenDropdown("mf")}
                                                onChange={(e) =>
                                                    setSearchText({ ...searchText, mf: e.target.value })
                                                }
                                                required
                                            />

                                            {openDropdown === "mf" && (
                                                <div className="dropdown-menu show w-100" style={{ maxHeight: 250, overflowY: "auto" }}>
                                                    {filterOptions(MAJOR_FOCUS_OPTIONS, "mf").map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            className={`dropdown-item ${scientific.major_focus.includes(opt) ? "active" : ""
                                                                }`}
                                                            onClick={() => {
                                                                setScientific((prev) => ({
                                                                    ...prev,
                                                                    major_focus: prev.major_focus.includes(opt)
                                                                        ? prev.major_focus.filter((v) => v !== opt)
                                                                        : [...prev.major_focus, opt],
                                                                }));
                                                                setSearchText({ ...searchText, mf: "" });
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                        {/* SPECIFIC RESEARCH */}
                                        <div className="col-md-12 position-relative">
                                            <label className="form-label">Specific Research Areas *</label>
                                            <input
                                                className="form-control"
                                                value={
                                                    openDropdown === "sr"
                                                        ? searchText.sr
                                                        : scientific.specific_research_areas.join(", ")
                                                }
                                                placeholder="Type to search"
                                                onClick={() => setOpenDropdown("sr")}
                                                onChange={(e) =>
                                                    setSearchText({ ...searchText, sr: e.target.value })
                                                }
                                                required
                                            />

                                            {openDropdown === "sr" && (
                                                <div className="dropdown-menu show w-100" style={{ maxHeight: 250, overflowY: "auto" }}>
                                                    {filterOptions(SPECIFIC_RESEARCH_AREA_OPTIONS, "sr").map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            className={`dropdown-item ${scientific.specific_research_areas.includes(opt) ? "active" : ""
                                                                }`}
                                                            onClick={() => {
                                                                setScientific((prev) => ({
                                                                    ...prev,
                                                                    specific_research_areas: prev.specific_research_areas.includes(opt)
                                                                        ? prev.specific_research_areas.filter((v) => v !== opt)
                                                                        : [...prev.specific_research_areas, opt],
                                                                }));
                                                                setSearchText({ ...searchText, sr: "" });
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>



                                        {/* ORGAN SITES */}
                                        <div className="col-md-6 position-relative">
                                            <label className="form-label">Organ Sites *</label>
                                            <input
                                                className="form-control"
                                                value={
                                                    openDropdown === "os"
                                                        ? searchText.os
                                                        : scientific.organ_sites.join(", ")
                                                }
                                                placeholder="Select organ sites"
                                                onClick={() => setOpenDropdown("os")}
                                                onChange={(e) =>
                                                    setSearchText({ ...searchText, os: e.target.value })
                                                }
                                                required
                                            />

                                            {openDropdown === "os" && (
                                                <div className="dropdown-menu show w-100" style={{ maxHeight: 250, overflowY: "auto" }}>
                                                    {filterOptions(ORGAN_SITE_OPTIONS, "os").map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            className={`dropdown-item ${scientific.organ_sites.includes(opt) ? "active" : ""
                                                                }`}
                                                            onClick={() => {
                                                                setScientific((prev) => ({
                                                                    ...prev,
                                                                    organ_sites: prev.organ_sites.includes(opt)
                                                                        ? prev.organ_sites.filter((v) => v !== opt)
                                                                        : [...prev.organ_sites, opt],
                                                                }));
                                                                setSearchText({ ...searchText, os: "" });
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>



                                        <div className="col-md-6 position-relative">
                                            <label className="form-label">Additional Research Areas</label>
                                            <input
                                                className="form-control"
                                                value={
                                                    openDropdown === "ar"
                                                        ? searchText.ar
                                                        : scientific.additional_research_areas.join(", ")
                                                }
                                                placeholder="Select additional areas"
                                                onClick={() => setOpenDropdown("ar")}
                                                onChange={(e) =>
                                                    setSearchText({ ...searchText, ar: e.target.value })
                                                }
                                            />

                                            {openDropdown === "ar" && (
                                                <div className="dropdown-menu show w-100" style={{ maxHeight: 250, overflowY: "auto" }}>
                                                    {filterOptions(ADDITIONAL_RESEARCH_AREA_OPTIONS, "ar").map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            className={`dropdown-item ${scientific.additional_research_areas.includes(opt) ? "active" : ""
                                                                }`}
                                                            onClick={() => {
                                                                setScientific((prev) => ({
                                                                    ...prev,
                                                                    additional_research_areas:
                                                                        prev.additional_research_areas.includes(opt)
                                                                            ? prev.additional_research_areas.filter((v) => v !== opt)
                                                                            : [...prev.additional_research_areas, opt],
                                                                }));
                                                                setSearchText({ ...searchText, ar: "" });
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                </div>
                                {/* ================= CONTACT DETAILS ================= */}
                                <h5 className="text-primary mt-5 mb-3">
                                    <i className="ri-phone-line me-2"></i>
                                    Contact Details
                                </h5>

                                <div className="row g-4">

                                    {/* CONTACT NUMBER */}
                                    <div className="col-md-6">
                                        <label className="form-label">Contact Number *</label>
                                        <input
                                            className="form-control"
                                            value={professional.contact_number}
                                            onChange={(e) =>
                                                setProfessional({
                                                    ...professional,
                                                    contact_number: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    {/* WEBSITE */}
                                    <div className="col-md-6">
                                        <label className="form-label">Website</label>
                                        <input
                                            className="form-control"
                                            placeholder="https://example.com"
                                            value={professional.website}
                                            onChange={(e) =>
                                                setProfessional({
                                                    ...professional,
                                                    website: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* WORK ADDRESS */}
                                    <div className="col-md-12">
                                        <label className="form-label">Work Address *</label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            value={professional.work_address}
                                            onChange={(e) =>
                                                setProfessional({
                                                    ...professional,
                                                    work_address: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                </div>


                                {/* SAVE */}
                                <div className="text-end mt-5">
                                    <button className="btn btn-primary px-5 rounded-pill">
                                        Save & Continue
                                    </button>
                                </div>
                            </form>
                        )}


                        {/* ================= STEP 2 ================= */}
                        {step === 2 && (
                            <>
                                <h4 className="text-primary mb-4">
                                    <i className="ri-bookmark-3-line me-2"></i>
                                    Select Registration Category
                                </h4>

                                <div className="row g-4">
                                    {Object.entries(priceTable).map(([cat, price]) => {
                                        const isSelected = selectedPlan?.category === cat;

                                        return (
                                            <div className="col-md-4" key={cat}>
                                                <div
                                                    className={`card h-100 text-center p-4 border ${isSelected ? "border-primary shadow-sm" : ""
                                                        }`}
                                                    role="button"
                                                    onClick={() => handleSelectPlan(cat, price)}
                                                >
                                                    <i className="ri-user-star-line fs-1 text-primary mb-2"></i>
                                                    <h6 className="fw-semibold">{cat}</h6>
                                                    <span className="small text-muted mt-2 d-block">
                                                        {price.label}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <button
                                        className="btn btn-outline-secondary rounded-pill px-4"
                                        onClick={() => setStep(1)}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className="btn btn-primary rounded-pill px-4"
                                        disabled={!selectedPlan || loadingQR}
                                        onClick={handleProceedToPayment}
                                    >
                                        {loadingQR ? "Generating QR..." : "Next"}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ================= STEP 3 ================= */}
                        {step === 3 && (
                            <>
                                <h4 className="text-primary mb-4">
                                    <i className="ri-secure-payment-line me-2"></i>
                                    Payment
                                </h4>

                                <div className="row g-4 align-items-center mb-4">
                                    <div className="col-md-6 text-center">
                                        {qrData ? (
                                            <img
                                                src={qrData.qr_base64}
                                                alt="UPI QR Code"
                                                className="img-fluid rounded-3 shadow-sm"
                                                style={{ maxWidth: 260 }}
                                            />
                                        ) : (
                                            <p>Loading QR...</p>
                                        )}

                                        <p className="small text-muted mt-2">
                                            Amount: <strong>{selectedPlan.price.label}</strong>
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="alert alert-info rounded-4">
                                            <h6 className="fw-semibold mb-2">
                                                <i className="ri-mail-send-line me-2"></i>
                                                Payment Confirmation
                                            </h6>

                                            <p className="mb-2">
                                                After completing the payment, please email us the <strong>screenshot of your transaction </strong>
                                                for verification.
                                            </p>

                                            <p className="mb-1">
                                                📧 <strong>Email:</strong>{" "}
                                                <a href="mailto:info@bencoslife.com">
                                                    info@bencoslife.com
                                                </a>
                                            </p>

                                            <p className="small text-muted mb-0">
                                                Kindly mention your <strong>full name</strong> and <strong>registered email ID</strong> in the email
                                                to help us process your registration faster.
                                            </p>

                                            <p className="small text-muted mb-0">
                                                Your registration will be confirmed after successful payment verification.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-secondary rounded-pill px-4"
                                        onClick={() => setStep(2)}
                                    >
                                        Back
                                    </button>

                                    <button className="btn btn-success rounded-pill px-5 fw-semibold">
                                        Submit Registration
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </section>
        </>
    );
}

export default function GATCLite() {
    return (
        <section className="bg-light py-5">
            <div className="container">

                {/* HERO IMAGE */}
                <div className="row mb-5">
                    <div className="col-12">
                        <img
                            src="/images/GATC Lite Post.png"
                            alt="Conference Banner"
                            className="img-fluid w-100 rounded-4 shadow-sm"
                            style={{ maxHeight: "320px", objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        {/* ABOUT */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-semibold text-primary mb-3">
                                    About the Conference
                                </h4>

                                <p className="text-secondary">
                                    <strong>“Metabolomics &amp; Microbiome: Systems-Level Insights into Human
                                        Health and Disease”</strong> is a premier scientific conference designed
                                    to unite interdisciplinary expertise across metabolomics, microbiome
                                    biology, and systems medicine.
                                </p>

                                <p className="text-secondary mb-0">
                                    Hosted at <strong>NISER, Bhubaneswar</strong> with support from the
                                    <strong> Department of Atomic Energy (DAE)</strong>, this two-day event
                                    brings together researchers, clinicians, industry professionals, and
                                    policymakers to explore frontiers in omics-driven health research.
                                </p>
                            </div>
                        </div>

                        {/* THEME & AIMS */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-semibold text-primary mb-3">
                                    Theme &amp; Aims
                                </h4>

                                <p className="fw-semibold text-dark">
                                    Integrative Metabolomics and Microbiome Science for Translational Health
                                    Insights
                                </p>

                                <ul className="text-secondary ps-3 mb-0">
                                    <li>
                                        Understand microbiome structure and function across gut, oral, and
                                        skin ecosystems.
                                    </li>
                                    <li>
                                        Explore host–microbiome–metabolome interactions influencing health
                                        and disease.
                                    </li>
                                    <li>
                                        Identify metabolic signatures linking nutrition, disease, and
                                        therapeutic outcomes.
                                    </li>
                                    <li>
                                        Highlight AI, computational modeling, and systems biology for
                                        translational insights.
                                    </li>
                                    <li>
                                        Promote national capacity building and DAE-supported initiatives.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* WHY THIS CONFERENCE */}
                        <div className="card border-0 shadow-sm rounded-4 mb-5">
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-semibold text-primary mb-3">
                                    Why This Conference Matters
                                </h4>

                                <p className="text-secondary">
                                    Omics technologies are rapidly redefining biomedical science, revealing
                                    complex molecular landscapes of health and disease. However, translating
                                    these discoveries into clinical and public health impact remains a
                                    critical challenge.
                                </p>

                                <p className="text-secondary mb-0">
                                    This conference offers a unique, integrative platform combining
                                    microbiome science, metabolomics, and computational biology, fostering
                                    dialogue among researchers, technologists, clinicians, and policymakers
                                    shaping the future of precision and systems medicine in India and beyond.
                                </p>
                            </div>
                        </div>

                        <div className="container my-4">

                            {/* HEADING */}
                            <div className="text-center mb-4">
                                <h3 className="fw-bold text-dark mb-1">
                                    Registration
                                </h3>
                                <p className="text-muted small mb-0">
                                    Payment (transaction) details are mandatory during registration.
                                </p>
                            </div>

                            <div className="card border-0 shadow-sm">
                                <div className="card-body">

                                    <div className="row align-items-center">
                                        {/* LEFT: QR IMAGE */}
                                        <div className="col-md-4 text-center mb-3 mb-md-0">
                                            <img
                                                src="/images/gatc-lite-qr.png"
                                                alt="UPI QR Code"
                                                className="img-fluid border rounded p-2"
                                                style={{ maxWidth: "260px" }}
                                            />
                                            <div className="mt-2 fw-semibold text-muted">
                                                UPI ID: niserrandd8962@sbi
                                            </div>
                                        </div>

                                        {/* RIGHT: BANK DETAILS */}
                                        <div className="col-md-8">
                                            <h5 className="fw-bold mb-3">Bank Details</h5>

                                            <p className="mb-1">
                                                <strong>Bank Name:</strong> State Bank of India
                                            </p>
                                            <p className="mb-1">
                                                <strong>Account Name:</strong> M&M in Health
                                            </p>
                                            <p className="mb-1">
                                                <strong>Account No.:</strong> 35961203703
                                            </p>
                                            <p className="mb-3">
                                                <strong>IFS Code:</strong> SBIN0018242
                                            </p>

                                            <p className="text-muted small mb-1">
                                                Scan the UPI QR code above to make the payment.
                                            </p>

                                            <p className="text-danger small fst-italic">
                                                Payment (transaction) details are mandatory during registration.
                                            </p>
                                        </div>
                                    </div>

                                    {/* BOTTOM SECTION */}
                                    <hr className="my-4" />

                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <h5 className="fw-bold text-primary mb-2">
                                                Indian Participants | <span className="text-danger">INR</span>
                                            </h5>

                                            <ul className="list-unstyled mb-0">
                                                <li className="mb-1">
                                                    ✅ Students / Researchers / Clinicians: <strong>₹500</strong>
                                                </li>
                                                <li className="mb-1">
                                                    ✅ Early Bird Deadline:
                                                    <strong className="text-danger"> 10 February, 2026</strong>
                                                </li>
                                                <li>
                                                    ✅ Late Registration: <strong>₹700</strong> (till 28 Feb 2026)
                                                </li>
                                            </ul>
                                        </div>

                                        {/* REGISTER BUTTON */}
                                        <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
                                            <a
                                                href="https://docs.google.com/forms/d/e/1FAIpQLSeljVd2uKLvmTL7-QyvluVzqEdmCwfnjBeGmbUbMB_Lq7laMg/viewform"
                                                target="_blank"
                                                className="btn btn-success px-4 py-2 fw-semibold rounded-pill shadow-sm"
                                            >
                                                Proceed to Registration
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                        <div className="container my-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">

                                    {/* NOTE */}
                                    <h6 className="fw-bold text-uppercase mb-2">Note</h6>
                                    <ul className="small text-muted mb-3 ps-3">
                                        <li>
                                            Registration fee includes admission to all sessions, refreshments,
                                            meals (lunch & dinner), welcome kit, cultural programme, and
                                            Abstract & Programme Book.
                                        </li>
                                        <li>
                                            Nominal payment gateway convenience fee may be applicable during
                                            online payment.
                                        </li>
                                        <li>
                                            Industry participants need to arrange their own accommodation.
                                        </li>
                                    </ul>

                                    {/* REFUND POLICY */}
                                    <h6 className="fw-bold text-uppercase mb-2">Refund Policy</h6>
                                    <ul className="small text-muted ps-3 mb-0">
                                        <li>
                                            A cancellation charge of <strong>₹1,000</strong> will be applicable
                                            for processing refunds.
                                        </li>
                                        <li>
                                            Requests for refunds must be received on or before
                                            <strong className="text-danger"> 20 February 2026</strong>.
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </section>
    );
}
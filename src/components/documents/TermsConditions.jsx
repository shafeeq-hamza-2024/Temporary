import React from "react";

export default function TermsConditions() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">MyNeuron™ User Agreement</h2>
                <p className="text-muted mb-1">Terms & Conditions</p>
                <small className="text-muted">
                  Effective Date: 16.01.2025 · Last Updated: 16.01.2025
                </small>
              </div>

              <div className="alert alert-secondary small">
                <strong>Important:</strong> This agreement is a legally binding contract between you (“User”) and Bencos Research & Healthcare Solutions Pvt. Ltd. By accessing or using MyNeuron™, you agree to these Terms.
              </div>

              {/* Content */}
              <section className="mb-4">
                <h6 className="fw-semibold">1. About MyNeuron</h6>
                <p className="text-muted">
                  MyNeuron™ is a professional scientific networking platform for researchers, clinicians, academicians, students, industry professionals, and institutions.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">2. Eligibility & Registration</h6>
                <p className="text-muted">
                  You must be at least 18 years old and legally capable under Indian law. You agree to provide accurate and up-to-date registration information.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">3. Account Security</h6>
                <p className="text-muted">
                  You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">4. Profiles & Content</h6>
                <p className="text-muted">
                  Users may share professional and academic information. You confirm that all submitted content is accurate and does not violate third-party rights.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">5. Acceptable Use</h6>
                <ul className="text-muted small">
                  <li>No false or fabricated scientific data</li>
                  <li>No confidential or patient-identifiable information</li>
                  <li>No harassment, spam, or misrepresentation</li>
                  <li>No misuse or scraping of platform data</li>
                </ul>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">6. Intellectual Property</h6>
                <p className="text-muted">
                  All MyNeuron™ platform elements are protected by intellectual property laws and may not be reused without permission.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">7. Disclaimer & Liability</h6>
                <p className="text-muted">
                  Content is provided for professional exchange only and does not constitute medical advice. Bencos is not liable for indirect or consequential damages.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">8. Governing Law</h6>
                <p className="text-muted">
                  These Terms are governed by the laws of India. Courts at Delhi, India shall have exclusive jurisdiction.
                </p>
              </section>

              <hr />

              <footer className="text-center small text-muted">
                Contact: <a href="mailto:legal@bencoslife.com">legal@bencoslife.com</a>
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
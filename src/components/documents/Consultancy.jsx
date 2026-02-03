import React from "react";

export default function Consultancy() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">
                  Nature of Consultancy
                </h2>
               
              </div>

              <p className="text-muted mb-4">
                Bencos, through the MyNeuron gateway, provides professional genomics
                and bioinformatics consultancy services. Payments collected under
                this scope are strictly for service-based engagements and do not
                involve the sale, supply, or delivery of any physical goods.
              </p>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  1. Genomics Sequencing Services (NGS)
                </h6>
                <p className="text-muted">
                  Services include Next Generation Sequencing (NGS) for research,
                  translational, and clinical applications. These services involve
                  the processing and analysis of biological samples submitted by
                  clients and may include:
                </p>
                <ul className="text-muted small">
                  <li>DNA Sequencing</li>
                  <li>RNA Sequencing</li>
                  <li>Whole Genome Sequencing (WGS)</li>
                  <li>Whole Exome Sequencing (WES)</li>
                  <li>Transcriptome Sequencing</li>
                  <li>Epigenome Sequencing</li>
                  <li>Metagenome and microbiome sequencing</li>
                  <li>Targeted and application-specific NGS workflows</li>
                </ul>

                <p className="text-muted">
                  Payments under this category cover scientific consultation,
                  sequencing execution, quality control, data generation, and
                  delivery of sequencing outputs, as per the agreed service scope.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  2. Bioinformatics as a Service (BIAAS)
                </h6>
                <p className="text-muted">
                  Payments may be applied towards Bioinformatics as a Service
                  (BIAAS), which provides computational and analytical support for
                  genomics data generated through sequencing.
                </p>
                <ul className="text-muted small">
                  <li>Primary, secondary, and tertiary analysis of NGS data</li>
                  <li>Data processing, alignment, variant calling, annotation, and interpretation</li>
                  <li>Application of standard and/or customised bioinformatics pipelines</li>
                  <li>Delivery of analytical outputs, datasets, and summary reports</li>
                </ul>

                <p className="text-muted">
                  This service is provided as a professional analytical consultancy
                  and does not involve the transfer of intellectual property or
                  physical assets unless separately agreed in writing.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  3. Clinical Genomics Reporting Services
                </h6>
                <p className="text-muted">
                  For clinical and translational use cases, payments may also cover
                  clinical genomics reporting services, which include:
                </p>
                <ul className="text-muted small">
                  <li>Interpretation of genomic variants identified through AI Flag–based software systems</li>
                  <li>Preparation of structured genomic reports for clinical reference</li>
                  <li>Analytical reporting intended to support qualified healthcare professionals in diagnostic and treatment decisions</li>
                </ul>

                <p className="text-muted">
                  These reports are advisory and analytical in nature and constitute
                  professional consultancy services.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  4. Nature and Mode of Service Delivery
                </h6>
                <ul className="text-muted small">
                  <li>All services under this scope are intangible and non-physical</li>
                  <li>Deliverables are provided digitally, including raw data, analysed datasets, and reports</li>
                  <li>No physical goods, consumables, or laboratory products are sold or delivered</li>
                </ul>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  5. Purpose of Payment Collection
                </h6>
                <p className="text-muted">
                  Payments collected under this scope are strictly towards:
                </p>
                <ul className="text-muted small">
                  <li>Execution of genomics sequencing and consultancy services</li>
                  <li>Bioinformatics analysis of genomic data</li>
                  <li>Preparation and delivery of genomic and clinical reports</li>
                </ul>

                <p className="text-muted">
                  Consultancy services, genomics services, and event-related payments
                  are governed under separate scopes and declarations.
                </p>
              </section>

              <hr />

              <footer className="text-center small text-muted">
                <strong>Bencos Healthcare Solutions Pvt. Ltd.</strong><br />
                Genomics & Bioinformatics Consultancy Scope Declaration
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
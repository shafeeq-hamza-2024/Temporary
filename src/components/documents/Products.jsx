import React from "react";

export default function Product() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">
                  Nature of Products
                </h2>
               
              </div>

              <p className="text-muted mb-4">
                Bencos, through the MyNeuron platform, is engaged in the advertisement,
                marketing, and sale of genomics-related physical goods and software
                products. Payments collected under this scope are strictly towards
                the supply of goods and software offerings and are subject to
                applicable Goods and Services Tax (GST) regulations.
              </p>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  1. Supply of Physical Laboratory & Genomics Products
                </h6>
                <p className="text-muted">
                  Payments may be collected for the sale and supply of tangible
                  laboratory and genomics products, classified as goods under GST
                  law and invoiced under appropriate HSN (Harmonised System of
                  Nomenclature) codes.
                </p>

                <p className="text-muted">
                  These goods may include, but are not limited to:
                </p>

                <ul className="text-muted small">
                  <li>
                    Sample collection and preservation tubes (DNA, RNA, cfDNA,
                    blood, and liquid biopsy collection tubes)
                  </li>
                  <li>Nucleic acid stabilisation and transport consumables</li>
                  <li>Whole Exome Sequencing (WES) library preparation kits</li>
                  <li>Targeted sequencing and custom library preparation kits</li>
                  <li>Other genomics and molecular workflow consumables</li>
                </ul>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  2. Supply of Software Products & Digital Platforms
                </h6>
                <p className="text-muted">
                  Payments may also relate to the sale, licensing, or
                  subscription-based access to software products and digital
                  platforms, including:
                </p>

                <ul className="text-muted small">
                  <li>TWINE BI bioinformatics and data interpretation software</li>
                  <li>Digital platforms for genomic data management, analysis, and visualisation</li>
                </ul>

                <p className="text-muted">
                  Depending on the mode of supply, software offerings may be treated
                  under GST as goods or services, including packaged software,
                  licensed software, cloud-based access, or usage-based subscriptions.
                </p>

                <p className="text-muted">
                  Such supplies are invoiced under applicable HSN or SAC codes in
                  accordance with GST provisions.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  3. Advertisement & Product Listing Services
                </h6>
                <p className="text-muted">
                  Payments may also be collected towards advertisement, marketing,
                  and product listing services, which may include:
                </p>

                <ul className="text-muted small">
                  <li>Product listing and catalog presentation</li>
                  <li>Promotional content and marketing material</li>
                  <li>Demonstration or limited-access product showcases</li>
                </ul>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  4. Nature & Mode of Supply
                </h6>
                <ul className="text-muted small">
                  <li>
                    <strong>Physical Goods:</strong> Supplied and delivered through
                    appropriate logistics or courier services
                  </li>
                  <li>
                    <strong>Software Products:</strong> Supplied through digital
                    access, license activation, or subscription enablement
                  </li>
                  <li>
                    Each transaction is supported by a tax invoice indicating HSN
                    or SAC codes, applicable GST rate, and tax amount
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  5. Purpose of Payment Collection
                </h6>
                <p className="text-muted">
                  Payments collected under this scope are strictly for:
                </p>

                <ul className="text-muted small">
                  <li>Sale and supply of genomics and laboratory goods</li>
                  <li>Sale or licensed access to software products and platforms</li>
                  <li>Advertisement and promotional listing of Bencos-branded products</li>
                </ul>

                <p className="text-muted">
                  Collected amounts are utilised solely for product supply,
                  software access provision, marketing execution, logistics,
                  and statutory tax compliance.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">
                  6. Compliance & Scope Clarification
                </h6>
                <ul className="text-muted small">
                  <li>All supplies are subject to GST laws and regulations in force in India</li>
                  <li>Goods and services are invoiced separately where applicable, with clear GST classification</li>
                  <li>Consultancy services, genomics services, and event-related payments are governed under separate scopes and declarations</li>
                </ul>
              </section>

              <hr />

              <footer className="text-center small text-muted">
                <strong>Bencos Healthcare Solutions Pvt. Ltd.</strong><br />
                Product Supply & GST Scope Declaration
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
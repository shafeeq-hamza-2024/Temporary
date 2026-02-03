import React from "react";

export default function Events() {
  
 return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">
                  Genomics Advancements Through Convergence Conference
                </h2>
               
              </div>

              <p className="text-muted mb-4">
                Payments collected for the Genomics Advancements Through Convergence
                (GATC) conference via the MyNeuron gateway are strictly limited to
                event-related participation and engagement services. These payments
                apply exclusively to conference registration, exhibition participation,
                and sponsorship-related interests as outlined below.
              </p>

              <section className="mb-4">
                <h6 className="fw-semibold">1. Conference Registration Services</h6>
                <p className="text-muted">
                  Payments collected under conference registration are for participation
                  in the GATC conference. Registration categories may include:
                </p>
                <ul className="text-muted small">
                  <li>Delegate / Attendee registration</li>
                  <li>Academic / Student registration</li>
                  <li>Industry / Corporate registration</li>
                </ul>

                <p className="text-muted">
                  Registration fees may vary based on registration timelines, including
                  early, standard, or late/on-spot registration.
                </p>

                <p className="text-muted">
                  Payment entitles registered participants to access and participation
                  based on the selected registration category, which may include:
                </p>
                <ul className="text-muted small">
                  <li>Entry and access to the conference venue on registered dates</li>
                  <li>Attendance at scientific sessions, keynote lectures, panels, and workshops</li>
                  <li>Access to conference materials (digital or physical, where applicable)</li>
                  <li>Participation in networking and engagement sessions</li>
                </ul>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">2. Exhibition Participation Services</h6>
                <p className="text-muted">
                  Payments may also be collected for exhibition participation at GATC.
                  Exhibition-related payments may entitle the exhibitor to:
                </p>
                <ul className="text-muted small">
                  <li>Allocation of exhibition space or booth as per the selected package</li>
                  <li>Permission to display products, services, or informational materials</li>
                  <li>Professional interaction with conference attendees during exhibition hours</li>
                  <li>Inclusion in exhibitor listings or event collaterals, where applicable</li>
                </ul>

                <p className="text-muted">
                  Exhibition participation is subject to event guidelines, space
                  availability, and exhibitor-specific terms communicated separately.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">3. Sponsorship & Partnership Participation</h6>
                <p className="text-muted">
                  Payments collected towards sponsorship or partnership interests are
                  for association with the GATC conference under defined sponsorship
                  categories.
                </p>
                <ul className="text-muted small">
                  <li>Brand visibility and recognition during the event</li>
                  <li>Inclusion in promotional or event-related materials</li>
                  <li>Access to sponsor-specific engagement opportunities</li>
                  <li>Participation in sponsor-designated sessions or activities</li>
                </ul>

                <p className="text-muted">
                  All sponsorship deliverables are governed by written agreements
                  mutually agreed upon before or after payment.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">4. Purpose of Payment Collection</h6>
                <p className="text-muted">
                  Payments collected under this scope are strictly used for:
                </p>
                <ul className="text-muted small">
                  <li>Conference registration and attendee participation</li>
                  <li>Exhibition space allocation and exhibitor participation</li>
                  <li>Sponsorship and partnership engagement related to the conference</li>
                </ul>

                <p className="text-muted">
                  Funds are utilised for event planning, venue arrangements, logistics,
                  technical infrastructure, content delivery, and operational execution
                  of the conference.
                </p>
              </section>

              <section className="mb-4">
                <h6 className="fw-semibold">5. Compliance & Clarifications</h6>
                <ul className="text-muted small">
                  <li>Registration, exhibition, and sponsorship fees are non-refundable once services are initiated, unless stated otherwise in writing</li>
                  <li>Registration fees do not constitute the sale of goods or financial products</li>
                  <li>Each payment corresponds to a specific event service category and is supported by appropriate documentation or invoices</li>
                  <li>Payments are valid only for the specific edition and dates of the conference</li>
                  <li>Consultancy services, genomics services, and non-event offerings are governed under separate scopes and declarations</li>
                </ul>
              </section>

              <hr />

              <footer className="text-center small text-muted">
                <strong>Genomics Advancements Through Convergence (GATC)</strong><br />
                Event Payments & Participation Scope Declaration
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
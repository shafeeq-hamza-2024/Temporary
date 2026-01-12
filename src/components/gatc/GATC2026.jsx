export default function GATC2026() {
    return (
        <section className="bg-white py-5">
            <div className="container">

                {/* IMAGE + TITLE */}
                {/* IMAGE + TITLE */}
                <div className="row mb-5">
                    <div className="col-12">
                        <img
                            src="/images/GATC2026.png"
                            alt="GATC Conference Banner"
                            className="img-fluid w-100 rounded-4 shadow"
                            style={{
                                maxHeight: "300px",
                                objectFit: "cover"
                            }}
                        />
                    </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="row justify-content-center">
                    <div className="col-lg-9 text-center">

                        <h2 className="h5 fw-semibold text-primary mb-4">
                            Genomic Advancements Through Convergence
                        </h2>

                        <p className="text-secondary">
                            Welcome to Genomic Advancements Through Convergence — where cutting-edge
                            genomics meets real-world impact.
                        </p>

                        <p className="text-secondary">
                            This flagship annual conference by Bencos Scientific Society brings together
                            global leaders in translational genomics, precision medicine, and life sciences
                            innovation.
                        </p>

                        <p className="text-secondary">
                            Held across key Indian cities, GATC — planned around a 3 day meeting concourse —
                            serves as a unique platform for academia, industry, and policy-makers to
                            converge. Join us as we bridge the gap from discovery to diagnostics, with the
                            forum thrown open to a panel discussion on
                            <strong> “Genomics for Impact: From Bench to Bedside”.</strong>
                        </p>

                        <a
                            href="/gatc2026/registration"
                            className="btn btn-outline-primary btn-lg rounded-pill px-5 mt-3 fw-semibold"
                        >
                            Register now
                        </a>

                    </div>
                </div>

            </div>
        </section>
    );
}
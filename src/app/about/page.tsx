import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <main>
      <section className="about section" id="about">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>About Me</h2>
            </div>
          </div>
          <div className="row">
            <div className="about-content padd-15">
              <div className="row">
                <div className="about-text padd-15">
                  <h2>
                    I am front-end web developer with{" "}
                    <span>6 years of experience</span>
                  </h2>
                  <p>
                    Hi! My name is Joseph Damiba. I am a front-end web
                    developer, and I am very passionate and dedicated to my
                    work. With 6 years experience as building products for
                    startups, I have acquired the skills and knowledge necessary
                    to be an effective team member. I enjoy every step of the
                    software engineering process, from discussion and
                    whiteboarding to pushing to production.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="personal-info padd-15">
                  <div className="row">
                    <div className="info-item padd-15">
                      <p>
                        Website :{" "}
                        <span>
                          <a href="https://www.josephdamiba.dev">
                            www.josephdamiba.dev
                          </a>
                        </span>
                      </p>
                    </div>
                    <div className="info-item padd-15">
                      <p>
                        Email : <span>jdamiba@gmail.com</span>
                      </p>
                    </div>

                    <div className="info-item padd-15">
                      <p>
                        Availabilty : <span>Looking for work</span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="buttons padd-15">
                      <a
                        href="/assets/docs/resume.pdf"
                        target="_target"
                        className="btn"
                      >
                        Download CV
                      </a>
                    </div>
                  </div>
                </div>
                <div className="skills padd-15">
                  <div className="row">
                    <div className="skill-item padd-15">
                      <h5>React</h5>
                      <div className="progress">
                        <div className="progress-in" style={{ width: "80%" }} />
                        <div className="skill-percent">
                          5 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>CSS</h5>
                      <div className="progress">
                        <div
                          className="progress-in"
                          style={{ width: "100%" }}
                        />
                        <div className="skill-percent">
                          6 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>NextJS</h5>
                      <div className="progress">
                        <div className="progress-in" style={{ width: "60%" }} />
                        <div className="skill-percent">
                          4 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>JavaScript</h5>
                      <div className="progress">
                        <div
                          className="progress-in"
                          style={{ width: "100%" }}
                        />
                        <div className="skill-percent">
                          6 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="skill-item padd-15">
                      <h5>TypeScript</h5>
                      <div className="progress">
                        <div className="progress-in" style={{ width: "25%" }} />
                        <div className="skill-percent">
                          1 year of experience
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="education padd-15">
                  <h3 className="title">Education</h3>
                  <div className="row">
                    <div className="timeline-box padd-15">
                      <div className="timeline shadow-dark">
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h4>
                            Master&#39;s Degree, Industrial and Labor Relations
                          </h4>
                          <p>Cornell University</p>
                        </div>
                        {/* Timeline Item end */}
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h4>
                            Bachelor&#39;s of Science, Applied Arts and Sciences
                          </h4>
                          <p>Rochester Institute of Technology</p>
                        </div>
                        {/* Timeline Item end */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="experience padd-15">
                  <h3 className="title">Experience</h3>
                  <div className="row">
                    <div className="timeline-box padd-15">
                      <div className="timeline shadow-dark">
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h6 className="timeline-date">
                            <i className="fa fa-calendar" /> Sep 2022 to Jan
                            2024
                          </h6>
                          <h4 className="timeline-title">
                            Senior Front-end Developer,{" "}
                            <a href="https://www.artie.com/">Artie</a>
                          </h4>
                          <ul>
                            <li>
                              Developed and maintained a Next.js application
                              which served both Artie&#39;s marketing website to
                              hundreds of thousands of unique monthly visitors
                              and its flagship video game, Pong Legends, to
                              thousands of monthly active players
                            </li>
                            <li>
                              Delivered a progressive web app for Pong Legends,
                              increasing Pong Legends Day-1 retention by 30%
                              compared to previous releases by providing
                              technical leadership to guide a 3-person product
                              management team in designing, developing, and
                              maintaining the app
                            </li>
                          </ul>
                        </div>
                        {/* Timeline Item end */}
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h6 className="timeline-date">
                            <i className="fa fa-calendar" /> Aug 2021 Aug 2022
                          </h6>
                          <h4 className="timeline-title">
                            Full-stack Software Engineer,{" "}
                            <a href="https://www.fluxon.com">Fluxon</a>
                          </h4>
                          <ul>
                            <li>
                              Transformed 50+ static Figma designs into
                              responsive and accessible user interface
                              components for a food delivery startup&#39;s web
                              application using React.js
                            </li>
                            <li>
                              {" "}
                              Led 35+ client-facing status update meetings on a
                              project to create a React.js-based reference
                              front-end for a healthcare startup with over $3
                              billion valuation
                            </li>
                          </ul>
                        </div>
                        {/* Timeline Item end */}
                        {/* Timeline Item */}
                        <div className="timeline-item">
                          <div className="circle-dot" />
                          <h6 className="timeline-date">
                            <i className="fa fa-calendar" /> Aug 2018 to May
                            2021
                          </h6>
                          <h4 className="timeline-title">
                            Dash Core Developer,{" "}
                            <a href="https://www.plotly.com">Plotly</a>
                          </h4>
                          <ul>
                            <li>
                              Transformed 35+ Figma designs into front-end user
                              interface components deployed to Plotly&#39;s
                              marketing and documentation websites using
                              React.js
                            </li>

                            <li>
                              Contributed to the development of Dash Enterprise,
                              Plotly&#39;s commercial data visualization
                              software, by simultaneously upgrading the
                              dependencies for 50+ Python data visualization
                              sales engineering programs, bringing security and
                              performance improvements to 100+ enterprise
                              customers
                            </li>
                          </ul>
                          <p className="timeline-text"></p>
                          <p></p>
                        </div>
                        {/* Timeline Item end */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

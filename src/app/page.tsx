export default async function Home() {
  return (
    <main>
      <section className="home section" id="home">
        <div className="container">
          <div className="intro">
            <img
              src="/imgs/josephdamiba.jpg"
              alt="Joseph Damiba picture"
              className="shadow-dark"
            />
            <h1>Joseph Damiba</h1>
            <p>Front-end Web Developer</p>
            <div className="social-links">
              <a href="https://github.com/jdamiba" target="_blank">
                <i className="fa fa-github" />
              </a>
              <a
                href="https://www.linkedin.com/in/joseph-damiba/"
                target="_blank"
              >
                <i className="fa fa-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

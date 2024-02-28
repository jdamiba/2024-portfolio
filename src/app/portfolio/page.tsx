import type { NextPage } from "next";
import Link from "next/link";

const Service: NextPage = () => {
  return (
    <>
      <section className="service section" id="services">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>Portfolio</h2>
            </div>
          </div>
          <div className="row">
            {/* Service Item 1: Logo Design */}
            <div className="service-item padd-15">
              <Link href="/sorting">
                <div className="service-item-inner">
                  <div className="icon">
                    <i className="fa fa-sort-amount-asc" />
                  </div>
                  <h4>Quicksort Component</h4>
                  <p>
                    This component allows users to create an array of numbers
                    and then sorts those numbers using the quicksort algorithm.
                  </p>
                </div>
              </Link>
            </div>
            {/* Service Item 1 End */}
            {/* Service Item 2: Web Design */}
            <div className="service-item padd-15">
              <div className="service-item-inner">
                <div className="icon">
                  <i className="fa fa-laptop" />
                </div>
                <h4>Data Fetching, Presentation, Filtering</h4>
                <p>
                  This component fetches data from an API and lets the user
                  filter the results.
                </p>
              </div>
            </div>
            {/* Service Item 2 End */}
            {/* Service Item 3: WordPress */}
            <div className="service-item padd-15">
              <Link href="/tictactoe">
                <div className="service-item-inner">
                  <div className="icon">
                    <i className="fa fa-wordpress" />
                  </div>
                  <h4>Tic Tac Toe Game</h4>
                  <p>
                    A tic tac toe game where you can play against a computer
                    opponent.
                  </p>
                </div>
              </Link>
            </div>
            {/* Service Item 3 End */}
            {/* Service Item 4: Web Development */}
            <div className="service-item padd-15">
              <div className="service-item-inner">
                <div className="icon">
                  <i className="fa fa-code" />
                </div>
                <h4>Web Development</h4>
                <p>
                  Turn your digital ideas into reality with our web development
                  solutions. We specialize in crafting robust and dynamic
                  websites that are tailored to meet your specific business
                  needs and objectives.
                </p>
              </div>
            </div>
            {/* Service Item 4 End */}
            {/* Service Item 5: Video Editing */}
            <div className="service-item padd-15">
              <div className="service-item-inner">
                <div className="icon">
                  <i className="fa fa-film" />
                </div>
                <h4>Professional Video Editing</h4>
                <p>
                  Enhance your video content with our professional video editing
                  services. We will transform your raw footage into polished,
                  engaging videos that captivate your audience and convey your
                  message effectively.
                </p>
              </div>
            </div>
            {/* Service Item 5 End */}
            {/* Service Item 6: SEO Optimization */}
            <div className="service-item padd-15">
              <div className="service-item-inner">
                <div className="icon">
                  <i className="fa fa-rocket" />
                </div>
                <h4>SEO Optimization</h4>
                <p>
                  Boost your online visibility and drive organic traffic to your
                  website with our SEO optimization services. Our experts employ
                  proven strategies to improve your search engine rankings and
                  grow your online presence.
                </p>
              </div>
            </div>
            {/* Service Item 6 End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;

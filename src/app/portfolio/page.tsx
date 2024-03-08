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
              <Link href="/fetching">
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
              </Link>
            </div>
            {/* Service Item 2 End */}
            {/* Service Item 3: WordPress */}
            <div className="service-item padd-15">
              <Link href="/tictactoe">
                <div className="service-item-inner">
                  <div className="icon">
                    <i className="fa fa-times" />
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
            {/* Service Item 3: WordPress */}
            <div className="service-item padd-15">
              <Link href="/six-degrees">
                <div className="service-item-inner">
                  <div className="icon">
                    <i className="fa fa-times" />
                  </div>
                  <h4>Six Degrees Movie Game</h4>
                  <p>
                    A game where you build a chain of relations between movies.
                  </p>
                </div>
              </Link>
            </div>
            {/* Service Item 3 End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;

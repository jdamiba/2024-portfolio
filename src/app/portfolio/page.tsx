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
            {/* Item 1: Quicksort Component */}
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
            {/* Item 1 End */}
            {/* Item 2: Tic Tac Toe Game */}
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
            {/* Item 2 End */}
            {/* Item 3: Movie Connections Game */}
            <div className="service-item padd-15">
              <Link href="/movies">
                <div className="service-item-inner">
                  <div className="icon">
                    <i className="fa fa-times" />
                  </div>
                  <h4>Movie Connections Game</h4>
                  <p>
                    A game where you build a chain of relations between movies.
                  </p>
                </div>
              </Link>
            </div>
            {/* Item 3 End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;

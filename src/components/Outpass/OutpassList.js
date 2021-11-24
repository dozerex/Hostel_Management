import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { PaginationForPosts } from "../PaginationForPosts";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import "./OutpassList.css"
import { Outpass } from "./Outpass";

export const OutpassList = () => {

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const [outpasses, setoutPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [outpassesPerPage] = useState(6);

  useEffect(() => {
    const fetchoutpasses = async () => {
      firebase
        .database()
        .ref("outpass-details")
        .on("value", (snapshot) => {
          let newoutpasses = [];
          setLoading(true);
          snapshot.forEach((snap) => {
            const temp = snap.val();
            if (temp.approved == false) {
              newoutpasses.push(temp);
              console.log(temp);
            }
          });
          setLoading(false);
          setoutPasses(newoutpasses);
        });
    };
    fetchoutpasses();
    return () => firebase.database().ref("outpass-details").off("value");
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastOutpass = currentPage * outpassesPerPage;
  const indexOfFirstOutpass = indexOfLastOutpass - outpassesPerPage;
  const currentoutpasses = outpasses.slice(
    indexOfFirstOutpass,
    indexOfLastOutpass
  );

  document.title = "Outpass List";

  return (
    <main className="outpass-list-container">
      <section class="outpass-title-section">
        <h1 class="outpass-list-title">Outpass Pending</h1>
      </section>
      <section class="outpass-list-section">
        <Outpass outpasses={outpasses} />
      </section>
      <section className="outpass-pagination-section">
        <PaginationForPosts
          postsPerPage={outpassesPerPage}
          totalPosts={outpasses.length}
          paginate={paginate}
        />
      </section>
      <Link to="/outpass-form" className="post-outpass-button-section">
        <ImPlus />
      </Link>
    </main>   
  )
}
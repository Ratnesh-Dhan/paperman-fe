"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const handleIngest = async () => {
    console.log("handle Ingest clicked");
    axios
      .get("http://localhost:8000/ingest")
      .then((response) => {
        console.log("Ingestion complete : ", response.data);
      })
      .catch((error) => {
        console.error("Error in Ingestion : ", error);
      });
  };
  return (
    <div className=" w-full py-2 flex justify-center gap-8">
      <Link 
        className="border rounded-xl font-bold text-xl px-3 py-1 active:shadow-[inset_2px_2px_6px_rgba(255,255,255,0.3)] hover:bg-slate-700"
        href="/">
        Home
      </Link>
      <button
        className="border rounded-xl font-bold text-xl px-3 py-1 active:shadow-[inset_2px_2px_6px_rgba(255,255,255,0.3)] hover:bg-slate-700"
        onClick={handleIngest}
      >
        Ingest
      </button>
      <Link 
        className="border rounded-xl font-bold text-xl px-3 py-1 active:shadow-[inset_2px_2px_6px_rgba(255,255,255,0.3)] hover:bg-slate-700"
        href="/Upload">
        Files
      </Link>
    </div>
  )
};

export default Navbar;

import { useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import { useEffect } from "react";

export default function Single() {

  return (
    <div className="single">
      <SinglePost />
    </div>
  );
}

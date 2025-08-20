import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return <div>Project{params.id}</div>;
}

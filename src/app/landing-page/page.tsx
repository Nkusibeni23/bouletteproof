import React from "react";
import Layout from "../../components/Layout";

const page = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p>Here is a summary of your website statistics and CRM data.</p>
      </div>
    </Layout>
  );
};

export default page;

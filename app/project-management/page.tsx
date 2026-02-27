import Aside from "@/src/layouts/Aside";
import Tabs from "@/src/layouts/Tabs";

import ProjectList from "@/src/components/tabContents/ProjectList";
import ProjectDetails from "@/src/components/tabContents/ProjectDetails";

export default function ProjectManagement() {
  const tabs = [
    {
      label: "Project List",
      content: <ProjectList />,
    },
    {
      label: "Project Details",
      content: <ProjectDetails />,
    },
  ];

  return (
    <>
      <section>
        <div className="flex">
          <Aside />
          <div className="w-full p-8">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </section>
    </>
  );
}

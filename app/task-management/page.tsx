import Aside from "@/src/layouts/Aside";
export default function TaskManagement() {
  return (
    <>
      <section>
        <div className="flex">
          <Aside />
          <div className="w-full p-[30]">
            <div className="flex gap-[5]">
              <h1 className="font-bold">Task Management:</h1>
              <h2 className="text-center">Project Name</h2>
            </div>
            <dl className="flex gap-10 justify-center mt-[20]">
              <div className="border-2 white h-[700] w-full max-w-[500] p-[5]">
                <dt className="bg-[#6699cc] text-white text-center font-bold">
                  <h3>Todo / Tasklist</h3>
                </dt>
                <dd className="mt-[10]"></dd>
              </div>
              <div className="border-2 white h-[700] w-full max-w-[500] p-[5]">
                <dt className="bg-[#17a2b8] text-white text-center font-bold">
                  <h3>In Progress</h3>
                </dt>
                <dd className="mt-[10]"></dd>
              </div>
              <div className="border-2 white h-[700] w-full max-w-[500] p-[5]">
                <dt className="bg-[#28a745] text-white text-center font-bold">
                  <h3>Done</h3>
                </dt>
                <dd className="mt-[10]"></dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

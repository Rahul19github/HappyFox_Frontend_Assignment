import useSWRImmutable from "swr/immutable";
import type { Employees } from "@/interfaces";
import EmployeeDetails from "./EmployeeDetails";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Minisearch from "minisearch";
import dynamic from "next/dynamic";
// import FilteredChart from "./FilteredChart";
// import Chart from "./Chart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LandingPage() {
  const Chart = dynamic(() => import("../components/Chart"), { ssr: false });
  const FilteredChart = dynamic(() => import("../components/FilteredChart"), {
    ssr: false,
  });

  const [empList, setEmpList] = useState<Employees[]>([]);
  const [searchedFor, setSearchedFor] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [team, setTeam] = useState("");
  const [updated, setUpdated] = useState<Employees[]>([]);

  const { data } = useSWRImmutable<Employees[]>("/api/employees", fetcher);

  let searchEmployees: any = new Minisearch({
    fields: ["name", "designation", "team"],
    storeFields: ["name", "designation", "team"],
  });

  if (data && data.length !== 0) {
    searchEmployees.addAll(data);
  }

  useEffect(() => {
    if (data && data.length !== 0) {
      setEmpList(data);
    }
  }, [data]);

  const searchForEmployee = (props: any) => {
    if (props !== "") {
      let searchEmployee = searchEmployees.search(props);
      setEmpList(searchEmployee);
      if (searchEmployee.length === 0) {
        setSearchedFor(props);
      }
    }
  };

  const filterByTeam = (value: any) => {
    const res = data?.filter((item: any) => item.team === value);
    if (res && res.length > 0) {
      setFiltered(true);
      setEmpList(res);
      setTeam(value);
    }
  };

  const handleChangeManager = async (parent: any, child: any) => {
    try {
      if (Object.keys(child).length > 0) {
        const res = await fetch("/api/changeManager", {
          method: "POST",
          body: JSON.stringify({
            id: child["id"],
            team: child["team"],
            manager: parent["id"],
          }),
        });

        const updatedEmpList = await res.json();
        if (updatedEmpList && updatedEmpList.length > 0) {
          console.log("updated", updatedEmpList)
          setUpdated(updatedEmpList);
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row gap-5 items-start justify-center mx-auto">
      {/* Left Side */}
      <div className=" flex flex-col justify-start items-start gap-2 w-3/4 lg:w-[50%] h-fit">
        <div className=" flex flex-row justify-between items-center gap-3">
          <SearchBar searchForEmployee={searchForEmployee} />
          <Filter filterByTeam={filterByTeam} />
        </div>
        {empList.length > 0 &&
          empList.map((emp: any) => (
            <div key={emp.id}>
              <EmployeeDetails details={emp} />
            </div>
          ))}
        {empList.length === 0 && (
          <div className=" mt-5 flex flex-col gap-3">
            <div className="text-black text-lg font-bold">
              No results for "{searchedFor}"
            </div>{" "}
            <div className=" flex flex-col items-start justify-start gap-2 text-black">
              <div className=" font-semibold text-sm">Search Help</div>
              <ul className=" ml-6 text-xs font-medium text list-item list-disc">
                <li>Check your search for typos</li>
                <li>Employee may not be from this organisation</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      {!filtered && updated.length === 0 && empList.length > 0 && (
        <Chart data={empList} changeManager={handleChangeManager} />
      )}
      {!filtered && updated.length !== 0 && empList.length > 0 && (
        <Chart data={updated} changeManager={handleChangeManager} />
      )}
      {filtered && <FilteredChart data={empList} team={team} />}
    </div>
  );
}

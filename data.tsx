import { Employees } from "./interfaces";

export const employees: Employees[] = [
  {
    id: 0,
    name: "Mark Hill",
    designation: "Chief Executive Officer",
    team: "core",
    manager: "root"
  }, {
    id: 1,
    name: "Joe Linux",
    designation: "CTO",
    team: "core",
    manager: 0
  }, {
    id: 2,
    name: "Linda May",
    designation: "CBO",
    team: "core",
    manager: 0
  }, {
    id: 3,
    name: "John Green",
    designation: "CAO",
    team: "core",
    manager: 0
  }, {
    id: 4,
    name: "Ron Blomquist",
    designation: "CISO",
    team: "Tech",
    manager: 1
  }, {
    id: 5,
    name: "Michael Rubin",
    designation: "CIO",
    team: "Tech",
    manager: 1
  }, {
    id: 6,
    name: "Alice Lopez",
    designation: "CCO",
    team: "Business",
    manager: 2
  }, {
    id: 7,
    name: "Mary Johnson",
    designation: "CBO",
    team: "Business",
    manager: 2
  }, {
    id: 8,
    name: "Kirk Douglas",
    designation: "CBDO",
    team: "Business",
    manager: 2
  }, {
    id: 9,
    name: "Erica Reel",
    designation: "CCO",
    team: "Accounts",
    manager: 3
  }, {
    id: 10,
    name: "Jessica Alba",
    designation: "Accounts Officer",
    team: "Accounts",
    manager: 3
  }
]

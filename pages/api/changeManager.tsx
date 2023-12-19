import type { NextApiRequest, NextApiResponse } from "next";
import { employees } from "@/data";
import { Employees } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employees[]>
) {
  switch (req.method) {
    case "POST":
      const errorMessage: any = [{ error: "Error" }];
      let response: any;
      let body = JSON.parse(req.body);
      let id = body["id"];
      let manager = body["manager"];
      let team = body["team"];
      if (id && team !== "core") {
        employees[id].manager = manager;
        employees[id].team = team;
        response = employees;
      }
      return res.status(200).json(response);
  }
}

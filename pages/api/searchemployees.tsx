import type { NextApiRequest, NextApiResponse } from "next";
import { employees } from "@/data";
import { Employees } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employees[]>
) {
  const { query } = req;
  let allEmployees = employees;

  switch (req.method) {
    case "GET":
      const result:any = allEmployees.find((item) =>
        item["name"].toLocaleLowerCase().includes(query.toString())
      );
      return res.status(200).json(result);
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { employees } from '@/data';
import { Employees } from '@/interfaces';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Employees[]>
  ) {
    
    let allEmployees = employees
 
    switch(req.method){
        case "GET":
          return res.status(200).json(allEmployees)
        }
  }
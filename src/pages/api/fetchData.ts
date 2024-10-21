import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      "https://api.mockaroo.com/api/28f5dc90?count=100&key=9b210390"
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

export default handler;

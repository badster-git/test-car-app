import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.auth!,
      `${process.env.SECRET_KEY}`,
      async function (err, decoded) {
        if (!err && decoded) {
          return await fn(req, res);
        }

        res.status(401).json({ message: "Sorry you are not authenticated." });
      }
    );
  };

export{};
declare global {
    namespace Express {
      interface Request {
        verifiedToken: any
      }
    }
  }

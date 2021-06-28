// 모든 유저 조회
async function selectUser(connection: any) {
    const selectUserListQuery = `
                  SELECT email, nickname 
                  FROM User;
                  `;
    const userRows =  await connection.query(selectUserListQuery);

    return userRows;
  }
  
  // 이메일로 회원 조회
  async function selectUserEmail(connection:any, email:string) {
    const selectUserEmailQuery = `
                  SELECT email, nickname 
                  FROM User 
                  WHERE email = ?;
                  `;
    const emailRows = await connection.query(selectUserEmailQuery, email);
    return emailRows;
  }
  
  // userId 회원 조회
  async function selectUserId(connection:any, userId:number) {
    const selectUserIdQuery = `
                   SELECT idx, email, nickname 
                   FROM User 
                   WHERE idx = ?;
                   `;
    const userRow = await connection.query(selectUserIdQuery, userId);
    return userRow;
  }
  
  // 유저 생성
  async function insertUserInfo(connection:any, insertUserInfoParams:any) {
    const insertUserInfoQuery = `
          INSERT INTO User(email, password, nickname)
          VALUES (?, ?, ?);
      `;
    await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
    );
  }
  
  // 패스워드 체크
  async function selectUserPassword(connection:any, selectUserPasswordParams:any) {
    const selectUserPasswordQuery = `
          SELECT email, nickname, password
          FROM User 
          WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
  
    return selectUserPasswordRow;
  }
  
  // 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
  async function selectUserAccount(connection:any, email:string) {
    const selectUserAccountQuery = `
          SELECT status, idx
          FROM User 
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow;
  }
  
  async function updateUserInfo(connection:any, id:string, nickname:string) {
    const updateUserQuery = `
    UPDATE User 
    SET nickname = ?
    WHERE idx = ?;`;
    await connection.query(updateUserQuery, [nickname, id]);
  }
  
  
  export {
    selectUser,
    selectUserEmail,
    selectUserId,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateUserInfo,
  };
  
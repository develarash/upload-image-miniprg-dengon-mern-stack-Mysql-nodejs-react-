import { Sequelize } from "sequelize";


const db=new Sequelize("owen","root","wkdJrp4jtkSexXRi",{

    host:"services.irn1.chabokan.net",
    dialect:"mysql",
    port: 33715

})
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
export default db;